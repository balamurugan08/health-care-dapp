import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  table: {
    minWidth: 700,
  },
});

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

class DoctorDetailTable extends React.Component {
  state = {};

  render() {
    const { handleBack, classes, DoctorData } = this.props;
    const data = this.props.DoctorData;
    console.log('sadfsdfsd',data)
    return (
      <div className="space-y-6">
        <TableContainer component={Paper}>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Doctor Details</StyledTableCell>
        <StyledTableCell align="center"></StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Doctor ID
          </StyledTableCell>
          <StyledTableCell align="center">{data.id}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Doctor Name
          </StyledTableCell>
          <StyledTableCell align="center">{data.name}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Doctor Age
          </StyledTableCell>
          <StyledTableCell align="center">{data.age}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Gender
          </StyledTableCell>
          <StyledTableCell align="center">{data.gender}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Doctor EmailId
          </StyledTableCell>
          <StyledTableCell align="center">{data.email}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Doctor Phone number
          </StyledTableCell>
          <StyledTableCell align="center">{data.phoneNo}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Doctor Address
          </StyledTableCell>
          <StyledTableCell align="center">{data.doctorAddress}</StyledTableCell>
        </StyledTableRow>
    </TableBody>
  </Table>
</TableContainer>
      </div>
    );
  }
}

export default withStyles(styles)(DoctorDetailTable);
