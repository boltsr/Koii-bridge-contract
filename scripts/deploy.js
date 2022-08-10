const hre = require("hardhat");
const fs = require("fs");

const tag = "v0.0.7";
const network = process.env.HARDHAT_NETWORK || "rinkeby";

const openseaProxyRegistry = "0xF57B2c51dED3A29e6891aba85459d600256Cf317";//0xa5409ec958C83C3f309868babACA7c86DCB077c1

async function main() {
  const ethers = hre.ethers;

  const signer = (await ethers.getSigners())[0];
  console.log(signer);
  const vault = signer;

  console.log("deployer: ", signer.address);
  console.log("vault: ", vault.address);

  const KoiToken = await ethers.getContractFactory("KoiToken");
  const koiToken = await KoiToken.deploy(
    "Koi Token",
    "KOI",
    openseaProxyRegistry
  );
  await koiToken.deployed();
  console.log("KoiToken deployed at: ", koiToken.address);

  const KoiRouter = await ethers.getContractFactory("KoiRouter");
  console.log("KOI ROUTER VAULT",vault.address)
  const koiRouter = await KoiRouter.deploy(koiToken.address, vault.address, 140000000000000);
  await koiRouter.deployed();
  console.log("KoiRouter deployed at: ", koiRouter.address);

  // need to register KoiToken address on OpenSea-Registry

  let versions = require(`../publish/${network}.version.json`);
  versions[tag] = {
    deployer: signer.address,
    contracts: {
      KoiToken: koiToken.address,
      KoiRouter: koiRouter.address,
    },
  };

  // convert JSON object to string
  const data = JSON.stringify(versions, null, 2);
  console.log(data);

  fs.writeFileSync(`publish/${network}.version.json`, data);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
