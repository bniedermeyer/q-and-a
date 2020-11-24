import { QuestionList } from '../QuestionList';
import state, { disposeStore } from '../../../store';

beforeEach(() => {
  disposeStore();
  state.primaryColor = '#10915b';
  state.secondaryColor = '#112378';
});

describe('qa-question-list', () => {
  it('renders no questions when none are present', async () => {
    const result = QuestionList({ questions: [] }, [], undefined);
    expect(result).toMatchSnapshot();
  });

  it('renders all of the questions', () => {
    const questions = [
      {
        key: 'key1',
        question: 'What time is it?',
        count: 20,
      },
    ];

    const result = QuestionList({ questions }, [], undefined);
    expect(result).toMatchSnapshot();
  });
});
