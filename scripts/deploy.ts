// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Token = await ethers.getContractFactory("Token");
  console.log('deploying the token...')
  const token = await await upgrades.deployProxy(Token);;

  await token.deployed();

  console.log("Token deployed to:", token.address);

  // const Staking = await ethers.getContractFactory("Staking");
  // const staking = await Staking.deploy("Hello, Staking!");

  // await staking.deployed();

  // console.log("Greeter deployed to:", staking.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
