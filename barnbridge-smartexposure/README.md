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