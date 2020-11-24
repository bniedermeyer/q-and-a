# q-and-a

Please note that while the component does a great job submitting and fetching questions from the audience, it is up to you to implement the logic in the backend. The properties, and the options they configure, are useful for configuring the behavior of the component and what information it sends to your backend.

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                                                                                                                                                                                                                                                                                                                                                                                     | Type     | Default        |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------- |
| `askEndpoint`       | `ask-endpoint`       | The endpoint that questions/upvotes will be posted to.                                                                                                                                                                                                                                                                                                                                                                          | `string` | `'/ask'`       |
| `correlationId`     | `correlation-id`     | The correlation id of the q-and-a session. If present, will be sent with questions and used to retrieve questions by appending a `correlationId` query parameter to the `retrieveEndpoint` url. Changes to this property are tracked and updated within the component. A good use case for this property is to track which talk is being given at a time. This way you can only display questions relevant to the current talk. | `string` | `undefined`    |
| `incrementEndpoint` | `increment-endpoint` | The endpoint to post increment commands to.                                                                                                                                                                                                                                                                                                                                                                                     | `string` | `'/ask'`       |
| `pollingInterval`   | `polling-interval`   | The interval in which the questions should be fetched in ms. Defaults to 10000ms (10 seconds).                                                                                                                                                                                                                                                                                                                                  | `number` | `10000`        |
| `primaryColor`      | `primary-color`      | Primary color. Used mainly for button borders.                                                                                                                                                                                                                                                                                                                                                                                  | `string` | `'#007745 '`   |
| `retrieveEndpoint`  | `retrieve-endpoint`  | The endpoint the list of questions will be retrieved from.                                                                                                                                                                                                                                                                                                                                                                      | `string` | `'/questions'` |
| `secondaryColor`    | `secondary-color`    | Secondary color. Used for question and header text color.                                                                                                                                                                                                                                                                                                                                                                       | `string` | `'#112378'`    |
| `userId`            | `user-id`            | The optional id of the user asking a question. Will be sent with the question if present. Cannot be changed once initialized.                                                                                                                                                                                                                                                                                                   | `string` | `undefined`    |


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
