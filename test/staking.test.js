const { ethers } = require('hardhat');
const { use, expect } = require('chai');
const { solidity, MockProvider, deployContract } = require('ethereum-waffle');
const Token = require('../build/Token.json');
use(solidity);

// Utilities methods
const increaseWorldTimeInSeconds = async (seconds, mine = false) => {
    await ethers.provider.send('evm_increaseTime', [seconds]);
    if (mine) {
        await ethers.provider.send('evm_mine', []);
    }
};

describe('Staker dApp', () => {
    let owner;
    let addr1;
    let addr2;
    let addrs;
    const [wallet, walletTo] = new MockProvider().getWallets();
    let stakerContract;
    let tokenContract;
    let TokenContractFactory;

    beforeEach(async () => {
        // Deploy ExampleExternalContract contract
        TokenContractFactory = await ethers.getContractFactory('Token');
        // tokenContract = await TokenContractFactory.deploy();

        tokenContract = await deployContract(wallet, Token)

        // Deploy Staker Contract
        const StakerContract = await ethers.getContractFactory('SimpleStaking');
        stakerContract = await StakerContract.deploy();
        stakerContract.initialize(tokenContract.address);

        // eslint-disable-next-line no-unused-vars
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    });


    describe('Test stake() method', () => {
        it('Stake event emitted', async () => {
            const amount = ethers.utils.parseEther('0.5');
            await expect(() =>
                wallet.sendTransaction({ to: walletTo.address, gasPrice: 0, value: 10 })
            ).to.changeBalance(walletTo, 10)
            // await expect(
            //     stakerContract.stake(wallet, amount),
            // )
            //     .to.emit(stakerContract, 'Stake')
            //     .withArgs(wallet.address, amount);

            await stakerContract.stake(wallet.address, amount);

            // // Check that the contract has the correct amount of ETH we just sent
            // const contractBalance = await ethers.provider.getBalance(stakerContract.address);
            // expect(contractBalance).to.equal(amount);

            // Check that the contract has stored in our balances state the correct amount
            // const addr1Balance = await stakerContract.balances(addr1.address);
            // expect(addr1Balance).to.equal(amount);
        });

        // it('Stake 0.5 ETH from single user', async () => {
        //     const amount = ethers.utils.parseEther('0.5');
        //     const tx = await stakerContract.connect(addr1).stake({
        //         value: amount,
        //     });
        //     await tx.wait();

        //     // Check that the contract has the correct amount of ETH we just sent
        //     const contractBalance = await ethers.provider.getBalance(stakerContract.address);
        //     expect(contractBalance).to.equal(amount);

        //     // Check that the contract has stored in our balances state the correct amount
        //     const addr1Balance = await stakerContract.balances(addr1.address);
        //     expect(addr1Balance).to.equal(amount);
        // });

        // it('Stake reverted if deadline is reached', async () => {
        //     // Let deadline be reached
        //     await increaseWorldTimeInSeconds(180, true);

        //     const amount = ethers.utils.parseEther('0.5');
        //     await expect(
        //         stakerContract.connect(addr1).stake({
        //             value: amount,
        //         }),
        //     ).to.be.revertedWith('Deadline is already reached');
        // });

        // it('Stake reverted if external contract is completed', async () => {
        //     const amount = ethers.utils.parseEther('1');
        //     // Complete the stake process
        //     const txStake = await await stakerContract.connect(addr1).stake({
        //         value: amount,
        //     });
        //     await txStake.wait();

        //     // execute it
        //     const txExecute = await stakerContract.connect(addr1).execute();
        //     await txExecute.wait();

        //     await expect(
        //         stakerContract.connect(addr1).stake({
        //             value: amount,
        //         }),
        //     ).to.be.revertedWith('staking process already completed');
        // });
    });
});