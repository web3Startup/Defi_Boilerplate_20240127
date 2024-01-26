import {deployments, ethers, getChainId, getNamedAccounts, network} from "hardhat";
import {Vault} from "../typechain";
import {CHAIN_ID_LOCAL, CHAIN_ID_ZKSYNC_MAINNET, CHAIN_ID_ZKSYNC_TESTNET} from "./chains";

export const {AddressZero, MaxInt256: ApproveAmount} = ethers.constants

export const setupFixture = deployments.createFixture(async () => {
    await deployments.fixture();
    return getContracts();
});

export async function getContracts() {

    const chainId = await getChainId();
    const contracts: any = {
        vault: await ethers.getContract<Vault>("Vault"),
    };

    let users: any = {
        owner: await ethers.getNamedSigner("owner")
    }
    return {...contracts, ...users};
}

export function splitter() {
    console.log("------------------------------ SPLITTER ------------------------------");
}
export function splitterTitle(title: string) {
    console.log("------------------------------" + title + "------------------------------");
}



