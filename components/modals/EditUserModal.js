import React from "react";
import EditUserForm from "../forms/EditUserForm";
import BaseModal from "./BaseModal";

export default class AddUserModal extends React.Component {

  render(){
    return (
      <BaseModal
        disabled={this.props.disabled}
        text="Edit"
        title="Edit User"
        onSubmit={ (data)=>this.props.onSubmit(data) }
      >
        <EditUserForm 
          user-id={this.props['user-id']}
          user-name={this.props['user-name']}
          user-username={this.props['user-username']}
          user-is_admin={this.props['user-is_admin']}
        />
      </BaseModal>
    )
  }

}