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

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    //post request: first tells server to post request to github API to grab user's repos & then uses that for cb parameter in post request to save the repo data into mongo db
    $.ajax({
      type: "POST",
      url: '/repos',
      data: JSON.stringify({
        username: term
      }),
      contentType: 'application/json',
      success: function(data) {console.log('you did it');}
      // error: function
    });


  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));