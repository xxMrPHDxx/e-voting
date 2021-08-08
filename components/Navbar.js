import React from "react";

export default class Navbar extends React.Component {

  render(){
    return (
      <div className="navbar navbar-dark bg-dark text-light p-3">
        <a href="/" className="navbar-brand">{this.props.title || 'Blockchain'}</a>
        <div className="dropdown d-md-none">
          <a 
            className="btn text-light" 
            id="dropdownMenuButton" 
            data-bs-toggle="dropdown" 
          >
            <i className="fas fa-bars"></i>
          </a>
          <ul 
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton"
          >
            {this.props.children}
            {this.props.children?.length > 0 && <li><hr className="dropdown-divider"/></li>}
            <li>
              <a
                className="dropdown-item"
                onClick={ ()=>this.props.onLogout() }
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

}