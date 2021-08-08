import React from "react";
import Dashboard from './admins/Dashboard';
import Users from './admins/Users';
import Navbar from "./Navbar";

export default class AdminPanel extends React.Component {

  constructor(props){
    super(props);
    this.pages = {
      Dashboard,
      Users,
    };
    this.state = {
      page: this.pages.Users,
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
    console.log('Logging out...')
  }

  render(){
    const PageComponent = this.state.page;
    return (
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar title="E-Voting" onLogout={ ()=>this.Logout() }>
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
        <div className="container-fluid flex-grow-1 d-flex">
          <div className="row flex-grow-1">
            <nav className="col-4 col-lg-3 d-none d-md-block nav nav-pills flex-column p-1">
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
            <div className="col flex-grow-1">
              {/* {this.pages[this.state.page].render()} */}
              <PageComponent {...this.props}></PageComponent>
            </div>
          </div>
        </div>
      </div>
    )
  }

}