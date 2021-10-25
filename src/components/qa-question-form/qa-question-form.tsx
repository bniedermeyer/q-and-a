import { Component, State, h } from '@stencil/core';
import { askQuestion } from '../../utils/data-fetching-utils';
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

  async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    if (!this.question) {
      this.error = 'Please type a question before submitting!';
      this.displayConfirmation = false;
      return;
    }
    try {
      await askQuestion(this.question);
      this.displayConfirmation = true;
    } catch (error) {
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
        {this.displayConfirmation ? (
          <span class="qa-post-submit-message" id="qa-question-confirm" style={{ color: state.secondaryColor }} part="confirmation-message">
            Question Asked!
          </span>
        ) : null}
        {this.error ? (
          <span class="qa-post-submit-message" id="qa-question-error" part="error-message">
            {this.error}
          </span>
        ) : null}
      </form>
    );
  }
}
