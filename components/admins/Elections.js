import React from "react"
import Api from '../../Api';
import AddElectionModal from "../modals/AddElectionModal";
import EditElectionModal from "../modals/EditElectionModal";
import ElectionList from "../ElectionList";
import Toast from "../Toast";

export default class Elections extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      page: 0,
      elections: [],
      buttonDisabled: false,
      error: '',
    };
  }

  async getElections(){
    const { success, message, data } = await Api.GET(`/elections?page=${this.state.page}`);
    if(!success) throw message;
    return data;
  }

  async componentDidMount(){
    this.setState({ loading: false, elections: await this.getElections() });
  }

  async AddElection(formdata){
    this.setState({ buttonDisabled: true });
    try{
      const { success, message } = await Api.PUT('/election', formdata);
      if(!success) throw message;
      this.setState({ buttonDisabled: false, elections: await this.getElections() });
    }catch(error){
      this.setState({ buttonDisabled: true, error });
    }
  }

  async EditElection(formdata){
    this.setState({ buttonDisabled: true });
    try{
      const { success, message } = await Api.POST('/election', formdata);
      if(!success) throw message;
      this.setState({ buttonDisabled: false, elections: await this.getElections() });
    }catch(error){
      this.setState({ buttonDisabled: true, error });
    }
  }

  async DeleteElection(id){
    this.setState({ buttonDisabled: true });
    try{
      const { success, message } = await Api.DELETE('/election', { id });
      if(!success) throw message;
      this.setState({ buttonDisabled: false, elections: await this.getElections() });
    }catch(error){
      this.setState({ buttonDisabled: true, error });
    }
  }

  render(){
    if(this.state.loading)
      return (<div>Loading, please wait...</div>)
    return (
      <div>
        {
          this.state.error && <Toast 
            title="Error" 
            text={this.state.error} 
            onEnded={ ()=>this.setState({ buttonDisabled: false, error: '' }) } 
          />
        }
        <div className="navbar">
          <h1 className="float-left text-center">Manage Elections</h1>
          <AddElectionModal
            disabled={this.state.buttonDisabled}
            onSubmit={ (formdata)=>this.AddElection(formdata) }
          />
        </div>
        <ElectionList>
          {this.state.elections.map((election, idx)=>
            <tr key={idx}>
              <td scope="row">{idx+1}</td>
              <td>{election.title}</td>
              <td>{election.description}</td>
              <td className="d-flex justify-content-center" style={{gridGap: '10px'}}>
                <EditElectionModal
                  disabled={this.state.buttonDisabled}
                  election-id={election.id}
                  election-title={election.title}
                  election-description={election.description}
                  onSubmit={ (formdata)=>this.EditElection(formdata) }
                />
                <button
                  className="btn btn-danger"
                  disabled={this.state.buttonDisabled}
                  onClick={ ()=>this.DeleteElection(election.id) }
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        </ElectionList>
      </div>
    )
  }

}