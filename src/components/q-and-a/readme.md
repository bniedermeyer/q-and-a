# q-and-a

Please note that while the component does a great job submitting and fetching questions from the audience, it is up to you to implement the logic in the backend. The properties, and the options they configure, are useful for configuring the behavior of the component and what information it sends to your backend.

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                                                                                                                                                                                                                                                                                                                                                                                     | Type      | Default                   |
| --------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------- |
| `askEndpoint`         | `ask-endpoint`          | The endpoint that questions/upvotes will be posted to.                                                                                                                                                                                                                                                                                                                                                                          | `string`  | `'/ask'`                  |
| `correlationId`       | `correlation-id`        | The correlation id of the q-and-a session. If present, will be sent with questions and used to retrieve questions by appending a `correlationId` query parameter to the `retrieveEndpoint` url. Changes to this property are tracked and updated within the component. A good use case for this property is to track which talk is being given at a time. This way you can only display questions relevant to the current talk. | `string`  | `undefined`               |
| `firebaseAskFn`       | `firebase-ask-fn`       | Use to customize the name of your firebase callable function to submit questions. Default is `askQuestion`                                                                                                                                                                                                                                                                                                                      | `string`  | `'askQuestion'`           |
| `firebaseAuthDomain`  | `firebase-auth-domain`  | The auth domain for your firebase project. Needed for Safari compatibility. You probably don't need to adjust this unless you have issues with your app's authentication in general.                                                                                                                                                                                                                                            | `string`  | `'noop'`                  |
| `firebaseDb`          | `firebase-db`           | URL for the Firebase Realtime Database. Required if `useFirebase` = true                                                                                                                                                                                                                                                                                                                                                        | `string`  | `undefined`               |
| `firebaseIncrementFn` | `firebase-increment-fn` | Use to customize the name of your firebase callable function to increment question counts. Default is `incrementQuestion`                                                                                                                                                                                                                                                                                                       | `string`  | `'incrementQuestion'`     |
| `firebaseProjectId`   | `firebase-project-id`   | The project ID for your firebase project. Required if `useFirebase` = true                                                                                                                                                                                                                                                                                                                                                      | `string`  | `undefined`               |
| `firebaseToken`       | `firebase-token`        | Web API Key for your Firebase project. Required if `useFirebase` = true                                                                                                                                                                                                                                                                                                                                                         | `string`  | `undefined`               |
| `incrementEndpoint`   | `increment-endpoint`    | The endpoint to post increment commands to.                                                                                                                                                                                                                                                                                                                                                                                     | `string`  | `'/ask'`                  |
| `placeholder`         | `placeholder`           | Controls whether placholder text is displayed.                                                                                                                                                                                                                                                                                                                                                                                  | `boolean` | `false`                   |
| `placeholderText`     | `placeholder-text`      | Text to display if `placeholder` = true                                                                                                                                                                                                                                                                                                                                                                                         | `string`  | `'Q&A will open shortly'` |
| `pollingInterval`     | `polling-interval`      | The interval in which the questions should be fetched in ms. Defaults to 10000ms (10 seconds).                                                                                                                                                                                                                                                                                                                                  | `number`  | `10000`                   |
| `primaryColor`        | `primary-color`         | Primary color. Used mainly for button borders.                                                                                                                                                                                                                                                                                                                                                                                  | `string`  | `'#007745 '`              |
| `retrieveEndpoint`    | `retrieve-endpoint`     | The endpoint the list of questions will be retrieved from.                                                                                                                                                                                                                                                                                                                                                                      | `string`  | `'/questions'`            |
| `secondaryColor`      | `secondary-color`       | Secondary color. Used for question and header text color.                                                                                                                                                                                                                                                                                                                                                                       | `string`  | `'#112378'`               |
| `useFirebase`         | `use-firebase`          | Whether to use REST polling or Firebase                                                                                                                                                                                                                                                                                                                                                                                         | `boolean` | `false`                   |
| `userId`              | `user-id`               | The optional id of the user asking a question. Will be sent with the question if present. Cannot be changed once initialized.                                                                                                                                                                                                                                                                                                   | `string`  | `undefined`               |


## Shadow Parts

| Part                 | Description |
| -------------------- | ----------- |
| `"placeholder-text"` |             |


## Dependencies

### Depends on

- [qa-question-form](../qa-question-form)

### Graph
```mermaid
graph TD;
  q-and-a --> qa-question-form
  style q-and-a fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
