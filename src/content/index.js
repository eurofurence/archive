import React, { Component } from 'react';

import "./Content.css";

class Content extends Component {
  getUrl = ({year, type, issue}) => {
    const entry = this.props.data.filter(({title}) => title === year)[0];

    if(entry) {
      if(type === 'daily') {
        return entry.daily.filter(({title}) => title === issue)[0].url;
      }
      return entry[type];
    }
  }

  render() {
    if(this.props.data) {
      const url = this.getUrl(this.props.match.params);

      return (
        <div className="main-content">
          <embed type="application/pdf" src={url} />
        </div>
      );
    }

    return null;
  }
}

export default Content;
