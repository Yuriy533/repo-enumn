## Matic POS bridges

This library helps you in easy way for transfering ethereum, ERC20, ERC721 and ERC1155 tokens from matic chain to ethereum chain and from matic chain to ethereum chain.
It uses the [Matic SDK](https://docs.matic.network/docs/develop/ethereum-matic/pos/using-sdk/getting-started) under the hood.

## Supported networks

- Matic Testnet (Mumbai) - Ethereum Testnet (Goerli)
- Matic Mainnet - Ethereum Mainnet

## Supported protocols

- ETH
- ERC20
- ERC721
- ERC1155

## Prerequisites

- Node.js v.10 or greater is required
- npm or yarn

## How To Install

```sh
 yarn add @ethereumnetwork/matic-bridge
```

or

```sh
 npm install @ethereumnetwork/matic-bridge
```

## How To use

# transferETHFromEthereumToMaticUsingPOSBridge

| Property                    | Required | Default value | Description                                                  |
| :-------------------------- | :------- | :------------ | :----------------------------------------------------------- |
| `maticApiUrl`               | ✅       | -             | The matic url to the api                                     |
| `ethereumAccountPrivateKey` | ✅       | -             | Ethereaum private key to the account from where you send ETH |
| `gasPrice`                  | :x:      | 100000000000  | Gas price of the transfer                                    |

```typescript
import { transferETHFromEthereumToMaticUsingPOSBridge } from "@ethereumnetwork/matic-bridge";
```

## [Full docs](https://github.com/KedziaPawel/matic-bridge/blob/main/docs/README.md)

## License

MIT
