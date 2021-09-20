# BarnBridge SmartExposure Subgraph

## Running Local Graph Node

```
RPC_URL=<RPC_URL> docker-compose up
```

## Development

There are `npm scripts` for all the stages of subgraph development.

1. Building the subgraph (code generation + creating the subgraph): `npm build`
2. Deploying to the Local Graph Node: `npm run deploy:local --config={config.json}`
3. Deploying to the Rinkeby Graph Node: `npm run deploy:rinkeby --config={config.json`
4. Deploying to the Mainnet Graph Node: `npm run deploy:mainnet --config={config.json}`
Where `{config.json}` is the file name of the config you want to deploy. F.e if you want to deploy locally the mainnet config execute: `npm run deploy:local --config=mainnet.json`

### Interact (locally)
- open [Explorer](http://127.0.0.1:8000/subgraphs/name/barnbridge/barnbridge-smart-exposure-local/graphql) in your browser
- example query:
```graphql
{
  epools(first: 5) {
    address: id
    controller
    eTokenFactory
    aggregator
    tokenA
    tokenB
    sFactorA
    sFactorB
    tranches(first: 5) {
      ePool: id
      eToken {
        address: id
        name
        symbol
        decimals
        userBalances(first: 5) {
          user {
            address: id
          }
          balance
        }
      }
      reserveA
      reserveB
      sFactorE
      targetRatio
      rebalances(first: 5) {
        id
        deltaA
        deltaB
        rChange
        timestamp
      }
    }
  }
}
```