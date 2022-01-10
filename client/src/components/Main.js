import React from "react";
import Tab from "./Tab";
import { withRouter } from "react-router";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: this.props.account,
      userContract: this.props.userContract
    };
  }

  componentWillMount() {
    // if (localStorage.getItem("username") === null) {
    //   const {
    //     history: { push },
    //   } = this.props;
    //   push("/");
    // }
  }

  handleLogout = () => {
    localStorage.removeItem("username");
    const {
      history: { push },
    } = this.props;
    push("/");
  };

  render() {
    return (
      <div className="space-y-5 h-screen flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-semibold text-blue-800">
           Health Care Blockchain System
          </h2>
          <button
            class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.handleLogout}
          >
            Logout
          </button>
        </div>
        <Tab account={this.state.account} userContract={this.state.userContract}/>
      </div>
    );
  }
}

export default withRouter(Main);
