import { createStore } from '@stencil/store';

const { state } = createStore({
  askEndpoint: '/ask',
  retrieveEndpoint: '/questions',
  userId: '',
  correlationId: '',
  primaryColor: '#10915b',
  secondaryColor: '#112378',
  questions: [],
});

export default state;
