import React from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import TextField from "@mui/material/TextField";
import { Input } from "@material-ui/core";
import DoctorDetailTable from "./DoctorDetailTable";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddDoctorDetail from "./AddDoctorDetail";
import Alert from "@mui/material/Alert";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  root_input: {
    paddingLeft: "8px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid grey",
    borderRadius: "5px",
    font: "normal normal 300 17px/35px Roboto",
    color: "grey",
    height: "40px",
    marginRight: "18px",
  },
});

const eventBaseUrl = "http://localhost:8080/sports/events";

class DoctorDetail extends React.Component {
  state = {
   eventDetails: [],
   isShowCard:true,
   newEventDetails: [],
   isShowTable:false,
   showDoctorAddDetail:false,
   DoctorId:'',
   account: this.props.account,
  userContract: this.props.userContract,
  DoctorData:[],
  shouldErrorMessageDisplay:false
  };

  componentWillMount(){
    axios.get(eventBaseUrl).then((res) => {
      this.setState({eventDetails:res.data})
    });

  }

  handleDisplayValue=(value,data)=>{
    this.setState({
      isShowCard:value,
      newEventDetails:data
    })
  }

  handleBack=()=>{
    this.setState({isShowCard:true,newEventDetails:[]})
  }

  handleSubmit= async () =>{
    const { DoctorId, account , userContract,DoctorData} = this.state;
    const getDoctorList = await userContract.methods.getDoctorList().call();
    console.log('UserList', getDoctorList)
    getDoctorList.forEach((Doctor,index)=>{
      if(Doctor.id === DoctorId){
        console.log('check',getDoctorList[index])
        this.setState({
          DoctorData:getDoctorList[index],
          isShowTable:true
        })
        console.log('check123',DoctorData)
      }
      else{
        this.setState({
          shouldErrorMessageDisplay:true
        })
        
      }
    })
  }

  addNewDoctor=()=>{
    this.setState({
      showDoctorAddDetail:true
    })
  }

  handleDoctorID = (e)=>{
    this.setState({ DoctorId: e.target.value });
  }

  handleAddDoctorDetail=()=>{
    this.setState({
      showDoctorAddDetail:false
    })
  }

  render() {
    const {
      eventDetails,isShowCard,newEventDetails,DoctorData,shouldErrorMessageDisplay
    } = this.state;
    const { classes, account,userContract} = this.props;
    console.log('data',DoctorData[0])
    return (
      <div className="flex justify-center">
      {!this.state.isShowTable &&!this.state.showDoctorAddDetail&&( <div className="mt-5 ml-6 flex-col items-center">
              <div>
              <span className="text-xl mr-4">Enter Doctor ID</span>
              <Input
                classes={{ root: classes.root_input }}
                onChange={this.handleDoctorID}
                autoFocus
                disableUnderline
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              </div>
             
              <div style={{cursor:'pointer',color:'blue',marginLeft: 154,marginTop: 18,fontSize: 18,alignItems:"center",display: "flex"}}
                   onClick={this.addNewDoctor}>
              <AddCircleIcon></AddCircleIcon>
               <span>Add new Doctor</span>
                
              </div>
              {shouldErrorMessageDisplay &&
          <Alert severity="error">Invalid Doctor ID</Alert>
        }
             
            </div>)}
            {this.state.isShowTable && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <DoctorDetailTable
              handleBack={this.handleBack} DoctorData={this.state.DoctorData}
            />
          </div>
        )}
        {this.state.showDoctorAddDetail&&
        <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
        <AddDoctorDetail account={this.props.account} userContract={this.props.userContract} hideDoctorAddDetail={this.handleAddDoctorDetail}/>
      </div>}
      </div>
    );
  }
}

export default withStyles(styles)(DoctorDetail);
