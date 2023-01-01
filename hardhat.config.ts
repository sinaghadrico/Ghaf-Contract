import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { HttpNetworkUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "hardhat-deploy-tenderly";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";

dotenv.config();

const infuraNetwork = (
  accounts: any,
  network: string,
  chainId?: number,
  gas?: number
): HttpNetworkUserConfig => {
  return {
    url: `https://${network}.infura.io/v3/${process.env.PROJECT_ID}`,
    chainId,
    gas,
    accounts,
    gasPrice: 200000000000,
  };
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
    ],
  },
  networks: {
    mainnet: infuraNetwork(
      process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      "mainnet",
      1,
      6283185
    ),
    ropsten: infuraNetwork(
      process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      "ropsten",
      3,
      6283185
    ),
    rinkeby: infuraNetwork(
      process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      "rinkeby",
      4,
      6283185
    ),
    kovan: infuraNetwork(
      process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      "kovan",
      42,
      6283185
    ),
    goerli: infuraNetwork(
      process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      "goerli",
      5,
      6283185
    ),
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com/",
      chainId: 137,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      url: process.env.ALCHEMY_URL || "https://rpc-mumbai.matic.today",
      chainId: 80001,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bsc_testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  paths: {
    artifacts: "artifacts",
    deploy: "deploy",
    deployments: "deployments",
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    // enabled: true,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
