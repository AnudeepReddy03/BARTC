const hre = require('hardhat');
const fs = require('fs');
async function main()
{
  const Block = await hre.ethers.getContractFactory("Block");
  var walletAddress= "0x3b83abF1D3e13c9Fb8223BA0a4B5c37CCe6b537b";
  const app = await Block.deploy(walletAddress);

  await app.deployed();

  console.log("Deployed to:", app.address);
  const data = {
    address: app.address,
    abi: JSON.parse(app.interface.format('json')),
  };
  fs.writeFileSync('./contract-data.json',JSON.stringify(data));
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
