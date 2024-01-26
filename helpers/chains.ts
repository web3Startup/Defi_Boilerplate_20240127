// import {deployments, ethers, getNamedAccounts} from "hardhat";
// import {parseEther} from "ethers/lib/utils";
// import {
//     FEED_ID_ARB_MAIN,
//     FEED_ID_ARB_TEST,
//     FEED_ID_BTC_MAIN,
//     FEED_ID_BTC_TEST, FEED_ID_DOGE_MAIN,
//     FEED_ID_DOGE_TEST,
//     FEED_ID_ETH_MAIN,
//     FEED_ID_ETH_TEST, FEED_ID_FIL_MAIN,
//     FEED_ID_FIL_TEST, FEED_ID_LTC_MAIN,
//     FEED_ID_LTC_TEST, FEED_ID_MSFT_MAIN,
//     FEED_ID_MSFT_TEST, FEED_ID_TSLA_MAIN,
//     FEED_ID_TSLA_TEST,
//     FEED_ID_USDC_MAIN,
//     FEED_ID_USDC_TEST,
//     PRICE_FEED_BTC_MUMBAI,
//     PRICE_FEED_DAI_MUMBAI,
//     PRICE_FEED_ETH_MUMBAI,
//     PRICE_FEED_MATIC_MUMBAI,
//     PYTH_CONTRACT_ZKSYNC_MAINNET,
//     PYTH_CONTRACT_ZKSYNC_TESTNET
// } from "./constants";
//
// const {deploy, execute, get} = deployments;
// // chain ids
// export const CHAIN_ID_LOCAL = "31337";
// export const CHAIN_ID_MUMBAI = "80001";
// export const CHAIN_ID_ZKSYNC_TESTNET = "280";
// export const CHAIN_ID_ZKSYNC_MAINNET = "324";
//
// // distinct native token chain ids (not eth)
// export const DISTINCT_CHAIN_IDS = [
//     CHAIN_ID_MUMBAI,
// ];
//
// export const getNativeNameByChainId = (chainId: string) => {
//     if (chainId == CHAIN_ID_MUMBAI)
//         return "WMatic";
//     else
//         return "WETH";
// }
//
// export const getDeployByChainIdAndName = async (chainId: string, deployName: string, contractName: string, args: any[]) => {
//     const {owner} = await getNamedAccounts();
//     let result;
//
//     try {
//         let deployed = await get(deployName);
//         if (deployed != null) {
//             console.log(">>> reusing contract:", deployName);
//             result = await ethers.getContractAt(contractName, deployed.address);
//             return result;
//         }
//     } catch (e) {
//     }
//
//     if (chainId == CHAIN_ID_LOCAL) {
//         const deployed = await deploy(deployName, {
//             contract: contractName,
//             from: owner,
//             args: args,
//             log: true,
//         });
//         result = await ethers.getContractAt(contractName, deployed.address);
//         if (deployName == "WNative") {
//             const {miner} = await getNamedAccounts();
//             await execute("WNative", {from: miner, value: parseEther("100")}, "deposit"); // deposit eth in case withdraw
//         }
//     } else if (chainId == CHAIN_ID_ZKSYNC_TESTNET || chainId == CHAIN_ID_ZKSYNC_MAINNET) {
//         const deployed = await deploy(deployName, {
//             contract: contractName,
//             from: owner,
//             args: args,
//             log: true,
//         });
//         result = await ethers.getContractAt(contractName, deployed.address);
//     } else if (chainId == CHAIN_ID_MUMBAI) {
//         let addr = "";
//         switch (deployName) {
//             case "WNativePriceFeed":
//                 addr = PRICE_FEED_MATIC_MUMBAI;
//                 break;
//             case "WethPriceFeed":
//                 addr = PRICE_FEED_ETH_MUMBAI;
//                 break;
//             case "DaiPriceFeed":
//                 addr = PRICE_FEED_DAI_MUMBAI;
//                 break;
//             case "WbtcPriceFeed":
//                 addr = PRICE_FEED_BTC_MUMBAI;
//         }
//         if (addr != "")
//             return await ethers.getContractAt(contractName, addr);
//
//         const deployed = await deploy(deployName, {
//             contract: contractName,
//             from: owner,
//             args: args,
//             log: true,
//         });
//         result = await ethers.getContractAt(contractName, deployed.address);
//     }
//
//     if (!result)
//         throw new Error("getDeployByChainIdAndName Wrong!");
//     return result;
// };
//
// export const getPythAddressByChainId = async (chainId: string) => {
//     if (chainId == CHAIN_ID_ZKSYNC_TESTNET) {
//         return PYTH_CONTRACT_ZKSYNC_TESTNET;
//     } else if (chainId == CHAIN_ID_ZKSYNC_MAINNET) {
//         return PYTH_CONTRACT_ZKSYNC_MAINNET;
//     } else {
//         const {owner} = await getNamedAccounts();
//         const PythContract = await deploy("PythContract", {
//             from: owner,
//             args: [],
//             log: true,
//         });
//         return PythContract.address;
//     }
// }
//
// export const getFeedIdByChainAndToken = (chainId: string, token: string) => {
//     token = token.toUpperCase();
//     if (chainId == CHAIN_ID_ZKSYNC_MAINNET) {
//         switch (token) {
//             case "WBTC":
//                 return FEED_ID_BTC_MAIN;
//             case "WETH":
//                 return FEED_ID_ETH_MAIN;
//             case "WNATIVE":
//                 return FEED_ID_ETH_MAIN;
//             case "USDC":
//                 return FEED_ID_USDC_MAIN;
//             case "DOGE":
//                 return FEED_ID_DOGE_MAIN;
//             case "LTC":
//                 return FEED_ID_LTC_MAIN;
//             case "ARB":
//                 return FEED_ID_ARB_MAIN;
//             case "FIL":
//                 return FEED_ID_FIL_MAIN;
//             case "MSFT":
//                 return FEED_ID_MSFT_MAIN;
//             case "TSLA":
//                 return FEED_ID_TSLA_MAIN;
//         }
//     } else {
//         switch (token) {
//             case "WBTC":
//                 return FEED_ID_BTC_TEST;
//             case "WETH":
//                 return FEED_ID_ETH_TEST;
//             case "USDC":
//                 return FEED_ID_USDC_TEST;
//             case "DOGE":
//                 return FEED_ID_DOGE_TEST;
//             case "LTC":
//                 return FEED_ID_LTC_TEST;
//             case "ARB":
//                 return FEED_ID_ARB_TEST;
//             case "FIL":
//                 return FEED_ID_FIL_TEST;
//             case "MSFT":
//                 return FEED_ID_MSFT_TEST;
//             case "TSLA":
//                 return FEED_ID_TSLA_TEST;
//         }
//     }
// }
//
// export const getRobotsByChainId = (chainId: string) => {
//     let robots = [];
//     if (CHAIN_ID_ZKSYNC_TESTNET == chainId) {
//         robots = [
//             "0x3aaa18176100dd870903d465134d0522457aa70d",
//             "0xb33539b8e18ff1bdf299d66c0e89fbe5e3de68b2",
//             "0x104b5cda666a504da51220035f930a77b22b8124",
//         ]
//     } else if (CHAIN_ID_ZKSYNC_MAINNET == chainId) {
//         robots = [
//             "0xe118d2e27cdbb2cf1e67000a22b9d6b57e06eb3a"
//         ]
//     }
//     return robots;
// }
