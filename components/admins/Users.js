import React from "react";
import Api from '../../Api';
import AddUserModal from "../modals/AddUserModal";
import EditUserModal from "../modals/EditUserModal";
import UserList from "../UserList";
import Toast from "../Toast";

export default class Users extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      buttonDisabled: false,
      page: 0,
      users: [],
      error: '',
    }
  }

  async getUsers(){
    const { success, message, data } = await Api.GET(`/users?page=${this.state.page}`);
    if(!success) throw message;
    return data;
  }

  async componentDidMount(){
    try{
      const users = await this.getUsers();
      this.setState({
        users,
      });
    }catch(error){
      this.setState({ error });
    }
    this.setState({ loading: false });
  }

  async AddUser(formdata){
    this.setState({ buttonDisabled: true });
    try{
      const { success, message } = await Api.PUT('/user', formdata);
      if(!success) throw message;
      this.setState({ buttonDisabled: false, users: await this.getUsers() });
    }catch(error){
      this.setState({ buttonDisabled: true, error });
    }
  }

  async EditUser(formdata){
    this.setState({ buttonDisabled: true });
    try{
      const { success, message } = await Api.POST('/user', formdata);
      if(!success) throw message;
      this.setState({ buttonDisabled: false, users: await this.getUsers() });
    }catch(error){
      this.setState({ buttonDisabled: true, error });
    }
  }

  async DeleteUser(id){
    this.setState({ buttonDisabled: true });
    try{
      const { success, message } = await Api.DELETE('/user', { id });
      if(!success) throw message;
      this.setState({ buttonDisabled: false, users: await this.getUsers() });
    }catch(error){
      this.setState({ buttonDisabled: true, error });
    }
  }

  render(){
    if(this.state.loading === true)
      return (<div>Loading, please wait... {this.state.loading}</div>)
    return (
      <div>
        {
          this.state.error && <Toast 
            title="Error" 
            text={this.state.error} 
            onEnded={ ()=>this.setState({ buttonDisabled: false, error: '' }) } 
          />
        }
        <div className="navbar">
          <h1 className="float-left text-center">Manage Users</h1>
          <AddUserModal
            disabled={this.state.buttonDisabled}
            onSubmit={ (formdata)=>this.AddUser(formdata) }
          />
        </div>
        <UserList>
          {this.state.users.map((user, idx)=>
            <tr key={idx}>
              <td scope="row">{idx+1}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>
                <input 
                  type="checkbox"
                  className="custom-control-input"
                  disabled
                  checked={user.is_admin}
                />
              </td>
              <td className="d-flex justify-content-center" style={{gridGap: '10px'}}>
                <EditUserModal
                  disabled={this.state.buttonDisabled}
                  user-id={user.id}
                  user-name={user.name}
                  user-username={user.username}
                  user-is_admin={user.is_admin}
                  onSubmit={ (formdata)=>this.EditUser(formdata) }
                />
                <button
                  className="btn btn-danger"
                  disabled={this.state.buttonDisabled}
                  onClick={ ()=>this.DeleteUser(user.id) }
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        </UserList>
      </div>
    )
  }

}

/**
  <button
    className="btn btn-secondary mr-2"
  >
    Edit
  </button>
 */