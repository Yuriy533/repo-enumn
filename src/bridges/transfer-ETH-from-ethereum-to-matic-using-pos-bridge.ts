import { MaticPOSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";

interface TransferETHFromEthereumToMaticUsingPOSBridge {
  maticApiUrl: string;
  ethereumAccountPrivateKey: string;
  ethereumApiUrl: string;
  recipientAddress: string;
  amountWei: string;
  maticNetwork?: string;
  maticVersion?: string;
  gasPrice?: string;
}

/**
 * The {@link TransferETHFromEthereumToMaticUsingPOSBridge | TransferETHFromEthereumToMaticUsingPOSBridge interface}
 * The [[TransferETHFromEthereumToMaticUsingPOSBridge | TransferETHFromEthereumToMaticUsingPOSBridge interface]]
 * @param ethereumApiUrl  Comment for parameter ethereumApiUrl.
 */
export async function transferETHFromEthereumToMaticUsingPOSBridge(
  transfer: TransferETHFromEthereumToMaticUsingPOSBridge
) {
  const {
    maticApiUrl,
    ethereumAccountPrivateKey,
    ethereumApiUrl,
    recipientAddress,
    amountWei,
    maticNetwork = "testnet",
    maticVersion = "mumbai",
    gasPrice = "100000000000",
  } = transfer;

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
