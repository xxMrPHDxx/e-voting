import React from "react";

export default class Toast extends React.Component {
  
  constructor(props){
    super(props);
    setTimeout(
      ()=>{
        try{
          this.props.onEnded && this.props.onEnded();
        }catch(e){}
      }, 
      props.timeout && parseInt(props.timeout) || 3000
    );
  }

  render(){
    return (
      <div
        className="toast fixed-center show"
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="p-3">
          <i className="text-danger fas fa-exclamation-circle" />
          <strong className="text-danger m-2">
            {this.props.title || 'Error'}
          </strong>
        </div>
        <div className="toast-body">
          {this.props.text || "This is awkward ..."}
        </div>
      </div>
    )
  }

}