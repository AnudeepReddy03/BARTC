const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () { //Like a test case 
  it("Working", async function () {
  const Block = await ethers.getContractFactory("Block"); //creating instance of Block
  const block = await Block.deploy(); //deploying it to the blockchain
  await block.deployed();
  
  });
})