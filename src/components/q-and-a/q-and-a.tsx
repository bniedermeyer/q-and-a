import { Component, Prop, Watch, Host, h } from '@stencil/core';
import { QuestionList } from '../QuestionList/QuestionList';
import { continuousPromise } from '../../utils/utils';
import dataService from '../../utils/data.service';
import state from '../../store';

@Component({
  tag: 'q-and-a',
  styleUrl: 'q-and-a.css',
  shadow: true,
})
export class QAndA {
  /**
   * Text to display if `placeholder` = true
   */
  @Prop() placeholderText: string = 'Q&A will open shortly';
  /**
   * Controls whether placholder text is displayed.
   */
  @Prop() placeholder: boolean = false;
  /**
   * Whether to use REST polling or Firebase
   */
  @Prop() useFirebase: boolean = false;
  /**
   * URL for the Firebase Realtime Database. Required if `useFirebase` = true
   */
  @Prop() firebaseDb: string;
  /**
   * Web API Key for your Firebase project. Required if `useFirebase` = true
   */
  @Prop() firebaseToken: string;
  /**
   * The project ID for your firebase project. Required if `useFirebase` = true
   */
  @Prop() firebaseProjectId: string;
  /**
   * The auth domain for your firebase project. Needed for Safari compatibility. You probably don't need to adjust this unless you have issues with your app's authentication in general.
   */
  @Prop() firebaseAuthDomain: string = 'noop';
  /**
   * Use to customize the name of your firebase callable function to submit questions. Default is `askQuestion`
   */
  @Prop() firebaseAskFn: string = 'askQuestion';
  /**
   * Use to customize the name of your firebase callable function to increment question counts. Default is `incrementQuestion`
   */
  @Prop() firebaseIncrementFn: string = 'incrementQuestion';
  /**
   * The endpoint that questions/upvotes will be posted to.
   */
  @Prop() askEndpoint: string = '/ask';
  /**
   * The endpoint the list of questions will be retrieved from.
   */
  @Prop() retrieveEndpoint: string = '/questions';
  /**
   * The endpoint to post increment commands to.
   */
  @Prop() incrementEndpoint: string = '/ask';
  /**
   * The optional id of the user asking a question. Will be sent with the question if present. Cannot be changed once initialized.
   */
  @Prop() userId: string;
  /**
   * The correlation id of the q-and-a session. If present, will be sent with questions and used to retrieve questions by appending a `correlationId` query parameter to the `retrieveEndpoint` url. Changes to this property are tracked and updated within the component. A good use case for this property is to track which talk is being given at a time. This way you can only display questions relevant to the current talk.
   */
  @Prop() correlationId: string;
  /**
   * Primary color. Used mainly for button borders.
   */
  @Prop() primaryColor: string = '#007745 ';
  /**
   * Secondary color. Used for question and header text color.
   */
  @Prop() secondaryColor: string = '#112378';
  /**
   * The interval in which the questions should be fetched in ms. Defaults to 10000ms (10 seconds).
   */
  @Prop() pollingInterval: number = 10000;

  connectedCallback() {
    if (this.askEndpoint) {
      state.askEndpoint = this.askEndpoint;
    }
    if (this.firebaseAskFn) {
      state.askFunction = this.firebaseAskFn;
    }
    if (this.firebaseIncrementFn) {
      state.incrementFunction = this.firebaseIncrementFn;
    }
    if (this.retrieveEndpoint) {
      state.retrieveEndpoint = this.retrieveEndpoint;
    }
    if (this.incrementEndpoint) {
      state.incrementEndpoint = this.incrementEndpoint;
    }
    if (this.userId) {
      state.userId = this.userId;
    }
    if (this.correlationId) {
      state.correlationId = this.correlationId;
    }
    if (this.primaryColor) {
      state.primaryColor = this.primaryColor;
    }
    if (this.secondaryColor) {
      state.secondaryColor = this.secondaryColor;
    }
    if (this.useFirebase) {
      if (!this.firebaseDb || !this.firebaseToken || !this.firebaseProjectId) {
        throw new Error('Missing required firebase values. Please supply firebase-db, firebase-token and firebase-project-id or set use-firebase to false');
      } else {
        dataService.initFirebase(this.firebaseDb, this.firebaseToken, this.firebaseProjectId, this.firebaseAuthDomain);
        dataService.subscribeToQuestions();
      }
    } else {
      continuousPromise(dataService.fetchQuestions, this.pollingInterval);
    }
  }

  @Watch('correlationId')
  updateCorrelationId(newId: string, oldId: string) {
    console.log(`Q&A Correlation ID was updated from ${oldId} to ${newId}`);
    // the store takes care of comparing new state values to prevent unnecessary rendering.
    state.correlationId = newId;
    if (this.useFirebase) {
      dataService.unsubscribeToQuestions();
      dataService.subscribeToQuestions();
    }
  }

  render() {
    if (this.placeholder) {
      return (
        <Host>
          <h2 part="placeholder-text" id="placeholder-text" style={{ margin: '5px', color: state.secondaryColor, textAlign: 'center' }}>
            {this.placeholderText}
          </h2>
        </Host>
      );
    }

    return (
      <Host>
        <qa-question-form></qa-question-form>
        <QuestionList questions={state.questions}></QuestionList>
      </Host>
    );
  }
}
