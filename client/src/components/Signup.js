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

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitalId:"",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      planType:"",
      shouldAlertDisplay: false,
      shouldErrorMessageDisplay: false,
      signupErrorMessage:"",
      account: this.props.account,
      userContract: this.props.userContract

    };
  }

  handleHospitalIdChange = (e) => {
    this.setState({ hospitalId: e.target.value });
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

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handlePlanTypeChange = (e)=>{
    this.setState({ planType: e.target.value });
  }

  handleSubmit = async () => {
    const { hospitalId,username, email, phoneNumber, password ,planType, account , userContract} = this.state;
    const {
      history: { push },
    } = this.props;
    if (
      hospitalId === "" ||
      username === "" ||
      email === "" ||
      phoneNumber === "" ||
      password === "" ||
      planType === ""
    ) {
      this.setState({ shouldAlertDisplay: true });
      return;
    }

    let hospitalIdInt = parseInt(hospitalId);

    
    await userContract.methods.addUser(hospitalIdInt,username,email,password,phoneNumber,planType).send({from:account});
    
    // const getUserList = await userContract.methods.getUsers().call();
    // console.log('UserList', getUserList)
    push('/login');


    // const reqJson={
    //  username:username,
    //  password:password,
    //   email:email,
    //    phone:phoneNumber
    // }
    // axios.post(eventBaseUrl,reqJson).then((res) => {
    //   if(res.data.isRegistered)
    //   {
    //     push('/');
    //   }
    //   if(!res.data.isRegistered){
    //    this.setState({
    //     signupErrorMessage:res.data.error,
    //     shouldErrorMessageDisplay:true
    //    }) 
    //   }
    // });
  };

  render() {
    const {hospitalId, username, email, phoneNumber, password, planType,shouldAlertDisplay,shouldErrorMessageDisplay,signupErrorMessage } =
      this.state;
      
    return (
      <div className="flex flex-col space-y-5 max-w-md mx-auto my-16 min-w-500">
        <h2 className="text-4xl font-semibold text-blue-500">Signup</h2>
        <TextField
          required
          id="outlined-hospital"
          value={hospitalId}
          label="Hospital Id"
          autoComplete="off"
          onChange={(e) => this.handleHospitalIdChange(e)}
        />
         <TextField
          required
          id="outlined-username"
          value={username}
          label="User Name"
          autoComplete="off"
          onChange={(e) => this.handleUsernameChange(e)}
        />
        <TextField
          required
          id="outlined-email"
          value={email}
          label="Email Id"
          onChange={(e) => this.handleEmailChange(e)}
        />
        <TextField
          value={password}
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => this.handlePasswordChange(e)}
        />
        <TextField
          required
          id="outlined-phone"
          value={phoneNumber}
          label="Phone Number"
          onChange={(e) => this.handlePhoneNumberChange(e)}
        />

       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Plan Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={planType}
          label="Plan Type"
          onChange={(e) => this.handlePlanTypeChange(e)}
        >
          <MenuItem value='Basic'>Basic</MenuItem>
          <MenuItem value='Premium'>Premium</MenuItem>
        </Select>
      </FormControl>



        
        <div className="flex items-center justify-between">
          <Button variant="contained" style={{backgroundColor:'#2b82f6'}} onClick={this.handleSubmit}>
            Submit
          </Button>
          <div className="flex">
            <p className="text-lg">Existing User?</p>
            <Link to="/login" className="text-blue-500 font-semibold text-lg px-1">
              Login
            </Link>
          </div>
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

export default withRouter(Signup);
