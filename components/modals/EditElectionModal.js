import React from "react";
import EditElectionForm from "../forms/EditElectionForm";
import BaseModal from "./BaseModal";

export default class AddUserModal extends React.Component {

  render(){
    return (
      <BaseModal
        disabled={this.props.disabled}
        text="Edit"
        title="Edit Election"
        onSubmit={ (data)=>this.props.onSubmit(data) }
      >
        <EditElectionForm 
          election-id={this.props['election-id']}
          election-title={this.props['election-title']}
          election-description={this.props['election-description']}
        />
      </BaseModal>
    )
  }

}