import React from "react";

export default class AddElectionForm extends React.Component {

  render(){
    return (
      <form id={this.props.id || `form-${Date.now()}`} className="modal-body container">
        <div className="form-group row p-2">
          <label className="col-3 text-start" htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="col-9"
            required
          />
        </div>
        <div className="form-group row p-2">
          <label className="col-3 text-start" htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            className="col-9"
            required
          />
        </div>
      </form>
    )
  }

}