import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PatientDetail from './PatientDetail';
import DoctorDetail from './DoctorDetail';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    
  }
});

class SimpleTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      account: this.props.account,
      userContract: this.props.userContract
    };
  }
  // state = {
  //   value: 0,
   
  // };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs className={classes.root} value={value} onChange={this.handleChange} centered textColor="primary" indicatorColor="primary">
            <Tab  label="Patient Details" href="#basic-tabs"/>
            <Tab  label="Doctor Details" href="#basic-tabs"/>
            {/* <Tab label="View Patient Examine Details" href="#basic-tabs" /> */}
          </Tabs>
        </AppBar>
        {value === 0 && <PatientDetail account={this.state.account} userContract={this.state.userContract}/>}
        {value === 1 && <DoctorDetail account={this.state.account} userContract={this.state.userContract}/>}
        {/* {value === 2 && <DiscussionForum/>} */}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);