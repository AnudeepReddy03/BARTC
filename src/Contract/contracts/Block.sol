    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.4;

    // Uncomment this line to use console.log
    import "hardhat/console.sol";
    contract Block{
        // address payable work = payable(0x3b83abF1D3e13c9Fb8223BA0a4B5c37CCe6b537b);
        address payable work;

        constructor(address payable _work) {
            work = _work;
        }
        function pay() public payable {
            require(msg.value == 0.001 ether);
            work.transfer(0.001 ether);
        }
        
    }