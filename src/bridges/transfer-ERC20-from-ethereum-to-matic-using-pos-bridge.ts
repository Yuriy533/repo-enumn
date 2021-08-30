import { MaticPOSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";
import {
  DEFAULT_GAS_PRICE,
  DEFAULT_MATIC_VERSION,
  DEFAULT_MATIC_NETWORK,
} from "../consts";

export interface TransferERC20FromEthereumToMaticUsingPOSBridge {
  maticApiUrl: string;
  ethereumAccountPrivateKey: string;
  ethereumApiUrl: string;
  rootTokenAddress: string;
  recipientAddress: string;
  amountTokenWei: string;
  maticNetwork?: string;
  maticVersion?: string;
  gasPrice?: string;
}

export async function transferERC20FromEthereumToMaticUsingPOSBridge({
  maticApiUrl,
  ethereumAccountPrivateKey,
  ethereumApiUrl,
  rootTokenAddress,
  recipientAddress,
  amountTokenWei,
  maticNetwork = DEFAULT_MATIC_NETWORK,
  maticVersion = DEFAULT_MATIC_VERSION,
  gasPrice = DEFAULT_GAS_PRICE,
}: TransferERC20FromEthereumToMaticUsingPOSBridge) {
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

  await maticPOSClient.approveERC20ForDeposit(
    rootTokenAddress,
    amountTokenWei,
    {
      from,
    }
  );

  await maticPOSClient.depositERC20ForUser(
    rootTokenAddress,
    recipientAddress,
    amountTokenWei,
    {
      from,
      gasPrice,
    }
  );
}
