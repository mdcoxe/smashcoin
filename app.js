//built following https://www.smashingmagazine.com/2020/02/cryptocurrency-blockchain-node-js/


//The crypto block

const SHA256 = require('crypto-js/sha256');
class CryptoBlock{
    constructor(index, timestamp, data, precedingHash= " "){
        //index - unique number that tracks the position of every block in the entire blockchain
        this.index = index;
        //timestamp - keeps a record of the time occurance of each completed transaction
        this.timestamp = timestamp;
        //data - provides data about the completed transactions 
        this.data = data;
        //precedingHash - points to the hash of the preceding block in the blockchain...important to maintain integrity
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
    }
    //calculates the hash based on the properties  
    computeHash(){
        return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
};

class CryptoBlockchain{
    constructor(){
        this.blockchain = [this.startGenesisBlock()];
    }
    //creates the initial block using CryptoBlock class from above
    startGenesisBlock(){
        return new CryptoBlock(0, '01/01/2020', 'Initial block in the chain', '0');
    }
    //Gets latest block in the blockchain, ensures the hash of current block points to the hash of previous block = maintains integrity of chain
    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock){

        newBlock.precedingHash = this.obtainLatestBlock().hash;
        //calculate the crypto hash
        newBlock.hash = newBlock.computeHash();
        //push new block to blockchain
        this.blockchain.push(newBlock);
    }
};

//test the blockchain
let smashCoin = new CryptoBlockchain();
smashCoin.addNewBlock(new CryptoBlock(1, '01/06/2020', {sender: 'Iris LjesnJanin', recipient: 'Cosima Mielke', quantity: 50}));
smashCoin.addNewBlock(new CryptoBlock(2, '01/07/2020', {sender: 'Vitaly Friedman', recipient: 'Ricardo Gimenes', quantity: 100}));
console.log(JSON.stringify(smashCoin, null, 4));