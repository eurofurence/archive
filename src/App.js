import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import logo from './ef-logo.png';
import './App.css';

import data from './config.json';

import ContentSelection from './contentSelection';
import Content from './content';

class App extends Component {
  render() {
    return (
      <div>
        <div className="archive-desktop">
          <div className="banner-container">
            <a href="/">
              <img src={logo} alt="Logo" />
            </a>
            <div className="logo">
              Eurofurence Archive
            </div>
          </div>
    
          <div className="top-divider"></div>

          <Route path="/:year?" render={({match}) =>
            <div>
              <ContentSelection data={data} match={match} />
              <Content data={data} match={match} />
            </div>
          } />
        </div>
      </div>
    );
  }
}

export default App;
