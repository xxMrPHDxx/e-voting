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
      pages: [],
      users: [],
      error: '',
    }
  }

  async getUsers(page){
    const { success, message, data } = await Api.GET(`/users?page=${page}`);
    if(!success){
      if(page <= 0) throw message;
      return await this.getUsers(page-1);
    }
    const { users, totalPage } = data;
    this.setState({ 
      page: Math.min(this.state.page, totalPage-1),
      pages: totalPage > 1 ? Array(totalPage).fill().map((_, idx)=>idx) : [0]
    });
    return users;
  }

  async componentDidMount(){
    try{
      this.setState({ users: await this.getUsers(this.state.page) });
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
      this.setState({ buttonDisabled: false, users: await this.getUsers(this.state.page) });
    }catch(error){
      this.setState({ buttonDisabled: true, error });
    }
  }

  async EditUser(formdata){
    this.setState({ buttonDisabled: true });
    try{
      const { success, message } = await Api.POST('/user', formdata);
      if(!success) throw message;
      this.setState({ buttonDisabled: false, users: await this.getUsers(this.state.page) });
    }catch(error){
      this.setState({ buttonDisabled: true, error });
    }
  }

  async DeleteUser(id){
    this.setState({ buttonDisabled: true });
    try{
      const { success, message } = await Api.DELETE('/user', { id });
      if(!success) throw message;
      this.setState({ buttonDisabled: false, users: await this.getUsers(this.state.page) });
    }catch(error){
      this.setState({ buttonDisabled: true, error });
    }
  }

  async ChangePage(page){
    page = Math.max(Math.min(page, this.state.pages.length-1), 0);
    try{
      this.setState({ page, users: await this.getUsers(page) });
    }catch(error){
      this.setState({ error });
    }
  }

  PrevPage(){ this.ChangePage(this.state.page-1); }
  NextPage(){ this.ChangePage(this.state.page+1); }

  render(){
    if(this.state.loading === true)
      return (<div>Loading, please wait...</div>)
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
          {this.state.users?.map((user, idx)=>
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
        {
          (this.state.pages.length > 1) && <nav
            aria-label="User pagination"
            className="d-flex justify-content-center"
            >
            <ul className="pagination pagination-sm">
              <li 
                className={`page-item ${this.state.page === 0 ? 'disabled' : ''}`} 
              >
                <a 
                  className="page-link" aria-label="Previous"
                  onClick={ ()=>this.PrevPage() }
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              {this.state.pages.map(page=>(
                <li 
                  key={page} 
                  className={`page-item ${page === this.state.page ? 'active' : ''}`}
                >
                  <a
                    className="page-link"
                    onClick={ ()=>this.ChangePage(page) }
                  >
                    {page + 1}
                  </a>
                </li>
              ))}
              <li
                className={`page-item ${this.state.page === this.state.pages.length-1 ? 'disabled' : ''}`} 
              >
                <a 
                  className="page-link" aria-label="Next"
                  onClick={ ()=>this.NextPage() }
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        }
      </div>
    )
  }

}
