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
import StatisticsTable from "./StatisticsTable";

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

class OngoingEvents extends React.Component {
  state = {
   eventDetails: [],
   isShowCard:true,
   newEventDetails: [],
   isShowTable:false
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

  handleSubmit=()=>{
    this.setState({
      isShowTable:true
    })
  }

  render() {
    const {
      eventDetails,isShowCard,newEventDetails
    } = this.state;
    const { classes } = this.props;
    
    return (
      <div className="flex justify-center">
      {!this.state.isShowTable &&( <div className="mt-5 ml-6 flex items-center">
              <span className="text-xl mr-4">Enter Patient ID</span>
              <Input
                classes={{ root: classes.root_input }}
                onChange={this.handleQuarterAnalysisChange}
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
            </div>)}
            {this.state.isShowTable && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <StatisticsTable
              handleBack={this.handleBack}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(OngoingEvents);
