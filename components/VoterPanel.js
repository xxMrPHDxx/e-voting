import React from "react";

export default class VoterPanel extends React.Component {
  render(){
    return (
      <div className="flex-grow-1">
        Welcome, {this.props.name}!
      </div>
    )
  }
}