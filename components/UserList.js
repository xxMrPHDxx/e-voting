import React from "react";

export default class UserList extends React.Component {

  render(){
    return (
      <table className="table table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Admin</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.children}
        </tbody>
      </table>
    )
  }

}