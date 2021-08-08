import React from "react";

export default class AddUserForm extends React.Component {

  render(){
    return (
      <form id={this.props.id || `form-${Date.now()}`} className="modal-body">
        <input
          type="text"
          name="name"
          className="form-control mt-2 mb-2 text-center"
          required
          placeholder="Name"
        />
        <input
          type="text"
          name="username"
          className="form-control mt-2 mb-2 text-center"
          required
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          className="form-control mt-2 mb-2 text-center"
          required
          placeholder="Password"
        />
        <div className="custom-control custom-checkbox text-center">
          <input
            className="m-2"
            type="checkbox"
            name="is_admin"
          />
          <label className="custom-control-label" htmlFor="is_admin">Admin User?</label>
        </div>
      </form>
    )
  }

}