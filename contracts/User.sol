pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;


/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract User {

    struct LoginUser {
        uint id; // weight is accumulated by delegation
        string name;  // if true, that person already voted
        string email; // if true, that person
        string password; // person delegated to
        string phoneNo; //
        string planType;
    }

    mapping (uint => LoginUser) public users;
    uint[] public userIdList;

    constructor() public {
    }
    
    function addUser(uint id,string memory name,string memory email,string memory password,string memory phoneNo,string memory planType) public returns(LoginUser memory){
        LoginUser memory user = LoginUser(id,name, email,password,phoneNo,planType);
        users[id] = user; 
        userIdList.push(id);
        return user;
    }

    function getUser(uint index) external view returns(LoginUser memory){
        return users[index];
    }

    function getUsers() public view returns (LoginUser[] memory) {
        LoginUser[] memory userArray = new LoginUser[](userIdList.length);
        for(uint i = 0; i < userIdList.length; i++) {
            userArray[i] = users[userIdList[i]];
        }
        return userArray;
    }

    function getLength() public view returns (uint){
        return userIdList.length;
    }
   
}