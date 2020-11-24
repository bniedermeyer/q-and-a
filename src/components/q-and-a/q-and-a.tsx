import { Component, Prop, Watch, Host, h } from '@stencil/core';
import { QuestionList } from '../QuestionList/QuestionList';
import { fetchQuestions } from '../../utils/data-fetching-utils';
import { continuousPromise } from '../../utils/utils';
import state from '../../store';

@Component({
  tag: 'q-and-a',
  styleUrl: 'q-and-a.css',
  shadow: true,
})
export class QAndA {
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
    continuousPromise(fetchQuestions, this.pollingInterval);
  }

  @Watch('correlationId')
  updateCorrelationId(newId: string, oldId: string) {
    console.log(`Q&A Correlation ID was updated from ${oldId} to ${newId}`);
    // the store takes care of comparing new state values to prevent unnecessary rendering.
    state.correlationId = newId;
  }

  render() {
    return (
      <Host>
        <qa-question-form></qa-question-form>
        <QuestionList questions={state.questions}></QuestionList>
      </Host>
    );
  }
}
