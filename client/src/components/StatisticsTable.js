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

class StatisticsTable extends React.Component {
  state = {};

  render() {
    const { handleBack, classes, data } = this.props;

    return (
      <div className="space-y-6">
        <TableContainer component={Paper}>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Patient Details</StyledTableCell>
        <StyledTableCell align="center"></StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Patient Name
          </StyledTableCell>
          <StyledTableCell align="center">Sam Curran</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Patient Age
          </StyledTableCell>
          <StyledTableCell align="center">28</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Patient EmailId
          </StyledTableCell>
          <StyledTableCell align="center">samcurran@gmail.com</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Patient Phone number
          </StyledTableCell>
          <StyledTableCell align="center">1 877-366-2431</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Patient Address
          </StyledTableCell>
          <StyledTableCell align="center">San francisco, US</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Patient Height
          </StyledTableCell>
          <StyledTableCell align="center">170 cm</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow >
          <StyledTableCell component="th" scope="row">
           Patient Weight
          </StyledTableCell>
          <StyledTableCell align="center">85 kg</StyledTableCell>
        </StyledTableRow>
       
    </TableBody>
  </Table>
</TableContainer>
      </div>
    );
  }
}

export default withStyles(styles)(StatisticsTable);
