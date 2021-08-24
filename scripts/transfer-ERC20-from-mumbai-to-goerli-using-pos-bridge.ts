import { MaticPOSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import { eventTracking } from "../utils";

interface TransferERC20FromPolygonToEthereumUsingPOSBridge {
  polygonMumbaiApiUrl: string;
  polygonAccountPrivateKey: string;
  ethereumAccountPrivateKey: string;
  ethereumHttpsApiUrl: string;
  ethereumWebsocktesApiUrl: string;
  childTokenAddress: string;
  recepientAddress: string;
  amountTokenInEther: string;
  rootChainProxyAddress: string;
}

export async function transferERC20FromPolygonToEthereumUsingPOSBridge({
  polygonMumbaiApiUrl,
  polygonAccountPrivateKey,
  ethereumAccountPrivateKey,
  ethereumHttpsApiUrl,
  ethereumWebsocktesApiUrl,
  childTokenAddress,
  amountTokenInEther,
  // RootChainProxy Address on root chain (0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287 for mainnet)
  rootChainProxyAddress,
}: TransferERC20FromPolygonToEthereumUsingPOSBridge) {
  // https://github.com/trufflesuite/truffle-hdwallet-provider
  // set the shareNonce to false so maticProvider and parentProvider won't share nonce which causes errors
  const maticProvider = new HDWalletProvider(
    polygonAccountPrivateKey,
    polygonMumbaiApiUrl,
    0,
    1,
    false
  );

  const parentProvider = new HDWalletProvider(
    ethereumAccountPrivateKey,
    ethereumHttpsApiUrl,
    0,
    1,
    false
  );

  const maticPOSClient = new MaticPOSClient({
    network: "testnet",
    version: "mumbai",
    parentProvider,
    maticProvider,
  });

  const from = maticProvider.getAddress();

  const amount = Web3.utils.toWei(amountTokenInEther, "ether");

  console.log(`sending ${amountTokenInEther} token`);

  const burn = await maticPOSClient.burnERC20(childTokenAddress, amount, {
    from,
  });

  const { transactionHash: burnTransationHash } = burn;

  console.log(`Burned successfully, transaction hash: ${burnTransationHash}`);

  const parentWebsocketProvider = new Web3.providers.WebsocketProvider(
    ethereumWebsocktesApiUrl
  );

  const parentWebsocketWeb3 = new Web3(parentWebsocketProvider);

  const childWeb3 = new Web3(maticProvider);

  // All transactions that occur on Matic chain are check-pointed to the Ethereum chain in frequent intervals of time by the validators. This time is ~10 mins on Mumbai and ~30 mins on Matic mainnet.
  console.log(
    "Waiting for the burn transaction check-point on the Ethereum chain. It can take up to 10 minutes, please don`t shut down the console."
  );
  const log = await eventTracking.checkInclusion({
    txHash: burnTransationHash,
    rootChainAddress: rootChainProxyAddress,
    childWeb3,
    parentWebsocketWeb3,
  });

  console.log(
    `burned transaction confirmed on the etherum chain, tx hash: ${log.transactionHash}`
  );

  await maticPOSClient.exitERC20(burnTransationHash, { from });

  console.log("transfer completed");

  parentWebsocketProvider.disconnect(0, "script ended");

  process.exit(0);
}

// transferERC20FromPolygonToEthereumUsingPOSBridge({
//   polygonMumbaiApiUrl: config.polygonMumbaiApiUrl,
//   polygonAccountPrivateKey: "0.01",
//   ethereumAccountPrivateKey: config.privateKey,
//   ethereumHttpsApiUrl: config.ethereumApiUrl,
//   ethereumWebsocktesApiUrl: config.ethereumWebsocketsApiUrl,
//   childTokenAddress,
//   amountTokenInEther: "0.01",
//   rootChainProxyAddress,
// });
