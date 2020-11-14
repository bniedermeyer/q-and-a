import { AskedQuestion, Question } from '../models/Question';
import state from '../store';

interface IncrementRequest {
  key: string;
  userId?: string;
}

/**
 * Posts the question asked by the user to the backend.
 *
 * @param question The question asked by the user
 */
export async function askQuestion(question: string): Promise<void> {
  let request: Question = {
    question,
  };
  if (state.userId) {
    request.userId = state.userId;
  }
  if (state.correlationId) {
    request.correlationId = state.correlationId;
  }
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  };
  await fetch(state.askEndpoint, settings);
}

/**
 * Posts a command to the backend to increment the number of times the question has been asked.
 *
 * @param key The unique id key of the question to increment
 */
export async function incrementQuestionCount(key: string): Promise<void> {
  const request: IncrementRequest = {
    key,
  };
  if (state.userId) {
    request.userId = state.userId;
  }

  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  };
  await fetch(state.askEndpoint, settings);
}

/**
 * Requests all questions from the backend and updates the state with the result.
 * If the component is initialized with a correlation ID, this will pass the id in the request to only retrieve questions what are related to that ID.
 */
export async function fetchQuestions(): Promise<void> {
  const url = state.correlationId ? `${state.retrieveEndpoint}?correlationId=${state.correlationId}` : state.retrieveEndpoint;
  let data = await fetch(url);
  let questions: AskedQuestion[] = await data.json();
  state.questions = questions;
}
