import React from "react";

export default class EditUserForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: this.props['election-title'],
      description: this.props['election-description'],
    }
  }

  render(){
    return (
      <form id="formEditUser" className="modal-body container">
        <input type="hidden" name="id" value={this.props['election-id']}/>
        <div className="form-group row p-2">
          <label className="col-3 text-start" htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="col-9"
            onChange={ e=>this.setState({ title: e.target.value }) }
            value={this.state.title}
          />
        </div>
        <div className="form-group row p-2">
          <label className="col-3 text-start" htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            className="col-9"
            onChange={ e=>this.setState({ description: e.target.value }) }
            value={this.state.description}
          />
        </div>
      </form>
    )
  }

}