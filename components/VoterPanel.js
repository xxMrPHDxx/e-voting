import React from "react";
import Api from "../Api";
import Navbar from "./Navbar";

export default class VoterPanel extends React.Component {

  async Logout(){
    try{
      const { success, message } = await Api.POST('/logout');
      if(!success) throw message;
      return this.props.router.push('/login');
    }catch(error){
      this.setState({ error });
    }
  }

  render(){
    return (
      <div className="flex-grow-1">
        <Navbar title="E-Voting" onLogout={ ()=>this.Logout() } />
        Welcome, {this.props.name}!
      </div>
    )
  }
  
}