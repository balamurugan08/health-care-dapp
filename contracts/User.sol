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

    struct NewPatientDetail{
        uint id; // weight is accumulated by delegation
        string name; 
        string age; // if true, that person already voted
        string email;
        string patientAddress;
        string phoneNo; 
        string gender;
        
    }

      struct NewDoctorDetail{
        uint id; // weight is accumulated by delegation
        string name; 
        string age; // if true, that person already voted
        string email;
        string doctorAddress;
        string phoneNo; 
        string gender;
        
    }

    mapping (uint => LoginUser) public users;
    mapping (uint => NewPatientDetail) public newPatientDetails;
    mapping (uint => NewDoctorDetail) public newDoctorDetails;
    uint[] public userIdList;
    uint[] public PatientIdList;
    uint[] public DoctorIdList;

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

     function addNewPatientDetail(uint id,string memory name,string memory age,string memory email,string memory patientAddress,string memory phoneNo,string memory gender) public returns(NewPatientDetail memory){
        NewPatientDetail memory newPatientDetail = NewPatientDetail(id,name,age, email,patientAddress,phoneNo,gender);
        newPatientDetails[id] = newPatientDetail; 
        PatientIdList.push(id);
        return newPatientDetail;
    }


    function getPatientList() public view returns (NewPatientDetail[] memory) {
        NewPatientDetail[] memory userArray = new NewPatientDetail[](PatientIdList.length);
        for(uint i = 0; i < PatientIdList.length; i++) {
            userArray[i] = newPatientDetails[PatientIdList[i]];
        }
        return userArray;
    }

    function addNewDoctorDetail(uint id,string memory name,string memory age,string memory email,string memory doctorAddress,string memory phoneNo,string memory gender) public returns(NewDoctorDetail memory){
        NewDoctorDetail memory newDoctorDetail = NewDoctorDetail(id,name,age, email,doctorAddress,phoneNo,gender);
        newDoctorDetails[id] = newDoctorDetail; 
        DoctorIdList.push(id);
        return newDoctorDetail;
    }


    function getDoctorList() public view returns (NewDoctorDetail[] memory) {
        NewDoctorDetail[] memory userArray = new NewDoctorDetail[](DoctorIdList.length);
        for(uint i = 0; i < DoctorIdList.length; i++) {
            userArray[i] = newDoctorDetails[DoctorIdList[i]];
        }
        return userArray;
    }
   
   
}