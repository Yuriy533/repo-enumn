import { MaticPOSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";

interface TransferERC20FromEthereumToMaticUsingPOSBridge {
  maticApiUrl: string;
  ethereumAccountPrivateKey: string;
  ethereumApiUrl: string;
  rootTokenAddress: string;
  recipientAddress: string;
  amountTokenInEther: string;
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
  amountTokenInEther,
  maticNetwork = "testnet",
  maticVersion = "mumbai",
  gasPrice = "100000000000",
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

  const amount = Web3.utils.toWei(amountTokenInEther, "ether");

  await maticPOSClient.approveERC20ForDeposit(rootTokenAddress, amount, {
    from,
  });

  await maticPOSClient.depositERC20ForUser(
    rootTokenAddress,
    recipientAddress,
    amount,
    {
      from,
      gasPrice,
    }
  );
}
