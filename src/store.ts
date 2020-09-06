import { createStore } from '@stencil/store';

const { state } = createStore({
  askEndpoint: '/ask',
  retrieveEndpoint: '/questions',
  userId: '',
  correlationId: '',
  primaryColor: '#10915b',
  secondaryColor: '#112378',
  questions: [{ key: '1', question: 'This is question 1', count: 100 }],
});

export default state;
