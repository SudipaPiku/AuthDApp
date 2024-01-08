# AuthDApp
AuthDApp is a blockchain based web application to fight product counterfeiting.

## Installation

Uses [truffle](https://www.trufflesuite.com/) for easy compilation and deployment.

## Steps to run the application

1. Install dependencies for smart contracts

    ```
    npm i
    ```

2. Modify truffle-config.js file depending upon the blockchain network you are using for deploying and then deploy smart contracts to local-blockchain/testnet/mainnet. Example - 
    ```
    truffle deploy --network development
    ``` 

3. In web3Provider.js file modify values of `contractAddress`, `nodeurl`, `chainId`, `buyAddress` with your deployed values.


4. Install dependencies and run frontend application
    ```
    cd app
    npm i 
    npm start
    ```
