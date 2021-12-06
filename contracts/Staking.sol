// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract SimpleStaking is
    Initializable,
    OwnableUpgradeable,
    PausableUpgradeable
{
    //implement your code here to use SafeERC20Upgradeable and AddressUpgradeable
    IERC20Upgradeable private rwToken;

    address public rwTokenAddr; //reward token address
    uint256 public rewardInterval;

    uint256 private _totalSupply;

    struct Record {
        uint256 stakedAmount;
        uint256 stakedAt;
        uint256 unstakedAmount;
        uint256 unstakedAt;
        uint256 rewardAmount;
    }

    //implement your code here for "records", a mapping of token addresses and user addresses to an user Record struct
    mapping(address => mapping(address => Record)) private records;

    //implement your code here for "rewardRates", a mapping of token address to reward rates. e.g. if APY is 20%, then rewardRate is 20.
    mapping(address => uint256) public rewardRates;

    event Stake(address indexed user, uint256 amount, uint256 stakedAt);
    event Unstake(
        address indexed user,
        uint256 amount,
        address indexed tokenAddr,
        uint256 reward,
        uint256 unstakedAt
    );
    event WithdrawUnstaked(
        address indexed user,
        uint256 amount,
        uint256 withdrawAt
    );
    event WithdrawRewards(
        address indexed user,
        uint256 amount,
        uint256 withdrawAt
    );
    event SetRewardRate(address indexed tokenAddr, uint256 newRewardRate);

    function initialize(address _rwTokenAddr) external initializer {
        //implement your code here
        rwTokenAddr = _rwTokenAddr;
        rwToken = IERC20Upgradeable(_rwTokenAddr);
    }

    // for users to stake tokens
    function stake(address tokenAddr, uint256 amount) external whenNotPaused {
        //implement your code here
        _totalSupply += amount;
        records[tokenAddr][msg.sender].stakedAmount += amount;
        records[tokenAddr][msg.sender].stakedAt = block.timestamp;

        rwToken.transferFrom(msg.sender, address(this), amount);
    }

    //for users to unstake their staked tokens
    function unstake(address tokenAddr, uint256 amount) external whenNotPaused {
        //implement your code here
        _totalSupply -= amount;
        records[tokenAddr][msg.sender].stakedAmount -= amount;
        records[tokenAddr][msg.sender].unstakedAt = block.timestamp;
        records[tokenAddr][msg.sender].unstakedAmount += amount;
    }

    //for users to withdraw their unstaked tokens from this contract to the caller's address
    function withdrawUnstaked(uint256 _amount) external whenNotPaused {
        //implement your code here
        rwToken.transfer(msg.sender, _amount);
    }

    //for users to withdraw reward tokens from this contract to the caller's address
    function withdrawReward(address tokenAddr, uint256 _amount)
        external
        whenNotPaused
    {
        //implement your code here
    }

    //to calculate rewards based on the duration of staked tokens, staked token amount, reward rate of the staked token, reward interval
    function calculateReward(
        address tokenAddr,
        address user,
        uint256 _amount
    ) public view returns (uint256) {
        //implement your code here
    }

    //only for this contract owner to set the reward rate of a staked token
    function setRewardRate(address tokenAddr, uint256 rewardRate)
        external
        onlyOwner
    {
        //implement your code here
    }

    //only for this contract owner to pause this contract
    function pause() external onlyOwner whenNotPaused {
        //implement your code here
    }

    //only for this contract owner to unpause this contract
    function unpause() external onlyOwner whenPaused {
        //implement your code here
    }
}
