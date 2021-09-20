# BarnBridge Core Subgraph

Collection of Subgraphs to support the usage of the BarnBridge type of DAOs

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

## Supported APIs

- [X] Overview Info
- [X] Get All Proposals
- [X] Get Proposal by ID
- [X] Get all Votes for a given Proposal ID
- [X] Get all Events for a given Proposal ID
- [X] Get all Voters
- [X] Get all Abrogation Proposals
- [X] Get Abrogation Proposal by ID
- [X] Get Abrogation Proposal Votes by ID