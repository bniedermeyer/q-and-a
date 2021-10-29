/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
export namespace Components {
  interface QAndA {
    /**
     * The endpoint that questions/upvotes will be posted to.
     */
    askEndpoint: string;
    /**
     * The correlation id of the q-and-a session. If present, will be sent with questions and used to retrieve questions by appending a `correlationId` query parameter to the `retrieveEndpoint` url. Changes to this property are tracked and updated within the component. A good use case for this property is to track which talk is being given at a time. This way you can only display questions relevant to the current talk.
     */
    correlationId: string;
    /**
     * Use to customize the name of your firebase callable function to submit questions. Default is `askQuestion`
     */
    firebaseAskFn: string;
    /**
     * The auth domain for your firebase project. Needed for Safari compatibility. You probably don't need to adjust this unless you have issues with your app's authentication in general.
     */
    firebaseAuthDomain: string;
    /**
     * URL for the Firebase Realtime Database. Required if `useFirebase` = true
     */
    firebaseDb: string;
    /**
     * Use to customize the name of your firebase callable function to increment question counts. Default is `incrementQuestion`
     */
    firebaseIncrementFn: string;
    /**
     * The project ID for your firebase project. Required if `useFirebase` = true
     */
    firebaseProjectId: string;
    /**
     * Web API Key for your Firebase project. Required if `useFirebase` = true
     */
    firebaseToken: string;
    /**
     * The endpoint to post increment commands to.
     */
    incrementEndpoint: string;
    /**
     * Controls whether placholder text is displayed.
     */
    placeholder: boolean;
    /**
     * Text to display if `placeholder` = true
     */
    placeholderText: string;
    /**
     * The interval in which the questions should be fetched in ms. Defaults to 10000ms (10 seconds).
     */
    pollingInterval: number;
    /**
     * Primary color. Used mainly for button borders.
     */
    primaryColor: string;
    /**
     * The endpoint the list of questions will be retrieved from.
     */
    retrieveEndpoint: string;
    /**
     * Secondary color. Used for question and header text color.
     */
    secondaryColor: string;
    /**
     * Whether to use REST polling or Firebase
     */
    useFirebase: boolean;
    /**
     * The optional id of the user asking a question. Will be sent with the question if present. Cannot be changed once initialized.
     */
    userId: string;
  }
  interface QaQuestionForm {}
}
declare global {
  interface HTMLQAndAElement extends Components.QAndA, HTMLStencilElement {}
  var HTMLQAndAElement: {
    prototype: HTMLQAndAElement;
    new (): HTMLQAndAElement;
  };
  interface HTMLQaQuestionFormElement extends Components.QaQuestionForm, HTMLStencilElement {}
  var HTMLQaQuestionFormElement: {
    prototype: HTMLQaQuestionFormElement;
    new (): HTMLQaQuestionFormElement;
  };
  interface HTMLElementTagNameMap {
    'q-and-a': HTMLQAndAElement;
    'qa-question-form': HTMLQaQuestionFormElement;
  }
}
declare namespace LocalJSX {
  interface QAndA {
    /**
     * The endpoint that questions/upvotes will be posted to.
     */
    askEndpoint?: string;
    /**
     * The correlation id of the q-and-a session. If present, will be sent with questions and used to retrieve questions by appending a `correlationId` query parameter to the `retrieveEndpoint` url. Changes to this property are tracked and updated within the component. A good use case for this property is to track which talk is being given at a time. This way you can only display questions relevant to the current talk.
     */
    correlationId?: string;
    /**
     * Use to customize the name of your firebase callable function to submit questions. Default is `askQuestion`
     */
    firebaseAskFn?: string;
    /**
     * The auth domain for your firebase project. Needed for Safari compatibility. You probably don't need to adjust this unless you have issues with your app's authentication in general.
     */
    firebaseAuthDomain?: string;
    /**
     * URL for the Firebase Realtime Database. Required if `useFirebase` = true
     */
    firebaseDb?: string;
    /**
     * Use to customize the name of your firebase callable function to increment question counts. Default is `incrementQuestion`
     */
    firebaseIncrementFn?: string;
    /**
     * The project ID for your firebase project. Required if `useFirebase` = true
     */
    firebaseProjectId?: string;
    /**
     * Web API Key for your Firebase project. Required if `useFirebase` = true
     */
    firebaseToken?: string;
    /**
     * The endpoint to post increment commands to.
     */
    incrementEndpoint?: string;
    /**
     * Controls whether placholder text is displayed.
     */
    placeholder?: boolean;
    /**
     * Text to display if `placeholder` = true
     */
    placeholderText?: string;
    /**
     * The interval in which the questions should be fetched in ms. Defaults to 10000ms (10 seconds).
     */
    pollingInterval?: number;
    /**
     * Primary color. Used mainly for button borders.
     */
    primaryColor?: string;
    /**
     * The endpoint the list of questions will be retrieved from.
     */
    retrieveEndpoint?: string;
    /**
     * Secondary color. Used for question and header text color.
     */
    secondaryColor?: string;
    /**
     * Whether to use REST polling or Firebase
     */
    useFirebase?: boolean;
    /**
     * The optional id of the user asking a question. Will be sent with the question if present. Cannot be changed once initialized.
     */
    userId?: string;
  }
  interface QaQuestionForm {}
  interface IntrinsicElements {
    'q-and-a': QAndA;
    'qa-question-form': QaQuestionForm;
  }
}
export { LocalJSX as JSX };
declare module '@stencil/core' {
  export namespace JSX {
    interface IntrinsicElements {
      'q-and-a': LocalJSX.QAndA & JSXBase.HTMLAttributes<HTMLQAndAElement>;
      'qa-question-form': LocalJSX.QaQuestionForm & JSXBase.HTMLAttributes<HTMLQaQuestionFormElement>;
    }
  }
}