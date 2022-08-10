const hre = require("hardhat");
const fs = require("fs");

const tag = "v0.0.6";
const network = process.env.HARDHAT_NETWORK || "hardhat";

const version = require("../publish/rinkeby.version.json")[tag];
console.log("VERSION",version)
const openseaProxyRegistry = "0xa5409ec958C83C3f309868babACA7c86DCB077c1";

async function main() {
  const ethers = hre.ethers;
  const artifacts = hre.artifacts;

  const signer = (await ethers.getSigners())[0];
  const vault = signer;

  console.log("deployer: ", signer.address);
  console.log("vault: ", vault.address);

  const KoiToken = await artifacts.readArtifact("KoiToken");
  const koiToken = await ethers.getContractAt(
    KoiToken.abi,
    version.contracts.KoiToken
  );
  console.log("KoiToken at at: ", koiToken.address);

  const KoiRouter = await artifacts.readArtifact("KoiRouter");
  const koiRouter = await ethers.getContractAt(
    KoiRouter.abi,
    version.contracts.KoiRouter
  );
  console.log("KoiRouter at at: ", koiRouter.address);

  await koiToken.setBaseMetadataURI("https://devbundler.openkoi.com:8885/token/");
  console.log("setBaseMetadataURI");

   await koiToken.create(signer.address, 1, "", "0x");
  //  console.log(await koiToken.contractURI())
  // await koiToken.setApprovalForAll(koiRouter.address,true);
  // console.log(await koiRouter.deposit(koiToken.address,1,1,"j8KnBt3TsZdENGhbfpj4E8lI5mghwTfWIIqVMsdrx14",{ value: ethers.utils.parseEther("0.00015"),}))
   ////test await koiRouter.deposit(koiToken.address,1,1,"j8KnBt3TsZdENGhbfpj4E8lI5mghwTfWIIqVMsdrx14",{ gasPrice: 1000000000, gasLimit: 100000})
    // console.log(await koiRouter.bridgeFee())
    // console.log(await koiRouter.setBridgeFee(150000000000000))

   console.log("create");
  const id = (
    await Promise.all([
      new Promise((resolve, reject) => {
        // from address(0) to my wallet address
        let filter = koiToken.filters.TransferSingle(
          undefined,
          "0x0000000000000000000000000000000000000000",
          signer.address,
          undefined,
          undefined
        );

        // Listen for our filtered results
        koiToken.on(filter, (operator, from, to, id, amount) => {
          resolve(id);
        });
      }),
    ])
  )[0].toString();
  console.log("tokenId = ", id);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
