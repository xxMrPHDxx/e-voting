import React from "react";
import AddUserForm from "../forms/AddUserForm";
import BaseModal from "./BaseModal";

export default class AddUserModal extends React.Component {

  render(){
    return (
      <BaseModal
        disabled={this.props.disabled}
        title="Add User"
        onSubmit={ (data)=>this.props.onSubmit(data) }
      >
        <AddUserForm />
      </BaseModal>
    )
  }

}