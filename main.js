const SHA256 = require("crypto-js/sha256");
class Block {
  constructor(index,height,time,body,previousBlockHash=''){
     this.index=index;
     this.height=height;
     this.time=time;
     this.body=body;
     this.previousBlockHash = previousBlockHash;
     this.hash = this.calculateHash();
  }
  calculateHash(){
    return SHA256(this.index+this.height+this.time+this.previousBlockHash+JSON.stringify(this.data)).toString(); //otherwise we get an object
  }
}
class Blockchain {
  constructor()
  {
    this.chain=[this.createGenesisBlock()]; //array for blockchain blocks
  }
  createGenesisBlock(){
    return new Block(0,"1325438","30/09/2020","Genesis Block","0");
  }

getLatestBlock(){
  return this.chain[this.chain.length-1]; //Last element/block in array
}

addBlock(newBlock){
  newBlock.previousBlockHash = this.getLatestBlock().hash;
  newBlock.hash = newBlock.calculateHash();
  this.chain.push(newBlock);
}

showHeight(index){
  for(let i=0; i<this.chain.length; i++)
  {
    // if(index==i)
    // {
    //   console.log("Height of the block with index",i,"is: ",this.chain[i].height);
    // }
    console.log("Height of the block with index",i,"is: ",this.chain[i].height);
  }
}

showBlockchain(){
  console.log("------------------BLOCKCHAIN---------------");
  console.log(JSON.stringify(private_blockchain,null,4));
  console.log("-------------------------------------------");
}

validateChain(){
  for(let i=1; i<this.chain.length; i++) //We dont want to compare Genesis block with anything hence i=1
  {
    const currentBlock=this.chain[i];
    const previousBlock=this.chain[i-1];
    if(currentBlock.hash !== currentBlock.calculateHash())
    {
      return false;
    }
    if(currentBlock.previousBlockHash !== previousBlock.hash)
    {
      return false;
    }
  }
  return true;
 }
}

let private_blockchain = new Blockchain();
private_blockchain.addBlock(new Block(1,"1325439","1/10/2020",{amount:4}));
private_blockchain.addBlock(new Block(2,"1325440","2/10/2020",{amount:10}));

private_blockchain.showBlockchain();
private_blockchain.showHeight();


//-------------------TESTING VALIDATION--------------------
// console.log("VALID?",private_blockchain.validateChain());

// private_blockchain.chain[1].data= { amount: 100};
// private_blockchain.chain[1].hash= private_blockchain.chain[1].calculateHash();

// console.log("VALID?",private_blockchain.validateChain());
//-----------------------------------------------------------

// private_blockchain.showHeight(new Block(0,"1325438","30/09/2020","Genesis Block","0"));
//private_blockchain.showheight(2);