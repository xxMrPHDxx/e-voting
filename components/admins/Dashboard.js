import React from "react"

export default class Dashboard extends React.Component {

  async componentDidMount(){

  }

  render(){
    return (
      <div id={this.props.id} className={this.props.className}>Dashboard</div>
    )
  }

}