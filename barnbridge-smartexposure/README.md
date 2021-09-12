# BarnBridge SmartExposure Subgraph

## Quick Start

### Install
```
$ yarn install
```

### Build
```
$ yarn build
```

### Deploy (locally)
1. clone [graph-node](https://github.com/graphprotocol/graph-node)
2. cd into graph-node/docker
3. run `docker-compose up` (requires docker)
4. deploy subgraph after graph-node is synced
```
$ # barnbridge-smartexposure/
$ yarn deploy:local 
```

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