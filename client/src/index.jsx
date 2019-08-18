import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.search = this.search.bind(this);
    // this.findrepos = this.findrepos.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: '/repos',
      success: repos => {
        this.setState({ repos: repos });
        console.log(this.state);
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    //post request: first tells server to post request to github API to grab user's repos & then uses that for cb parameter in post request to save the repo data into mongo db

    $.ajax({
      type: "POST",
      url: '/repos',
      data: JSON.stringify({
        username: term
      }),
      contentType: 'application/json',
      success: (data) => {
        console.log('posting');
        this.componentDidMount();
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));