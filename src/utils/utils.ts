/**
 * Invokes the provided promise factory at a given interval. Useful for polling.
 * @param promiseFactory A function that returns a promise
 * @param interval The interval in which the promise factory whould be envoked
 */
export function continuousPromise(promiseFactory: () => Promise<any>, interval: number): void {
  const execute = () => promiseFactory().finally(waitAndExecute);
  const waitAndExecute = () => setTimeout(execute, interval);
  execute();
}
