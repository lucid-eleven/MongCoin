import { HardhatUserConfig } from "hardhat/types"
import "dotenv/config"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "hardhat-gas-reporter"
import "hardhat-contract-sizer"
import "@typechain/hardhat"
import "solidity-coverage"

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      gas: "auto",
      forking: {
        url: process.env.MAINNET_API_URI!,
        blockNumber: 17134996,
      },
    },
    goerli: {
      url: process.env.GOERLI_API_URI!,
      accounts: [process.env.GOERLI_ACCOUNT_PRIVATE_KEY!],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  contractSizer: {
    runOnCompile: true,
  },
  gasReporter: {
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    gasPrice: 100,
    showTimeSpent: true,
    token: "ETH",
    gasPriceApi: "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
  },
  typechain: {
    outDir: "./typechain",
    target: "ethers-v5",
  },
  mocha: {
    timeout: 0,
  },
}

export default config
