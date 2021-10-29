import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, updateProfile } from 'firebase/auth';
import { getDatabase, Database, Unsubscribe, DataSnapshot, Query, query, ref, onValue, limitToLast } from 'firebase/database';
import { getFunctions, httpsCallable, Functions } from 'firebase/functions';
import { AskedQuestion, IncrementRequest, Question } from '../models/Question';
import state from '../store';

export class FirebaseService {
  private config: FirebaseOptions;
  private app: FirebaseApp;
  private database: Database;
  private questionQuery: Query;
  private unsubscribeFromDb: Unsubscribe;

  constructor(databaseURL: string, apiKey: string, projectId: string, authDomain: string) {
    this.config = { databaseURL, apiKey, projectId, authDomain };
    this.app = initializeApp(this.config, 'q-and-acomponent');
    // This allows us to put read protection on the database without requiring individual users to authenticate. It's requried to make callable functions work
    const auth = getAuth(this.app);
    signInAnonymously(auth)
      .then(() => {
        const user = auth.currentUser;
        if (state.userId && user && !user.displayName) {
          return updateProfile(auth.currentUser, {
            // store the user id to the user profile. Useful to verify identity in the firebase functions
            displayName: state.userId,
          });
        }
      })
      .then(() => console.log(`🌲 Hi from CascadiaJS! 🌲`));
  }

  private getDatabase(): Database {
    return getDatabase(this.app);
  }

  private getFns(): Functions {
    return getFunctions(this.app);
  }

  public subscribeToQuestionUpdates(): void {
    this.database = this.getDatabase();
    const refPath = state.correlationId ? `questions/${state.correlationId}` : 'questions';
    const dbRef = ref(this.database, refPath);
    // build the query that we want to run against the database and subscribe to updates
    // TODO: look into using virtual scrolling so we don't have to limit messages
    this.questionQuery = query(dbRef, limitToLast(300));
    this.unsubscribeFromDb = onValue(this.questionQuery, (snapshot: DataSnapshot) => {
      if (snapshot.val() !== null) {
        const questions = Object.values(snapshot.val()) as AskedQuestion[];
        state.questions = questions.sort((a, b) => b.count - a.count);
      } else {
        state.questions = [];
      }
    });
  }

  public unsubscribeDb(): void {
    this.unsubscribeFromDb();
  }

  public async askQuestion(question: string): Promise<void> {
    let request: Question = {
      question,
    };
    if (state.userId) {
      request.userId = state.userId;
    }
    if (state.correlationId) {
      request.correlationId = state.correlationId;
    }
    const functions = this.getFns();
    const ask = httpsCallable(functions, state.askFunction);
    await ask(request);
  }

  public async incrementQuestion(key: string): Promise<void> {
    const request: IncrementRequest = {
      key,
    };
    if (state.userId) {
      request.userId = state.userId;
    }

    if (state.correlationId) {
      request.correlationId = state.correlationId;
    }

    const functions = this.getFns();
    const ask = httpsCallable(functions, state.incrementFunction);
    await ask(request);
  }
}
