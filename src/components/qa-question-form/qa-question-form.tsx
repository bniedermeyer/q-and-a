import { Component, State, h } from '@stencil/core';
import { askQuestion } from '../../utils/utils';
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

  async handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.question) {
      this.error = 'Please type a question before submitting!';
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

  handleQuestionChange(e) {
    this.question = e.target.value;
    if (this.displayConfirmation) {
      this.displayConfirmation = false;
    }
  }

  render() {
    return (
      <form id="qa-question-form" onSubmit={e => this.handleSubmit(e)}>
        <div>
          <textarea
            name="question"
            id="question"
            cols={30}
            rows={3}
            value={this.question}
            onChange={e => this.handleQuestionChange(e)}
            aria-label="Submit your question here"
          ></textarea>
        </div>
        <button type="submit" id="qa-submit-question-btn" style={{ color: state.primaryColor, border: `3px solid ${state.primaryColor}` }}>
          Ask Question
        </button>
        {this.displayConfirmation && (
          <span class="qa-post-submit-message" id="qa-question-confirm" style={{ color: state.secondaryColor }}>
            Question Asked!
          </span>
        )}
        {this.error && (
          <span class="qa-post-submit-message" id="qa-question-error">
            {this.error}
          </span>
        )}
      </form>
    );
  }
}
