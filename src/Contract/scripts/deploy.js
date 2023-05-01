const hre = require('hardhat');
const fs = require('fs');
async function main()
{
  const Block = await hre.ethers.getContractFactory("Block"); //creating an instance using hre - hardhat runtime environment
  var walletAddress= "0x3b83abF1D3e13c9Fb8223BA0a4B5c37CCe6b537b";
  const app = await Block.deploy(walletAddress); //deploying

  await app.deployed();

  console.log("Deployed to:", app.address);
  const data = {
    address: app.address, // getting the address where it is deployed
    abi: JSON.parse(app.interface.format('json')), //putting abi-application binary interface in json format 
  };
  fs.writeFileSync('./contract-data.json',JSON.stringify(data));//writing to file
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
