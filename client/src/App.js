import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import HelloWorld from "./contracts/HelloWorld.json";
import User from "./contracts/User.json";
import getWeb3 from "./getWeb3";
import Login from "./components/Login";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null,userList:null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      let deployedNetwork = SimpleStorageContract.networks[networkId];
      const storageInstance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log('storageInstance-------',storageInstance)
      deployedNetwork = HelloWorld.networks[networkId];
      const helloWorldInstance = new web3.eth.Contract(
        HelloWorld.abi,
        deployedNetwork && deployedNetwork.address
      );
      console.log('helloWorldInstance-------',helloWorldInstance)
      deployedNetwork = User.networks[networkId];
      const userInstance = new web3.eth.Contract(
        User.abi,
        deployedNetwork && deployedNetwork.address
      );
console.log('UserInstance-------',userInstance)
      

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, storageContract: storageInstance, helloWorldContract: helloWorldInstance, userContract:userInstance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, storageContract, helloWorldContract,userContract } = this.state;

    // Stores a given value, 5 by default.
    // await storageContract.methods.set(5).send({ from: accounts[0] });

    // // Get the value from the contract to prove it worked.
    // const storageResponse = await storageContract.methods.get().call();

    // const greetingResponse = await helloWorldContract.methods.getGreeting().call();

    const userResponse = await userContract.methods.addUser("bala","bala").call();

    const getUserList = await userContract.methods.getUsers().call();
    console.log('UserList', getUserList)

    // Update state with the result.
    // this.setState({ storageValue: storageResponse, greeting: greetingResponse, userList:getUserList});
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <BrowserRouter>
      <div className="flex flex-col min-h-screen">
       <p>{this.state.userList}</p>
        {/* <Route path="/" component={Login} exact></Route> */}
        {/* <Route path="/doctor-signup" component={Signup}></Route>
        <Route path="/patient-signup" component={PatientSignup}></Route>
        <Route path="/home" component={Main}></Route> */}
      </div>
    </BrowserRouter>
    );
  }
}

export default App;