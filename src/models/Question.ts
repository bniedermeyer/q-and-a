export interface Question {
  /**
   * The question the user asked
   */
  question: string;
  /**
   * Optional user identifier
   */
  userId?: string;
  /**
   * Optional correlation id
   */
  correlationId?: string;
}

export interface AskedQuestion extends Question {
  /**
   * Count of times the question has been asked. Must be present on all questions retrieved from the server
   */
  count?: number;
  /**
   * Unique question identifier. Must be present on all questions retrieved from the server.
   */
  key?: string;
}
