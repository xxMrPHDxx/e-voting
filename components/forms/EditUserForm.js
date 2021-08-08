import React from "react";

export default class EditUserForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: this.props['user-name'],
      username: this.props['user-username'],
      passwordEditable: false,
      isAdmin: this.props['user-is_admin'],
    }
  }

  render(){
    return (
      <form id="formEditUser" className="modal-body container">
        <input type="hidden" name="id" value={this.props['user-id']}/>
        <div className="form-group row p-2">
          <label className="col-3 text-start" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="col-9 text-center"
            onChange={ e=>this.setState({ name: e.target.value }) }
            value={this.state.name}
          />
        </div>
        <div className="form-group row p-2">
          <label className="col-3 text-start" htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="col-9 text-center"
            onChange={ e=>this.setState({ username: e.target.value }) }
            value={this.state.username}
          />
        </div>
        <div className="form-group row p-2">
          <label className="col-3 text-start" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="col-9 text-center"
            placeholder="Click to change"
            readOnly={!this.state.passwordEditable}
            onFocus={ ()=>this.setState({ passwordEditable: true }) }
            onBlur={ ()=>this.setState({ passwordEditable: false }) }
          />
        </div>
        <div className="form-group row p-2">
          <label className="col-3 custom-control-label" htmlFor="is_admin">Admin User?</label>
          <input
            className="col-9 text-center"
            type="checkbox"
            name="is_admin"
            onChange={ e=>this.setState({ isAdmin: e.target.checked }) }
            checked={this.state.isAdmin}
          />
        </div>
      </form>
    )
  }

}