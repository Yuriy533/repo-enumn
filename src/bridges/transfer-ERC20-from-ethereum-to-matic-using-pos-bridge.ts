import { MaticPOSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";

interface TransferERC20FromEthereumToMaticUsingPOSBridge {
  maticApiUrl: string;
  ethereumAccountPrivateKey: string;
  ethereumApiUrl: string;
  rootTokenAddress: string;
  recepientAddress: string;
  amountTokenInEther: string;
  maticNetwork: string;
  maticVersion: string;
  gasPrice?: string;
}

export async function transferERC20FromEthereumToMaticUsingPOSBridge({
  maticApiUrl,
  ethereumAccountPrivateKey,
  ethereumApiUrl,
  rootTokenAddress,
  recepientAddress,
  amountTokenInEther,
  maticNetwork,
  maticVersion,
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
    recepientAddress,
    amount,
    {
      from,
      gasPrice,
    }
  );
}

// transferERC20FromEthereumToMaticUsingPOSBridge({
//   maticApiUrl: config.maticApiUrl,
//   ethereumAccountPrivateKey: config.privateKey,
//   ethereumApiUrl: config.privateKey,
//   rootTokenAddress: config.rootTokenAddress,
//   recepientAddress: "0xc54177b51ce9fca2827202054fd8541792b03f74",
//   amountTokenInEther: "0.01",
// });
