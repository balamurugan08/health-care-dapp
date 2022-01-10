import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import Alert from "@mui/material/Alert";
import { withRouter } from "react-router";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";

const eventBaseUrl = "http://localhost:8080/user/register";

class AddDoctorDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DoctorId:"",
      age:"",
      address:"",
      username: "",
      email: "",
      phoneNumber: "",
      gender:"",
      shouldAlertDisplay: false,
      shouldErrorMessageDisplay: false,
      signupErrorMessage:"",
      account: this.props.account,
      userContract: this.props.userContract

    };
  }

  handleDoctorIdChange = (e) => {
    this.setState({ DoctorId: e.target.value });
  };

  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  };


  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value });
  };

  handleAgeChange = (e) => {
    this.setState({ age: e.target.value });
  };

  handlegenderChange = (e)=>{
    this.setState({ gender: e.target.value });
  }

  handleSubmit = async () => {
    const { DoctorId,username,age,address, email, phoneNumber,gender, account , userContract} = this.state;
    const {
      history: { push },
    } = this.props;
    if (
      DoctorId === "" ||
      username === "" ||
      email === "" ||
      phoneNumber === "" ||
      address === "" ||
      gender === "" ||
      age === ""
    ) {
      this.setState({ shouldAlertDisplay: true });
      return;
    }

    let DoctorIdInt = parseInt(DoctorId);

    
    await userContract.methods.addNewDoctorDetail(DoctorIdInt,username,age,email,address,phoneNumber,gender).send({from:account});
 
    push('/home');

  };

  render() {
    const {DoctorId, username,age,address, email, phoneNumber, gender,shouldAlertDisplay,shouldErrorMessageDisplay,signupErrorMessage } =
      this.state;
      
    return (
      <div className="flex flex-col space-y-5 max-w-md mx-auto my-16 min-w-500">
        <h2 className="text-4xl font-semibold text-blue-500">New Doctor Details</h2>
        <TextField
          required
          id="outlined-hospital"
          value={DoctorId}
          label="Doctor Id"
          autoComplete="off"
          onChange={(e) => this.handleDoctorIdChange(e)}
        />
         <TextField
          required
          id="outlined-username"
          value={username}
          label="Doctor Name"
          autoComplete="off"
          onChange={(e) => this.handleUsernameChange(e)}
        />
         <TextField
          required
          id="outlined-username"
          value={age}
          label="Doctor Age"
          autoComplete="off"
          onChange={(e) => this.handleAgeChange(e)}
        />
         <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Plan Type"
          onChange={(e) => this.handlegenderChange(e)}
        >
          <MenuItem value='Male'>Male</MenuItem>
          <MenuItem value='Female'>Female</MenuItem>
        </Select>
      </FormControl>
       
        <TextField
          required
          id="outlined-email"
          value={email}
          label="Email Id"
          onChange={(e) => this.handleEmailChange(e)}
        />
        
        <TextField
          required
          id="outlined-phone"
          value={phoneNumber}
          label="Phone Number"
          onChange={(e) => this.handlePhoneNumberChange(e)}
        />
        <TextField
          required
          id="outlined-hospital"
          value={address}
          label="Doctor Address"
          autoComplete="off"
          onChange={(e) => this.handleAddressChange(e)}
        />
        
      



        
        <div className="flex items-center justify-between">
          <Button variant="contained" style={{backgroundColor:'#2b82f6'}} onClick={this.handleSubmit}>
            Submit
          </Button>
         
        </div>
        {shouldAlertDisplay &&
          <Alert severity="error">Field cannot be empty</Alert>
        }
         {shouldErrorMessageDisplay &&
          <Alert severity="error"> {signupErrorMessage} </Alert>
        }
        
      </div>
    );
  }
}

export default withRouter(AddDoctorDetail);
