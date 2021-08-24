import { MaticPOSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";
import BN from "bn.js";

interface TransferERC1155FromEthereumToMaticUsingPOSBridge {
  maticApiUrl: string;
  ethereumAccountPrivateKey: string;
  ethereumApiUrl: string;
  rootTokenAddress: string;
  recipientAddress: string;
  amounts: (string | BN)[];
  tokenIds: (string | BN)[];
  maticNetwork?: string;
  maticVersion?: string;
  gasPrice?: string;
  depositData?: string;
}

export async function transferERC1155FromEthereumToMaticUsingPOSBridge({
  maticApiUrl,
  ethereumAccountPrivateKey,
  ethereumApiUrl,
  rootTokenAddress,
  recipientAddress,
  amounts,
  tokenIds,
  maticNetwork = "testnet",
  maticVersion = "mumbai",
  gasPrice = "100000000000",
  depositData,
}: TransferERC1155FromEthereumToMaticUsingPOSBridge) {
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

  await maticPOSClient.approveERC1155ForDeposit(rootTokenAddress, {
    from,
  });

  if (tokenIds.length === 1 && amounts.length === 1) {
    await maticPOSClient.depositSingleERC1155ForUser(
      rootTokenAddress,
      recipientAddress,
      tokenIds[0],
      amounts[0],
      depositData,
      {
        from,
        gasPrice,
      }
    );
    return;
  }

  await maticPOSClient.depositBatchERC1155ForUser(
    rootTokenAddress,
    recipientAddress,
    tokenIds,
    amounts,
    depositData,
    {
      from,
      gasPrice,
    }
  );
}
