import React from "react";

export default class BaseModal extends React.Component {

  constructor(props){
    super(props);
    const title = (this.props.title || Date.now().toString()).replace(/\s+/g, '-').toLowerCase();
    const uuid = Date.now().toString();
    this._id = `modal-${title}-${uuid}`;
    this._title_id = `modal-title-${title}-${uuid}`;
  }

  Submit(){
    if(typeof this.props.onSubmit === 'function'){
      const form = $(`#${this._id}`);
      const data = form?.find('[name]').serializeJSON()
      Object.entries(([key, value])=>{
        if(typeof value === 'string')
          data[key] = value.trim();
      });
      this.props.onSubmit(data);
      form.find('[name]').val('');
    }
  }

  render(){
    return (
      <div className="float-right">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#${this._id}`}
          disabled={this.props.disabled}
        >
          {this.props.text || this.props.title || '[Untitled Modal]'}
        </button>
        <div
          className="modal fade"
          id={this._id}
          tabIndex="-1" 
          aria-labelledby={this._title_id} 
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={this._title_id}>
                  {this.props.title || '[Untitled Modal]'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              {this.props.children}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button" 
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={ ()=>this.Submit() }
                  disabled={this.props.disabled}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }

}