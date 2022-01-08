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
        string password; // person delegated to
    }

    LoginUser[] users;

     string private greeting;

    
 function addUser(string memory name,string memory password) external returns(bool){
        uint id = users.length;
        LoginUser memory user = LoginUser(id,name, password);
        users.push(user);
        return (true);
    }

    function getUsers() external returns(LoginUser[] memory){
        return users;
    }
   
}