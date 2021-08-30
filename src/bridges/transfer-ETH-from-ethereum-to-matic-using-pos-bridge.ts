import { MaticPOSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";
import {
  DEFAULT_GAS_PRICE,
  DEFAULT_MATIC_VERSION,
  DEFAULT_MATIC_NETWORK,
} from "../consts";

export interface TransferETHFromEthereumToMaticUsingPOSBridge {
  maticApiUrl: string;
  ethereumAccountPrivateKey: string;
  ethereumApiUrl: string;
  recipientAddress: string;
  amountWei: string;
  maticNetwork?: string;
  maticVersion?: string;
  gasPrice?: string;
}

export async function transferETHFromEthereumToMaticUsingPOSBridge({
  maticApiUrl,
  ethereumAccountPrivateKey,
  ethereumApiUrl,
  recipientAddress,
  amountWei,
  maticNetwork = DEFAULT_MATIC_NETWORK,
  maticVersion = DEFAULT_MATIC_VERSION,
  gasPrice = DEFAULT_GAS_PRICE,
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

  await maticPOSClient.depositEtherForUser(recipientAddress, amountWei, {
    from,
    gasPrice,
  });
}
