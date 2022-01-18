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
import PatientDetailTable from "./PatientDetailTable";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddPatientDetail from "./AddPatientDetail";
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

class PatientDetail extends React.Component {
  state = {
   eventDetails: [],
   isShowCard:true,
   newEventDetails: [],
   isShowTable:false,
   showPatientAddDetail:false,
   patientId:'',
   account: this.props.account,
  userContract: this.props.userContract,
  patientData:[],
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
    const { patientId, account , userContract,patientData} = this.state;
    const getPatientList = await userContract.methods.getPatientList().call();
    console.log('UserList', getPatientList)
    getPatientList.forEach((patient,index)=>{
      if(patient.id === patientId){
        console.log('check',getPatientList[index])
        this.setState({
          patientData:getPatientList[index],
          isShowTable:true
        })
        console.log('check123',patientData)
      }
      else{
        this.setState({
          shouldErrorMessageDisplay:true
        })
        
      }
    })
  }

  addNewPatient=()=>{
    this.setState({
      showPatientAddDetail:true
    })
  }

  
  handleAddPatientDetail=()=>{
    this.setState({
      showPatientAddDetail:false
    })
  }

  handlePatientDetail=()=>{
    this.setState({
      isShowTable:false
    })
  }

  handlePatientID = (e)=>{
    this.setState({ patientId: e.target.value });
  }

  render() {
    const {
      eventDetails,isShowCard,newEventDetails,patientData,shouldErrorMessageDisplay
    } = this.state;
    const { classes, account,userContract} = this.props;
    console.log('data',patientData[0])
    return (
      <div className="flex justify-center">
      {!this.state.isShowTable &&!this.state.showPatientAddDetail&&( <div className="mt-5 ml-6 flex-col items-center">
              <div>
              <span className="text-xl mr-4">Enter Patient ID</span>
              <Input
                classes={{ root: classes.root_input }}
                onChange={this.handlePatientID}
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
                   onClick={this.addNewPatient}>
              <AddCircleIcon></AddCircleIcon>
               <span>Add new Patient</span>
                
              </div>
              {shouldErrorMessageDisplay &&
          <Alert severity="error">Invalid Patient ID</Alert>
        }
             
            </div>)}
            {this.state.isShowTable && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <PatientDetailTable
              handleBack={this.handleBack} patientData={this.state.patientData} hidePatientDetail={this.handlePatientDetail}
            />
          </div>
        )}
        {this.state.showPatientAddDetail&&
        <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
        <AddPatientDetail account={this.props.account} userContract={this.props.userContract} hidePatientAddDetail={this.handleAddPatientDetail}/>
      </div>}
      </div>
    );
  }
}

export default withStyles(styles)(PatientDetail);
