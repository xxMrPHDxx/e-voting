import React from 'react'
import Header from '../components/Header'

import Api from '../Api';
import AdminPanel from '../components/AdminPanel';
import VoterPanel from '../components/VoterPanel';

export default class Home extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      title: 'Home',
      loading: true,
      loggedIn: false,
      error: null,
      user: null,
    }
  }

  async componentDidMount(){
    const { success, message, data } = await Api.POST('/isLoggedIn');
    if(!success){
      this.props.router.push('/login');
      return this.setState({
        loading: false,
        loggedIn: false,
        error: message,
      });
    }
    this.setState({
      loading: false,
      loggedIn: true,
      user: {
        userID: data.id,
        name: data.name,
        username: data.username,
        public_key: data.public_key,
        is_admin: data.is_admin,
      },
    })
  }

  render(){
    if(this.state.loading || !this.state.user)
      return (
        <div>Loading, please wait ...</div>
      )
    const ContentPanel = this.state.user.is_admin ? AdminPanel : VoterPanel;
    return (
      <div className="app d-flex flex-column">
        <Header title={this.state.title} description="Admin panel" />
        <ContentPanel
          title={this.state.panel} 
          onTitleChange={ (title)=>this.setState({title}) }
          router={this.props.router}
          {...this.state.user}
        />
      </div>
    )
  }
  
}
