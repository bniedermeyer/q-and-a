import { createStore } from '@stencil/store';

const { state, reset, dispose } = createStore({
  askEndpoint: '/ask',
  retrieveEndpoint: '/questions',
  userId: '',
  correlationId: '',
  primaryColor: '#10915b',
  secondaryColor: '#112378',
  questions: [],
});
/** Used to reset the store to its original shape */
export const resetStore = () => reset();
/** Used to dispose the current store. Use only in testing in beforeEach hooks */
export const disposeStore = () => dispose();
export default state;
