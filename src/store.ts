import { createStore } from '@stencil/store';

// use these questions in the store below to create some default examples to see during development.
/* const questions = [
  { question: 'What time is lunch?', count: 3, key: '1' },
  { question: 'What is your favorite color?', count: 1, key: '2' },
  { question: 'What is your favorite band?', count: 2, key: '3' },
]; */

const { state, reset, dispose } = createStore({
  askEndpoint: '',
  askFunction: '',
  retrieveEndpoint: '',
  incrementEndpoint: '',
  incrementFunction: '',
  userId: '',
  correlationId: '',
  primaryColor: '',
  secondaryColor: '',
  questions: [],
});
/** Used to reset the store to its original shape */
export const resetStore = () => reset();
/** Used to dispose the current store. Use only in testing in beforeEach hooks */
export const disposeStore = () => dispose();
export default state;
