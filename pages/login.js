import React from "react";
import Api from "../Api";
import Header from "../components/Header";
import styles from '../styles/Home.module.css'

export default class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      loading: true,
      loggedIn: false,
      username: '',
      password: '',
      buttonDisabled: false,
      error: false,
    }
  }

  async componentDidMount(){
    if(this.state.loggedIn) return this.props.router.push('/');
    const { success, message } = await Api.POST('/isLoggedIn');
    if(success){
      this.setState({
        loading: false,
        loggedIn: true,
        error: message,
      });
      return this.props.router.push('/');
    }
    this.setState({
      loading: false,
      loggedIn: false,
    })
  }

  async doLogin(){
    this.setState({ buttonDisabled: true })
    const { success, message, data } = await Api.POST('/login', {
      username: this.state.username,
      password: this.state.password,
    })
    if(!success)
      return this.setState({
        error: message,
      })
    this.setState({
      loggedIn: true,
    })
    this.props.router.push('/login');
  }

  render(){
    if(this.state.loading)
      return (
        <div>Loading, please wait...</div>
      )
    if(this.state.loggedIn)
      return (
        <div><script>{window.location.href='/'}</script></div>
      )
    return (
      <div className={styles.container}>
        <Header title="Login" description="Welcome to e-voting!" />
        <form className="d-flex flex-column" onSubmit={ (e)=>this.doLogin(e.preventDefault()) }>
          {this.state.error?(<div className="alert alert-danger">{this.state.error}</div>):''}
          <input 
            className="form-control text-center mb-2"
            type="text"
            placeholder="Username"
            onChange={ e=>this.setState({username: e.target.value.trim()}) }
          />
          <input
            className="form-control text-center mb-2"
            type="password"
            placeholder="Password"
            onChange={ e=>this.setState({password: e.target.value.trim()}) }
          />
          <button
            className="btn btn-primary"
          >
            Login
          </button>
        </form>
        {this.state.error?<script>{setTimeout(()=>$('.alert.alert-danger').attr('d-none'), 1500)}</script>:''}
      </div>
    );
  }

}