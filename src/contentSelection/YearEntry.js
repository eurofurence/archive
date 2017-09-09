import React, { Component } from 'react';
import {Menu, Header} from 'semantic-ui-react';


class YearEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    };
  }

  select = evt => {
    evt.preventDefault();
    window.location.hash = encodeURI(this.props.title);
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
      <Menu.Item active={isActive} className={entryClass} onClick={this.select}>
        <Header as="h4">{this.props.title}</Header>
        <p>{this.props.theme}</p>
      </Menu.Item>
    );
  }
}

export default YearEntry;
