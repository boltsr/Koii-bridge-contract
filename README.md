# Solidity contracts for cross-chain arweave nfts through bridges.

## KoiToken

KoiToken is an ERC-1155 contract which is tradable on the OpenSea marketplace for crypto collectibles.

This should be compatible with [KoiToken on Arweave network](https://viewblock.io/arweave/address/ljy4rdr6vKS6-jLgduBz_wlcad4GuKPEuhrRVaUd8tg).

Users can move the NFT from Arweave to Ethereum via bridge.

The image and the metadata of the NFT can be read using `atomic_id`.

E.g. with `atomic_id=7dhz-MuerPfOipph6ThrVeqb7Ecl0LOWBa9-Ie7dYxM`, you can get the image from `https://5xmhh6glt2wpptuktjq6sodlkxvjx3chexilhfqfv57cd3w5mmjq.arweave.net/7dhz-MuerPfOipph6ThrVeqb7Ecl0LOWBa9-Ie7dYxM` and metadata from `https://viewblock.io/arweave/address/7dhz-MuerPfOipph6ThrVeqb7Ecl0LOWBa9-Ie7dYxM?tab=state`

### Consideration

We can include the hash value of the NFT metadata in metadata to verify if the NFT is valid one which was moved from Arweave network to Ethereum network.

## Set Up

Run `yarn install`

## Compile 

`yarn run compile`

## Test

`yarn run test`
