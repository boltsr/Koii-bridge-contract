require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-web3"); //For openzeppelin
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-gas-reporter");
require("hardhat-abi-exporter");
require("solidity-coverage");
require("@typechain/hardhat");

module.exports = {
  defaultNetwork: "rinkeby",
  gasReporter: {
    showTimeSpent: true,
    currency: "USD",
  },
  networks: {
    hardhat: {
    },
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545",
      timeout: 10000000,
      accounts: process.env.PRIVATE_KEY ? ["5cd13e8058855907fe1badd6f4f72130f6f0e42e5e70d0f1f22e2979d9541c32"] : undefined,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/70c4cf77c9054fd3a3196659f7dfe4f7`,
      accounts: ["5cd13e8058855907fe1badd6f4f72130f6f0e42e5e70d0f1f22e2979d9541c32"],
      timeout: 10000000,
     
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: process.env.PRIVATE_KEY ? ["5cd13e8058855907fe1badd6f4f72130f6f0e42e5e70d0f1f22e2979d9541c32"] : undefined,
      timeout: 10000000,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 200000,
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`,
  },
  abiExporter: {
    path: "./abi",
    clear: true,
    flat: true,
    only: ["KoiToken", "KoiRouter"],
    except: ["interface"],
    spacing: 2,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
};