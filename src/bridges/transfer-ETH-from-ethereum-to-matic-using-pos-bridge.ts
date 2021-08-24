import { MaticPOSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";

interface TransferETHFromEthereumToMaticUsingPOSBridge {
  maticApiUrl: string;
  ethereumAccountPrivateKey: string;
  ethereumApiUrl: string;
  recipientAddress: string;
  amountInEther: string;
  maticNetwork?: string;
  maticVersion?: string;
  gasPrice?: string;
}

export async function transferETHFromEthereumToMaticUsingPOSBridge({
  maticApiUrl,
  ethereumAccountPrivateKey,
  ethereumApiUrl,
  recipientAddress,
  amountInEther,
  maticNetwork = "testnet",
  maticVersion = "mumbai",
  gasPrice = "100000000000",
}: TransferETHFromEthereumToMaticUsingPOSBridge) {
  const parentProvider = new HDWalletProvider(
    ethereumAccountPrivateKey,
    ethereumApiUrl
  );

  const maticPOSClient = new MaticPOSClient({
    network: maticNetwork,
    version: maticVersion,
    parentProvider,
    maticProvider: maticApiUrl,
  });

  const from = parentProvider.getAddress();

  const amount = Web3.utils.toWei(amountInEther, "ether");

  await maticPOSClient.depositEtherForUser(recipientAddress, amount, {
    from,
    gasPrice,
  });
}
