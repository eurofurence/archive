import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import logo from './ef-logo.png';
import './App.css';

import ContentSelection from './contentSelection';
import Content from './content';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: null
    };

    fetch(process.env.PUBLIC_URL + '/config.json')
      .then(response => response.json())
      .then(data => {
        this.setState({data});
      })
      .catch(error => {
        this.setState({error});
      });
  }

  render() {
    return (
      <div>
        <div className="banner-container">
          <img src={logo} alt="Logo" />
          <div className="logo">
            Eurofurence Archive
          </div>
        </div>
  
        <div className="top-divider"></div>

        <Route path="/:year?/:type?/:issue?" render={({match}) =>
          <div>
            <ContentSelection data={this.state.data} match={match} />
            <Content data={this.state.data} match={match} />
          </div>
        } />
      </div>
    );
  }
}

export default App;
