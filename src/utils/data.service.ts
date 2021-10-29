import { askQuestion, fetchQuestions, incrementQuestionCount } from './data-fetching-utils';
import { FirebaseService } from './firebase.service';

class DataService {
  private fbService: FirebaseService;

  constructor() {
    console.log('Data Service Initialized');
  }

  public initFirebase(databaseURL: string, apiKey: string, projectId: string, authDomain: string): void {
    this.fbService = new FirebaseService(databaseURL, apiKey, projectId, authDomain);
  }

  public subscribeToQuestions(): void {
    this.fbService.subscribeToQuestionUpdates();
  }

  public unsubscribeToQuestions(): void {
    this.fbService.unsubscribeDb();
  }

  public async askQuestion(question: string): Promise<void> {
    if (this.fbService) {
      await this.fbService.askQuestion(question);
    } else {
      await askQuestion(question);
    }
  }

  public async incrementQuestion(key: string): Promise<void> {
    if (this.fbService) {
      await this.fbService.incrementQuestion(key);
    } else {
      await incrementQuestionCount(key);
    }
  }

  public async fetchQuestions(): Promise<void> {
    await fetchQuestions();
  }
}

export default new DataService();
