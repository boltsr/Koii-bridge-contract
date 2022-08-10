// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./multi-token-standard/interfaces/IERC1155.sol";
import "./KoiToken.sol";


/**
 * @notice KoiRouter contract
 */
contract KoiRouter {
    // Events
    event Deposit(address user, address token, uint256 id, uint256 amount, string arAddress);

    // Storage
    address public koiToken;
    address public vault;
    address payable public owner;
    uint public bridgeFee; 

    constructor(address _koiToken, address _vault, uint _bridgeFee) {
        koiToken = _koiToken;
        vault = _vault;
        owner = payable(msg.sender);
        bridgeFee = _bridgeFee;
    }

    modifier onlyOwner () {
       require(msg.sender == owner, "This can only be called by the contract owner!");
       _;
     }


    function deposit(
        address token,
        uint256 id,
        uint256 amount,
        string calldata arAddress
    )  external payable {
        
            // Check bridge Fee
            require(msg.value >= bridgeFee, "Ether sent is less than the bridge fees");
            IERC1155(token).safeTransferFrom(
                msg.sender,
                vault,
                id,
                amount,
                "0x"
            );
        

        emit Deposit(msg.sender, token, id, amount,arAddress);
    }

    function withdraw() public onlyOwner{
      owner.transfer(address(this).balance);
    }

    function setBridgeFee(uint _bridgeFee) public onlyOwner {
        bridgeFee = _bridgeFee;
    }
}
