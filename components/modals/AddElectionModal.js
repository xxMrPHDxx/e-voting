import React from "react";
import AddElectionForm from "../forms/AddElectionForm";
import BaseModal from "./BaseModal";

export default class AddElectionModal extends React.Component {

  render(){
    return (
      <BaseModal
        disabled={this.props.disabled}
        title="New Election"
        onSubmit={ (data)=>this.props.onSubmit(data) }
      >
        <AddElectionForm />
      </BaseModal>
    )
  }

}