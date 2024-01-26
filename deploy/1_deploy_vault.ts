import {DeployFunction} from "hardhat-deploy/types";
import {parseEther, parseUnits} from "ethers/lib/utils";
import {
    CHAIN_ID_LOCAL,
    CHAIN_ID_ZKSYNC_TESTNET,
    getDeployByChainIdAndName,
    getNativeNameByChainId,
    getPythAddressByChainId
} from "../helpers/chains";
import {AddressZero} from "../helpers/utils";
import {ethers} from "hardhat";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId, getUnnamedAccounts}) {
    const {deploy, execute} = deployments;
    const {owner,deployer,feeCollector} = await getNamedAccounts();
    const chainId = await getChainId();
    console.log(">> starting deploying on chainId:", chainId);
    console.log(">> deploying vault...");

    const Vault = await deploy("Vault", {
        from: owner,
        args: [],
        log: true,
    });


    console.log(`deployer: ${deployer}`);
};
export default func;
func.tags = ["vault"];
