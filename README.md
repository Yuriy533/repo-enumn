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

| Property                    | Required | Default value | Description                                                  |
| :-------------------------- | :------: | :-----------: | :----------------------------------------------------------- |
| `maticApiUrl`               |    ✅    |       -       | Matic url to the node api                                    |
| `ethereumAccountPrivateKey` |    ✅    |       -       | Ethereaum private key to the account from where you send ETH |
| `ethereumApiUrl`            |    ✅    |       -       | Ethereum url to the node api                                 |
| `recipientAddress`          |    ✅    |       -       | Address of the recipient                                     |
| `amountWei`                 |    ✅    |       -       | Amount to send in wei                                        |
| `maticNetwork`              |   :x:    |    testnet    | Network of matic. Set to `mainnet` for mainnet transfer      |
| `maticVersion`              |   :x:    |    mumbai     | Cersion of matic. Set to `v1` for mainnet transfer           |
| `gasPrice`                  |   :x:    | 100000000000  | Gas price of the transfer                                    |

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

| Property                    | Required | Default value | Description                                                  |
| :-------------------------- | :------: | :-----------: | :----------------------------------------------------------- |
| `maticApiUrl`               |    ✅    |       -       | Matic url to the node api                                    |
| `ethereumAccountPrivateKey` |    ✅    |       -       | Ethereaum private key to the account from where you send ETH |
| `ethereumApiUrl`            |    ✅    |       -       | Ethereum url to the node api                                 |
| `recipientAddress`          |    ✅    |       -       | Address of the recipient                                     |
| `amountWei`                 |    ✅    |       -       | Amount to send in wei                                        |
| `rootTokenAddress`          |    ✅    |       -       | Token address on ethereum chain                              |
| `maticNetwork`              |   :x:    |    testnet    | Network of matic. Set to `mainnet` for mainnet transfer      |
| `maticVersion`              |   :x:    |    mumbai     | Cersion of matic. Set to `v1` for mainnet transfer           |
| `gasPrice`                  |   :x:    | 100000000000  | Gas price of the transfer                                    |

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

## [Full docs](https://github.com/KedziaPawel/matic-bridge/blob/main/docs/README.md)

## License

MIT
