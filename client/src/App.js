import React, { Component } from "react";
import User from "./contracts/User.json";
import getWeb3 from "./getWeb3";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {  web3: null, accounts: null, contract: null,userList:null };

  componentWillMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      let deployedNetwork ;
      
      deployedNetwork = User.networks[networkId];
      const userInstance = new web3.eth.Contract(
        User.abi,
        deployedNetwork && deployedNetwork.address
      );
   console.log('UserInstance-------',userInstance)
      

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, userContract:userInstance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts,userContract } = this.state;

    // Stores a given value, 5 by default.
    // await storageContract.methods.set(5).send({ from: accounts[0] });

    // // Get the value from the contract to prove it worked.
    // const storageResponse = await storageContract.methods.get().call();

    // const greetingResponse = await helloWorldContract.methods.getGreeting().call();

    // const userResponse = await userContract.methods.addUser(1,"bala","bala@gmail.com","bala_123","7859512591","BASIC").send({from:accounts[0]});
    // const userResponse2 = await userContract.methods.addUser(2,"moulee","moulee@gmail.com","moulee_123","7859512592","PREMIUM").send({from:accounts[0]});

    // const getUserList = await userContract.methods.getUsers().call();
    // console.log('UserList', getUserList)

    // Update state with the result.
    // this.setState({ storageValue: storageResponse, greeting: greetingResponse, userList:getUserList});
  };

  render() {
    const { accounts,userContract } = this.state;
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Route path="/" component={Signup} exact children={ <Signup  account={accounts[0]} userContract={userContract} />}></Route>
        <Route path="/login" component={Login} children={ <Login  account={accounts[0]} userContract={userContract} />}></Route>
        <Route path="/home" component={Main}></Route>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;