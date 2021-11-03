import { Component, State, h } from '@stencil/core';
import dataService from '../../utils/data.service';
import state from '../../store';

@Component({
  tag: 'qa-question-form',
  styleUrl: 'qa-question-form.css',
  shadow: true,
})
export class QaQuestionForm {
  /**
   * The content of the question to be submitted
   */
  @State() question: string;
  /**
   * Whether to display a submit confirmation
   */
  @State() displayConfirmation: boolean;
  /**
   * Error messages that are created while submitting a question
   */
  @State() error: string;
  /**
   * Whether or not to display the loading indicator
   */
  @State() loading: boolean = false;

  async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    if (!this.question) {
      this.error = 'Please type a question before submitting!';
      this.displayConfirmation = false;
      return;
    }
    this.loading = true;
    try {
      await dataService.askQuestion(this.question);
      this.loading = false;
      this.displayConfirmation = true;
    } catch (error) {
      this.loading = false;
      this.error = error.message;
    }
    this.question = '';
  }

  private handleQuestionChange = e => {
    this.question = e.target.value;
    if (this.displayConfirmation) {
      this.displayConfirmation = false;
    }
    if (this.error) {
      this.error = undefined;
    }
  };

  render() {
    return (
      <form id="qa-question-form" onSubmit={e => this.handleSubmit(e)} part="form">
        <div>
          <textarea
            name="question"
            id="question"
            cols={30}
            rows={3}
            value={this.question}
            onChange={this.handleQuestionChange}
            aria-label="Submit your question here"
            part="question-textarea"
          ></textarea>
        </div>
        <button type="submit" id="qa-submit-question-btn" style={{ color: state.primaryColor, border: `3px solid ${state.primaryColor}` }} part="submit-button">
          Ask Question
        </button>
        {this.loading && (
          <span class="qa-post-submit-message" id="qa-question-loading" style={{ color: state.secondaryColor }} part="loading-message">
            Asking...
          </span>
        )}
        {this.displayConfirmation && (
          <span class="qa-post-submit-message" id="qa-question-confirm" style={{ color: state.secondaryColor }} part="confirmation-message">
            Question Asked!
          </span>
        )}
        {this.error && (
          <span class="qa-post-submit-message" id="qa-question-error" part="error-message">
            {this.error}
          </span>
        )}
      </form>
    );
  }
}
