import { Component, Prop, Watch, Host, h } from '@stencil/core';
import state from '../../store';

@Component({
  tag: 'q-and-a',
  styleUrl: 'q-and-a.css',
  shadow: true,
})
export class QAndA {
  /**
   * The endpoint that questions/upvotes will be posted to
   */
  @Prop() askEndpoint: string;
  /**
   * The endpoint the list of questions will be retrieved from
   */
  @Prop() retrieveEndpoint: string;
  /**
   * The optional id of the user asking a question. Will be sent with the question if present.
   */
  @Prop() userId: string;
  /**
   * The correlation id of the q-and-a session. If present, will be sent with questions and used to retrieve questions by appending a `correlationId` query parameter to the `retrieveEndpoint` url.
   */
  @Prop() correlationId: string;
  /**
   * Primary color. Used mainly for button borders. Defaults to #10915b
   */
  @Prop() primaryColor: string;
  /**
   * Secondary color. Used for question and header text color. Defaults to  #112378
   */
  @Prop() secondaryColor: string;

  connectedCallback() {
    if (this.askEndpoint) {
      state.askEndpoint = this.askEndpoint;
    }
    if (this.retrieveEndpoint) {
      state.retrieveEndpoint = this.retrieveEndpoint;
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
  }

  @Watch('correlationId')
  updateCorrelationId(newId: string, oldId: string) {
    console.log(`Q&A Correlation ID was updated from ${oldId} to ${newId}`);
    state.correlationId = newId;
  }

  render() {
    return (
      <Host>
        <qa-question-form></qa-question-form>
      </Host>
    );
  }
}
