import { FunctionalComponent, h } from '@stencil/core';
import { AskedQuestion } from '../../models/Question';
import { incrementQuestionCount } from '../../utils/data-fetching-utils';
import state from '../../store';

interface QuestionListProps {
  questions: AskedQuestion[];
}

/**
 * For a given list of questions, this functional component will construct an unordered list and display them, along with a button to increment the count of each question.
 */
export const QuestionList: FunctionalComponent<QuestionListProps> = ({ questions }) => {
  if (questions.length === 0) {
    return null;
  }
  const questionsList = questions.map(question => (
    <li class="qa-question" key={question.key} style={{ fontSize: '0.75rem', margin: '5px', color: state.secondaryColor }}>
      <p class="qa-question-text" style={{ fontWeight: 'bold', wordWrap: 'break-word', margin: '3px' }}>
        {question.question}
      </p>
      <button
        type="button"
        class="qa-inc-button"
        onClick={() => incrementQuestionCount(question.key)}
        aria-label="Also ask this question"
        style={{ marginRight: '5px', border: `3px solid ${state.primaryColor}`, fontWeight: 'bold', backgroundColor: 'transparent' }}
      >
        +1
      </button>
      <span>{question.count}</span>
    </li>
  ));

  return (
    <ul id="questions" style={{ listStyle: 'none', paddingLeft: '0', padding: '3px', marginTop: '0', overflowY: 'scroll' }}>
      {questionsList}
    </ul>
  );
};
