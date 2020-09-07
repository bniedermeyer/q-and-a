import { createStore } from '@stencil/store';

const { state, reset } = createStore({
  askEndpoint: '/ask',
  retrieveEndpoint: '/questions',
  userId: '',
  correlationId: '',
  primaryColor: '#10915b',
  secondaryColor: '#112378',
  questions: [],
});
export const resetStore = () => reset();
export default state;
