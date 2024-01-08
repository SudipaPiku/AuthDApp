import Web3 from 'web3';
import Abi from './abi';
import keccak256 from 'keccak256';

const provider = {
    contractAddress: '0xEE5050d3D945F1617747B4920AaFbFF1B770C6E9',
    buyAddress: '0x15bd6073fAeC1461C996fe2f1ffbeeCf2eDA42f8',
    w3: new Web3(window.ethereum),
    account: null,
    contract: null,
    buyContract: null,
    metamask: window.ethereum,
    keccakHash: function (secretId) {
        const encoding = this.w3.eth.abi.encodeParameter('uint256', secretId);
        const hash = keccak256(encoding);
        return hash;
    },
    logout:async function () {
        
    },
    login: async function () {
        try {
            // Request MetaMask to connect
            await this.metamask.request({ method: 'eth_requestAccounts' });
            await this.setAccount();
        } catch (error) {
            console.error(error);
            throw new Error({ message: 'MetaMask login failed', code: 400 });
        }
    },
    isLoggedIn: async function () {
        try {
            const accounts = await this.metamask.request({ method: 'eth_accounts' });
            return accounts.length > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    setAccount: async function () {
        const accounts = await this.metamask.request({ method: 'eth_accounts' });
        this.account = accounts[0];
        console.log(accounts);
    },
    getAccount: function () {
        return this.account;
    },
    getProvider: function () {
        return this.w3;
    },
    setProvider: async function () {
        // Using the injected MetaMask provider
        this.w3 = new Web3(window.ethereum);
    },
    setContract: async function () {
        const contract = await new this.w3.eth.Contract(Abi.counterfeitAbi, this.contractAddress);
        const side = await new this.w3.eth.Contract(Abi.buyAbi, this.buyAddress);
        this.buyContract = side;
        this.contract = contract;
    },
    callTransaction: async function (method, parameters = []) {
        try {
            const result = await this.contract.methods[method](...parameters).call({ from: this.account });
            return result;
        } catch (error) {
            console.log(error);
            const err = new Error();
            err.message = error.message;
            err.code = 204;
            throw err;
        }
    },
    sendTransaction: async function (method, parameters = [], toBuy = false) {
        try {
            const transaction = {
                from: this.account,
                to: toBuy ? this.buyAddress : this.contractAddress,
                gas: 500000,
            };
            const contractToUse = toBuy ? this.buyContract : this.contract;
            const receipt = await contractToUse.methods[method](...parameters).send(transaction);
            console.log(receipt);
            return receipt;
        } catch (error) {
            console.log(error);
            const er ='no';
            return er;
            // return new Error(error.message);
        }
    },
};

export default provider;
