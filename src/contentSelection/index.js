import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react';
import YearEntry from './YearEntry';

import "./ContentSelection.css";

class ContentSelection extends Component {
  render() {
    if(this.props.data) {
      return (
        <Menu attached vertical className="year-selection">
          {this.props.data.map((entry, idx) => 
            <YearEntry
              title={entry.title}
              theme={entry.theme}
              daily={entry.daily}
              website={entry.website}
              conbook={entry.conbook}
              match={this.props.match}
              key={idx}
            />
          )}
        </Menu>
      );
    }

    return null;
  }
}

export default ContentSelection;
