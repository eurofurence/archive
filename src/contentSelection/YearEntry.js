import React, { Component } from 'react';
import {Menu, Header, Dropdown} from 'semantic-ui-react';


class YearEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    };
  }

  select = (type, subtype) => evt => {
    evt.preventDefault();
    window.location.hash = encodeURI(this.props.title) + '/' + encodeURI(type) + (subtype ? '/' + encodeURI(subtype) : '');
  }

  openWebsite = evt => {
    evt.preventDefault();
    const newTab = window.open(this.props.website, '_blank');
    newTab.focus();
  }

  render() {
    const isActive = this.props.match.params.year === this.props.title;
    const entryClass = this.props.theme ? "archive-entry year-entry" : "archive-entry year-entry-no-theme";
    return (
      <Menu.Item active={isActive} className={entryClass}>
        <Header as="h4">{this.props.title}</Header>
        <p>{this.props.theme}</p>
        <Menu attached compact className="archive-inline-menu">
          <Dropdown disabled={!this.props.daily} item text="Daily" className={isActive && this.props.match.params.type === 'daily' ? 'active' : ''}>
            <Dropdown.Menu>
              {this.props.daily && this.props.daily.map((issue, idx) => 
                <Dropdown.Item 
                  key={idx} 
                  as='a'
                  active={issue.title === this.props.match.params.issue} 
                  onClick={this.select('daily', issue.title)}
                  href={issue.url}
                >
                  {issue.title}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          {
            this.props.conbook ?
              <Menu.Item active={isActive && this.props.match.params.type === 'conbook'} onClick={this.select('conbook')} href={this.props.conbook}>Conbook</Menu.Item>
            :
            <Menu.Item className="archive-disabled-conbook">Conbook</Menu.Item>
          }
          <Menu.Item onClick={this.openWebsite} href={this.props.website}>Website</Menu.Item>
        </Menu>
      </Menu.Item>
    );
  }
}

export default YearEntry;
