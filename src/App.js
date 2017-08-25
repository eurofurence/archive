import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import logo from './ef-logo.png';
import './App.css';

import ContentSelection from './contentSelection';
import Content from './content';
import MobileView from './mobileView';

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

  backToStart = evt => {
    window.location.hash = '';
  }

  render() {
    return (
      <div>
        <div className="archive-desktop">
          <div className="banner-container">
            <img src={logo} alt="Logo" onClick={this.backToStart} />
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
        <div className="archive-mobile">
          <MobileView data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
