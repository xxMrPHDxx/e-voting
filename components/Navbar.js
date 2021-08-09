import React from "react";

export default class Navbar extends React.Component {

  render(){
    return (
      <div id={this.props.id} className={this.props.className}>
        <a href="/" className="navbar-brand">{this.props.title || 'Blockchain'}</a>
        <div id="navbar-menu" className="dropdown">
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