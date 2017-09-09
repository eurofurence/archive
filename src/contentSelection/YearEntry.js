import React, { Component } from 'react';
import {Menu, Header} from 'semantic-ui-react';

class YearEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    };
  }

  generateUrl = title => {
    return title.split(' ')[1];
  }

  render() {
    const isActive = this.props.match.params.year === this.props.title.split(' ')[1];
    const entryClass = this.props.theme ? "archive-entry year-entry" : "archive-entry year-entry-no-theme";
    return (
      <Menu.Item active={isActive} className={entryClass} href={'/' + this.generateUrl(this.props.title) + '/'}>
        <Header as="h4">{this.props.title}</Header>
        <p>{this.props.theme}</p>
      </Menu.Item>
    );
  }
}

export default YearEntry;
