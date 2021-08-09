import React from "react";
import Api from "../Api";
import Navbar from "./Navbar";

import Dashboard from './admins/Dashboard';
import Users from './admins/Users';
import Elections from './admins/Elections';

export default class AdminPanel extends React.Component {

  constructor(props){
    super(props);
    this.pages = {
      Dashboard,
      Users,
      Elections,
    };
    this.state = {
      page: this.pages.Elections,
    };
  }

  async componentDidMount(){
    this.props.onTitleChange(this.state.page.prototype.constructor.name);
  }

  navigate(title, component){
    this.setState({ page: component });
    if(typeof this.props.onTitleChange === 'function')
      this.props.onTitleChange(title);
  }

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
    const PageComponent = this.state.page;
    return (
      <div id="app">
        <Navbar 
          id="navbar"
          className="navbar navbar-dark bg-dark text-light"
          title="E-Voting" 
          onLogout={ ()=>this.Logout() }
        >
          <li><h6 className="dropdown-header">Management</h6></li>
          {Object.entries(this.pages).map(([page, component])=>{
            return (
              <li key={page}>
                <a 
                  className={`dropdown-item ${this.state.page === component ? 'active' : ''}`}
                  onClick={ (e)=>this.navigate(page, component) }
                >
                  {page}
                </a>
              </li>
            )
          })}
        </Navbar>
        <nav id="sidebar" className="pl-2 pr-2">
          {Object.entries(this.pages).map(([page, component])=>{
            return (
              <a 
                key={page}
                className={this.state.page === component ? 'nav-link active' : 'nav-link'}
                onClick={ (e)=>this.navigate(page, component) }
              >
                {page}
              </a>
            )
          })}
        </nav>
        <PageComponent id="content" className="p-2" {...this.props}/>
      </div>
    )
  }

}

/**

 */