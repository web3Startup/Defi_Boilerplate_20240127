import {deployments, ethers, getChainId, getNamedAccounts, network} from "hardhat";
import {
    OrderBook,
    OrderBookReader,
    PositionManager,
    PythContract,
    Reader,
    RewardRouterV2,
    Router,
    ShortsTracker,
    Timelock,
    Token,
    Vault,
    VaultErrorController,
    VaultPriceFeed,
    VaultUtils,
    VaultV2,
    ZKDLP,
    ZkdlpManager,
    ZKDXLV1,
    ZkdxStaking,
    ZKHLPManager,
    ZKHLP,
    AIPC,
    HedgeManager,
    ZKDXNFT,
    MultiTransfer
} from "../typechain";
import {formatEther, formatUnits, parseUnits} from "ethers/lib/utils";
import {BigNumber, BigNumberish, ContractTransaction} from "ethers";
import {
    BASIS_POINTS_DIVISOR,
    FEED_ID_ARB_MAIN,
    FEED_ID_ARB_TEST,
    FEED_ID_BTC_MAIN,
    FEED_ID_BTC_TEST,
    FEED_ID_DAI_TEST,
    FEED_ID_DOGE_MAIN,
    FEED_ID_DOGE_TEST,
    FEED_ID_ETH_MAIN,
    FEED_ID_ETH_TEST,
    FEED_ID_FIL_MAIN,
    FEED_ID_FIL_TEST,
    FEED_ID_LTC_MAIN,
    FEED_ID_LTC_TEST,
    FEED_ID_MSFT_MAIN,
    FEED_ID_MSFT_TEST,
    FEED_ID_TSLA_MAIN,
    FEED_ID_TSLA_TEST,
    FEED_ID_USDC_TEST,
    FUNDING_RATE_PRECISION,
    LIQUIDATION_FEE,
    MARGIN_FEE_BASIS_POINTS,
    MAX_LEVERAGE,
    PYTH_CONTRACT_ZKSYNC_MAINNET,
    PYTH_CONTRACT_ZKSYNC_TESTNET
} from "./constants";
import {CHAIN_ID_LOCAL, CHAIN_ID_ZKSYNC_MAINNET, CHAIN_ID_ZKSYNC_TESTNET} from "./chains";
import {EvmPriceServiceConnection} from "@pythnetwork/pyth-evm-js";

export const {AddressZero, MaxInt256: ApproveAmount} = ethers.constants

export const setupFixture = deployments.createFixture(async () => {
    await deployments.fixture();
    return getContracts();
});

export async function getContracts() {

    const chainId = await getChainId();
    const contracts: any = {
        // vault: await ethers.getContract<Vault>("Vault"),
    };

    let users: any = {
        owner: await ethers.getNamedSigner("owner")
    }

    if (chainId == CHAIN_ID_ZKSYNC_TESTNET || chainId == CHAIN_ID_ZKSYNC_MAINNET) {
        contracts.weth = await ethers.getContract<Token>("WNative");
        contracts.usdc = await ethers.getContract<Token>("USDC");
        contracts.doge = await ethers.getContract<Token>("DOGE");
        contracts.ltc = await ethers.getContract<Token>("LTC");
        contracts.arb = await ethers.getContract<Token>("ARB");
        contracts.fil = await ethers.getContract<Token>("FIL");
        contracts.msft = await ethers.getContract<Token>("MSFT");
        if (chainId == CHAIN_ID_ZKSYNC_TESTNET) {
            users.user0 = await ethers.getNamedSigner("user0");
            users.user1 = await ethers.getNamedSigner("user1");
            contracts.orderBook = await ethers.getContract<OrderBook>("OrderBook");
            contracts.orderBookReader = await ethers.getContract<OrderBookReader>("OrderBookReader");
            contracts.trueUSDC = await ethers.getContract<Token>("trueUSDC");
        } else if (chainId == CHAIN_ID_ZKSYNC_MAINNET) {
            contracts.esZKDX = await ethers.getContract<Token>("esZKDX");
            contracts.nft1 = await ethers.getContract<ZKDXNFT>("ZKDXNFT");
            contracts.nft2 = await ethers.getContract<ZKDXNFT>("ZKDXNFT2");
            contracts.nft5 = await ethers.getContract<ZKDXNFT>("ZKDXNFT5");
            contracts.multiTransfer = await ethers.getContract<MultiTransfer>("MultiTransfer");
        }
    } else if (chainId == CHAIN_ID_LOCAL) {
    }

    return {...contracts, ...users};
}

export function splitter() {
    console.log("------------------------------ SPLITTER ------------------------------");
}
export function splitterTitle(title: string) {
    console.log("------------------------------" + title + "------------------------------");
}



