import { ethers, upgrades } from "hardhat";

async function main() {

    const gnosisSafe = '0x136aE31A3766Cea9Ea33FEF614C049c41678eaBf';

    console.log("Transferring ownership of ProxyAdmin...");
    // The owner of the ProxyAdmin can upgrade our contracts
    await upgrades.admin.transferProxyAdminOwnership(gnosisSafe);
    console.log("Transferred ownership of ProxyAdmin to:", gnosisSafe);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
