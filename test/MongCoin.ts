import { BigNumber } from "ethers"
import { ethers } from "hardhat"
import { expect } from "chai"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { MongCoin } from "../typechain/contracts/MongCoin"
import { MongCoin__factory } from "../typechain/factories/contracts/MongCoin__factory"

describe("MongCoin contract", function () {
  let MongCoinFactory: MongCoin__factory
  let MongCoinContract: MongCoin
  let owner: SignerWithAddress
  let accounts: SignerWithAddress[]

  let totalSupply = BigNumber.from("690000000000000").mul("1000000000000000000")

  const initialSetup = async () => {
    ;[owner, ...accounts] = await ethers.getSigners()
  }

  const deployContract = async () => {
    MongCoinFactory = (await ethers.getContractFactory("MongCoin")) as MongCoin__factory

    MongCoinContract = await MongCoinFactory.deploy()

    await MongCoinContract.deployed()
  }

  before(initialSetup)

  describe("Deployment", function () {
    before(deployContract)

    it("Should mint the right amount of tokens to the deployer", async function () {
      expect(await MongCoinContract.balanceOf(owner.address)).to.equal(totalSupply)
    })
  })
})
