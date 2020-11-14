import fetchMock from 'fetch-mock-jest';
import { askQuestion, incrementQuestionCount, fetchQuestions } from '../data-fetching-utils';

import state, { disposeStore } from '../../store';
import { AskedQuestion } from '../../models/Question';

beforeEach(() => {
  fetchMock.mockReset();
  disposeStore();
});

describe('askQuestion', () => {
  beforeEach(() => {
    fetchMock.post(state.askEndpoint, (_url, options) => {
      if (options.body.length > 0) {
        return 200;
      }
      return 400;
    });
  });

  it('should post the question to the backend', async () => {
    await askQuestion('What is the airspeed velocity of an unladen swallow?');
    expect(fetchMock.mock.calls).toMatchSnapshot();
  });

  it('should post the question to the backend with the expected metadata', async () => {
    state.userId = 'my-user-id';
    state.correlationId = 'my-correlation-id';
    await askQuestion('What is the airspeed velocity of an unladen swallow?');
    expect(fetchMock.mock.calls).toMatchSnapshot();
  });
});

describe('incrementQuestionCount', () => {
  beforeEach(() => {
    fetchMock.post(state.askEndpoint, (_url, options) => {
      if (options.body.length > 0) {
        return 200;
      }
      return 400;
    });
  });

  it('should post the increment request to the backend', async () => {
    await incrementQuestionCount('question-key');
    expect(fetchMock.mock.calls).toMatchSnapshot();
  });

  it('should post the increment request to the backend with the expected metadata', async () => {
    state.userId = 'my-user-id';
    await incrementQuestionCount('question-key');
    expect(fetchMock.mock.calls).toMatchSnapshot();
  });
});

describe('fetchQuestions', () => {
  const questions: AskedQuestion[] = [
    { question: 'What time is it?', count: 2, key: '1', userId: 'user1', correlationId: 'a123' },
    { question: 'What is for lunch?', count: 0, key: '2', userId: '1', correlationId: 'a123' },
  ];
  it('should fetch the questions and set them in the state', async () => {
    fetchMock.get(
      state.retrieveEndpoint,
      questions.map(rawQuestion => {
        const { correlationId, ...question } = rawQuestion;
        return question;
      }),
    );
    await fetchQuestions();
    expect(state.questions).toMatchSnapshot();
    expect(fetchMock.mock.calls).toMatchSnapshot();
  });

  it('should fetch the questions for the given correlation id and set them in the state', async () => {
    state.correlationId = 'a123';
    fetchMock.get(`${state.retrieveEndpoint}?correlationId=${state.correlationId}`, questions);
    await fetchQuestions();
    expect(state.questions).toMatchSnapshot();
    expect(fetchMock.mock.calls).toMatchSnapshot();
  });
});
