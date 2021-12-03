pragma solidity ^0.8.5;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract ERC20 is
    OwnableUpgradeable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable
{
    constructor() initializer {}

    function initialize() public initializer {
        __ERC20_init("Token", "TKN");
        __ERC20Burnable_init();
        __Ownable_init();

        _mint(msg.sender, 1000000000 * 10**8);
    }
}
