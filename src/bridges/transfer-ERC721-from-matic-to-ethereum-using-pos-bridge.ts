import { MaticPOSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import { eventTracking } from "../utils";

export interface TransferERC721FromMaticToEthereumUsingPOSBridge {
  polygonMumbaiApiUrl: string;
  polygonAccountPrivateKey: string;
  accountPrivateKey: string;
  ethereumHttpsApiUrl: string;
  ethereumWebsocktesApiUrl: string;
  childTokenAddress: string;
  tokenId: string;
  recipientAddress: string;
  rootChainProxyAddress?: string;
  maticNetwork?: string;
  maticVersion?: string;
}

export async function transferERC721FromMaticToEthereumUsingPOSBridge({
  polygonMumbaiApiUrl,
  accountPrivateKey,
  ethereumHttpsApiUrl,
  ethereumWebsocktesApiUrl,
  childTokenAddress,
  tokenId,
  recipientAddress,
  // RootChainProxy Address on root chain (0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287 for mainnet)
  rootChainProxyAddress = "0x2890ba17efe978480615e330ecb65333b880928e",
  maticNetwork = "testnet",
  maticVersion = "mumbai",
}: TransferERC721FromMaticToEthereumUsingPOSBridge) {
  // https://github.com/trufflesuite/truffle-hdwallet-provider
  // set the shareNonce to false so maticProvider and parentProvider won't share nonce which causes errors
  const maticProvider = new HDWalletProvider(
    accountPrivateKey,
    polygonMumbaiApiUrl,
    0,
    1,
    false
  );

  const parentProvider = new HDWalletProvider(
    accountPrivateKey,
    ethereumHttpsApiUrl,
    0,
    1,
    false
  );

  const maticPOSClient = new MaticPOSClient({
    network: maticNetwork,
    version: maticVersion,
    parentProvider,
    maticProvider,
  });

  const from = maticProvider.getAddress();

  const { transactionHash: burnTransationHash } =
    await maticPOSClient.burnERC721(childTokenAddress, tokenId, {
      from,
      to: recipientAddress,
    });

  const parentWebsocketProvider = new Web3.providers.WebsocketProvider(
    ethereumWebsocktesApiUrl
  );

  const parentWebsocketWeb3 = new Web3(parentWebsocketProvider);

  const childWeb3 = new Web3(maticProvider);

  // All transactions that occur on Matic chain are check-pointed to the Ethereum chain in frequent intervals of time by the validators. This time is ~10 mins on Mumbai and ~30 mins on Matic mainnet.
  await eventTracking.checkInclusion({
    txHash: burnTransationHash,
    rootChainAddress: rootChainProxyAddress,
    childWeb3,
    parentWebsocketWeb3,
  });

  parentWebsocketProvider.disconnect(
    0,
    "burn proof event received, connection not needed"
  );

  await maticPOSClient.exitERC721(burnTransationHash, {
    from,
    to: recipientAddress,
  });
}
