# Matic POS bridges

This library helps you in easy way for transfering ethereum, ERC20, ERC721 and ERC1155 tokens from matic chain to ethereum chain and from matic chain to ethereum chain.
It uses the [Matic SDK](https://docs.matic.network/docs/develop/ethereum-matic/pos/using-sdk/getting-started) under the hood.

# Supported networks

- Matic Testnet (Mumbai) - Ethereum Testnet (Goerli)
- Matic Mainnet - Ethereum Mainnet

# Supported protocols

- ETH
- ERC20
- ERC721
- ERC1155

# Prerequisites

- Node.js v.10 or greater is required
- npm or yarn

# How To Install

```sh
 yarn add @ethereumnetwork/matic-bridge
```

or

```sh
 npm install @ethereumnetwork/matic-bridge
```

# Supported methods

## transferETHFromEthereumToMaticUsingPOSBridge

| Property                    | Required | Default value  | Description                                                  |
| :-------------------------- | :------: | :------------: | :----------------------------------------------------------- |
| `maticApiUrl`               |    ✅    |       -        | Matic url to the node api                                    |
| `ethereumAccountPrivateKey` |    ✅    |       -        | Ethereaum private key to the account from where you send ETH |
| `ethereumApiUrl`            |    ✅    |       -        | Ethereum url to the node api                                 |
| `recipientAddress`          |    ✅    |       -        | Address of the recipient                                     |
| `amountWei`                 |    ✅    |       -        | Amount to send in wei                                        |
| `maticNetwork`              |   :x:    |   `testnet`    | Network of matic. Set to `mainnet` for mainnet transfer      |
| `maticVersion`              |   :x:    |    `mumbai`    | Version of matic. Set to `v1` for mainnet transfer           |
| `gasPrice`                  |   :x:    | `100000000000` | Gas price of the transfer                                    |

### example usage

```typescript
import { transferETHFromEthereumToMaticUsingPOSBridge } from "@ethereumnetwork/matic-bridge";

...

await transferETHFromEthereumToMaticUsingPOSBridge({
    maticApiUrl: 'https://polygon-mumbai.g.alchemy.com/v2/<your-api-key>',
    maticApiUrl: 'https://eth-goerli.g.alchemy.com/v2/<your-api-key>',
    ethereumAccountPrivateKey: '<private-key-to-ethereum-account-of-sender>',
    amountWei: 1000000000,
    recipientAddress: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'
})
```

## transferERC20FromEthereumToMaticUsingPOSBridge

| Property                    | Required | Default value  | Description                                                  |
| :-------------------------- | :------: | :------------: | :----------------------------------------------------------- |
| `maticApiUrl`               |    ✅    |       -        | Matic url to the node api                                    |
| `ethereumAccountPrivateKey` |    ✅    |       -        | Ethereaum private key to the account from where you send ETH |
| `ethereumApiUrl`            |    ✅    |       -        | Ethereum url to the node api                                 |
| `recipientAddress`          |    ✅    |       -        | Address of the recipient                                     |
| `amountWei`                 |    ✅    |       -        | Amount to send in wei                                        |
| `rootTokenAddress`          |    ✅    |       -        | Token address on ethereum chain                              |
| `maticNetwork`              |   :x:    |   `testnet`    | Network of matic. Set to `mainnet` for mainnet transfer      |
| `maticVersion`              |   :x:    |    `mumbai`    | Version of matic. Set to `v1` for mainnet transfer           |
| `gasPrice`                  |   :x:    | `100000000000` | Gas price of the transfer                                    |

### example usage

```typescript
import { transferERC20FromEthereumToMaticUsingPOSBridge } from "@ethereumnetwork/matic-bridge";

...

await transferERC20FromEthereumToMaticUsingPOSBridge({
    maticApiUrl: 'https://polygon-mumbai.g.alchemy.com/v2/<your-api-key>',
    maticApiUrl: 'https://eth-goerli.g.alchemy.com/v2/<your-api-key>',
    ethereumAccountPrivateKey: '<private-key-to-ethereum-account-of-sender>',
    amountWei: 1000000000,
    rootTokenAddress: '0x655F2166b0709cd575202630952D71E2bB0d61Af', // DummyERC20Token
    recipientAddress: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'
})
```

## transferERC20FromMaticToEthereumUsingPOSBridge

Note: it can take up to 10 minutes on the testnet and up to 30 minutes on the mainnet. Please don't shut the program during this time as it waits and listens for the proof of burn to occur on the ethereum.

| Property                   | Required |                Default value                 | Description                                                                                                          |
| :------------------------- | :------: | :------------------------------------------: | :------------------------------------------------------------------------------------------------------------------- |
| `maticApiUrl`              |    ✅    |                      -                       | Matic url to the node api                                                                                            |
| `accountPrivateKey`        |    ✅    |                      -                       | Account private key to the account from where you send ERC20                                                         |
| `ethereumHttpsApiUrl`      |    ✅    |                      -                       | Ethereum https url to the node api                                                                                   |
| `ethereumWebsocktesApiUrl` |    ✅    |                      -                       | Ethereum websockets url to the node api                                                                              |
| `recipientAddress`         |    ✅    |                      -                       | Address of the recipient                                                                                             |
| `amountWei`                |    ✅    |                      -                       | Amount to send in wei                                                                                                |
| `childTokenAddress`        |    ✅    |                      -                       | Token address on the matic chain                                                                                     |
| `rootChainProxyAddress`    |   :x:    | `0x2890ba17efe978480615e330ecb65333b880928e` | Address of the chain proxy on the ethereum. Set to `0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287` for mainnet transfer |
| `maticNetwork`             |   :x:    |                  `testnet`                   | Network of matic. Set to `mainnet` for mainnet transfer                                                              |
| `maticVersion`             |   :x:    |                   `mumbai`                   | Version of matic. Set to `v1` for `mainnet` transfer                                                                 |
| `gasPrice`                 |   :x:    |                `100000000000`                | Gas price of the transfer                                                                                            |

### example usage

```typescript
import { transferERC20FromMaticToEthereumUsingPOSBridge } from "@ethereumnetwork/matic-bridge";

...

await transferERC20FromMaticToEthereumUsingPOSBridge({
    maticApiUrl: 'https://polygon-mumbai.g.alchemy.com/v2/<your-api-key>',
    ethereumHttpsApiUrl: 'https://eth-goerli.g.alchemy.com/v2/<your-api-key>',
    ethereumWebsocktesApiUrl: 'wss://eth-goerli.g.alchemy.com/v2/<your-api-key>',
    accountPrivateKey: '<private-key-to-matic-account-of-sender>',
    amountWei: 1000000000,
    childTokenAddress: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1', // DummyERC20Token
    recipientAddress: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'
})
```

## transferERC721FromEthereumToMaticUsingPOSBridge

| Property                    | Required | Default value  | Description                                                  |
| :-------------------------- | :------: | :------------: | :----------------------------------------------------------- |
| `maticApiUrl`               |    ✅    |       -        | Matic url to the node api                                    |
| `ethereumAccountPrivateKey` |    ✅    |       -        | Ethereaum private key to the account from where you send ETH |
| `ethereumApiUrl`            |    ✅    |       -        | Ethereum url to the node api                                 |
| `recipientAddress`          |    ✅    |       -        | Address of the recipient                                     |
| `tokenId`                   |    ✅    |       -        | Token id                                                     |
| `rootTokenAddress`          |    ✅    |       -        | Token address on ethereum chain                              |
| `maticNetwork`              |   :x:    |   `testnet`    | Network of matic. Set to `mainnet` for mainnet transfer      |
| `maticVersion`              |   :x:    |    `mumbai`    | Version of matic. Set to `v1` for mainnet transfer           |
| `gasPrice`                  |   :x:    | `100000000000` | Gas price of the transfer                                    |

### example usage

```typescript
import { transferERC721FromEthereumToMaticUsingPOSBridge } from "@ethereumnetwork/matic-bridge";

...

await transferERC721FromEthereumToMaticUsingPOSBridge({
    maticApiUrl: 'https://polygon-mumbai.g.alchemy.com/v2/<your-api-key>',
    maticApiUrl: 'https://eth-goerli.g.alchemy.com/v2/<your-api-key>',
    ethereumAccountPrivateKey: '<private-key-to-ethereum-account-of-sender>',
    tokenId: 5,
    rootTokenAddress: '0x084297B12F204Adb74c689be08302FA3f12dB8A7', // DummyERC721Token
    recipientAddress: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'
})
```

## transferERC721FromMaticToEthereumUsingPOSBridge

Note: it can take up to 10 minutes on the testnet and up to 30 minutes on the mainnet. Please don't shut the program during this time as it waits and listens for the proof of burn to occur on the ethereum.

| Property                   | Required |                Default value                 | Description                                                                                                          |
| :------------------------- | :------: | :------------------------------------------: | :------------------------------------------------------------------------------------------------------------------- |
| `maticApiUrl`              |    ✅    |                      -                       | Matic url to the node api                                                                                            |
| `accountPrivateKey`        |    ✅    |                      -                       | Account private key to the account from where you send ERC20                                                         |
| `ethereumHttpsApiUrl`      |    ✅    |                      -                       | Ethereum https url to the node api                                                                                   |
| `ethereumWebsocktesApiUrl` |    ✅    |                      -                       | Ethereum websockets url to the node api                                                                              |
| `recipientAddress`         |    ✅    |                      -                       | Address of the recipient                                                                                             |
| `tokenId`                  |    ✅    |                      -                       | Token id                                                                                                             |
| `childTokenAddress`        |    ✅    |                      -                       | Token address on the matic chain                                                                                     |
| `rootChainProxyAddress`    |   :x:    | `0x2890ba17efe978480615e330ecb65333b880928e` | Address of the chain proxy on the ethereum. Set to `0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287` for mainnet transfer |
| `maticNetwork`             |   :x:    |                  `testnet`                   | Network of matic. Set to `mainnet` for mainnet transfer                                                              |
| `maticVersion`             |   :x:    |                   `mumbai`                   | Version of matic. Set to `v1` for `mainnet` transfer                                                                 |
| `gasPrice`                 |   :x:    |                `100000000000`                | Gas price of the transfer                                                                                            |

### example usage

```typescript
import { transferERC721FromMaticToEthereumUsingPOSBridge } from "@ethereumnetwork/matic-bridge";

...

await transferERC721FromMaticToEthereumUsingPOSBridge({
    maticApiUrl: 'https://polygon-mumbai.g.alchemy.com/v2/<your-api-key>',
    ethereumHttpsApiUrl: 'https://eth-goerli.g.alchemy.com/v2/<your-api-key>',
    ethereumWebsocktesApiUrl: 'wss://eth-goerli.g.alchemy.com/v2/<your-api-key>',
    accountPrivateKey: '<private-key-to-matic-account-of-sender>',
    tokendId: 5,
    childTokenAddress: '0x757b1BD7C12B81b52650463e7753d7f5D0565C0e', // DummyERC20Token
    recipientAddress: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'
})
```

## [Full docs](https://github.com/KedziaPawel/matic-bridge/blob/main/docs/README.md)

## License

MIT
