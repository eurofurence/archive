import React, { Component } from 'react';

class MobileView extends Component {
  render() {
    return (
      <div>
        <h1>Eurofurence Archive</h1>
        {this.props.data && 
        this.props.data.map((year, key) => {
          let daily;
          if(year.daily) {
            daily = (<div>
              <h4>Daily Eurofurence</h4>
              <ul>
                {year.daily.map((issue, key) => {
                  return (<li key={key}><a href={issue.url}>{issue.title}</a></li>);
                })}
              </ul>
            </div>);
          }

          let conbook;
          if(year.conbook) {
            conbook = (<p><a href={year.conbook}>Download Conbook</a></p>);
          }

          let website;
          if(year.website) {
            website = (<p><a href={year.website}>Open Website</a></p>);
          }
          return <div key={key}>
            <h2>{year.title}</h2>
            <h3>{year.theme}</h3>
            {daily}
            {conbook}
            {website}
          </div>
        })}
      </div>
    );
  }
}

export default MobileView;
