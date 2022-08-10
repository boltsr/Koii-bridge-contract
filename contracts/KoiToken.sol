// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./opensea/ERC1155Tradable.sol";

/**
 * @title KoiToken contract
 * @dev ERC1155 + tradable on opensea
 */
contract KoiToken is ERC1155Tradable {
    constructor(
        string memory _name,
        string memory _symbol,
        address _proxyRegistryAddress
    ) ERC1155Tradable(_name, _symbol, _proxyRegistryAddress) {
        name = _name;
        symbol = _symbol;
        proxyRegistryAddress = _proxyRegistryAddress;
    }
    function contractURI() public pure returns (string memory) {
        return "https://devbundler.openkoi.com:8885/getEthereumContractMetadata";
    }
}
