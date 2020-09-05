import state from '../store';

interface Question {
  question: string;
  userId?: string;
  correlationId?: string;
  count?: number;
}

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

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
