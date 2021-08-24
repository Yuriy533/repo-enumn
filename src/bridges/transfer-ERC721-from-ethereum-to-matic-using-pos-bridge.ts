import { MaticPOSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";

interface TransferERC721FromEthereumToMaticUsingPOSBridge {
  maticApiUrl: string;
  ethereumAccountPrivateKey: string;
  ethereumApiUrl: string;
  rootTokenAddress: string;
  recipientAddress: string;
  tokenId: string;
  maticNetwork?: string;
  maticVersion?: string;
  gasPrice?: string;
}

export async function transferERC721FromEthereumToMaticUsingPOSBridge({
  maticApiUrl,
  ethereumAccountPrivateKey,
  ethereumApiUrl,
  rootTokenAddress,
  recipientAddress,
  tokenId,
  maticNetwork = "testnet",
  maticVersion = "mumbai",
  gasPrice = "100000000000",
}: TransferERC721FromEthereumToMaticUsingPOSBridge) {
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

  await maticPOSClient.approveERC721ForDeposit(rootTokenAddress, tokenId, {
    from,
  });

  await maticPOSClient.depositERC721ForUser(
    rootTokenAddress,
    recipientAddress,
    tokenId,
    {
      from,
      gasPrice,
    }
  );
}
