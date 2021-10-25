import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase, Database, Unsubscribe, DataSnapshot, Query, query, ref, onValue, limitToLast } from 'firebase/database';
import { AskedQuestion } from '../models/Question';
import state from '../store';

export class FirebaseService {
  private config: FirebaseOptions;
  private app: FirebaseApp;
  private database: Database;
  private questionQuery: Query;
  private unsubscribeFromDb: Unsubscribe;

  constructor(databaseURL: string, apiKey?: string, enableAuth: boolean = false) {
    this.config = { databaseURL };
    if (enableAuth && apiKey) {
      this.config = { ...this.config, apiKey };
    }
    this.app = initializeApp(this.config, 'q-and-acomponent');
    if (enableAuth) {
      // This allows us to put read protection on the database without requiring individual users to authenticate.
      const auth = getAuth(this.app);
      signInAnonymously(auth).then(() => console.log(`🌲 Hi from CascadiaJS 2021! 🌲`));
    }
  }

  public getDatabase(): Database {
    return getDatabase(this.app);
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
}
