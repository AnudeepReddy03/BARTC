const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {
  it("Working", async function () {
  const Block = await ethers.getContractFactory("Block");
  const block = await Block.deploy();
  await block.deployed();
  
  });
})