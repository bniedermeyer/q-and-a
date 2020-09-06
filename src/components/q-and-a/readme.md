# q-and-a



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                                                                     | Type     | Default     |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `askEndpoint`      | `ask-endpoint`      | The endpoint that questions/upvotes will be posted to. Defaults to `/ask` if not defined                                                                                                        | `string` | `undefined` |
| `correlationId`    | `correlation-id`    | The correlation id of the q-and-a session. If present, will be sent with questions and used to retrieve questions by appending a `correlationId` query parameter to the `retrieveEndpoint` url. | `string` | `undefined` |
| `pollingInterval`  | `polling-interval`  | The interval in which the questions should be fetched in ms. Defaults to 10000ms (10 seconds).                                                                                                  | `number` | `10000`     |
| `primaryColor`     | `primary-color`     | Primary color. Used mainly for button borders. Defaults to #10915b                                                                                                                              | `string` | `undefined` |
| `retrieveEndpoint` | `retrieve-endpoint` | The endpoint the list of questions will be retrieved from. Defaults to `/questions` if not defined                                                                                              | `string` | `undefined` |
| `secondaryColor`   | `secondary-color`   | Secondary color. Used for question and header text color. Defaults to  #112378                                                                                                                  | `string` | `undefined` |
| `userId`           | `user-id`           | The optional id of the user asking a question. Will be sent with the question if present.                                                                                                       | `string` | `undefined` |


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
