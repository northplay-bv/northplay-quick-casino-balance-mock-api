# Casino Test Rest API
Returns player balance for aslong instance is live. The starting values are defined within index.js.
Fork into [codesandbox.io](https://codesandbox.io) for a quick casino mock API.

## Get Balance
Send simple GET request with the username (specified in index.js) in query params:
`https://{{HOSTNAME}}/balance?username=betboy`


Returns:
```json
{
    "id": 59,
    "balance": 1000,
    "username": "betboy",
    "currency": "USD"
}
```

## Change Balance
Send post request like:

`curl -H "Content-Type: application/json" -X POST -d '{"username":"betboy","balance":500}' https://4989eq-8080.csb.app/balance`


Returns:
```json
{
    "id": 59,
    "balance": 500,
    "username": "betboy",
    "currency": "USD"
}
    

```

## Example Game Transaction
- First send a `GET request` to get the balance.
- Add/subtract the game event transaction value from the returned balance.
- Send a `POST request` with the final balance after deducting/adding transaction.
- Return the changed balance to the game API.