import React, { Component } from 'react';
import {Container, Header, Segment, Grid, Card, Icon, Button} from 'semantic-ui-react';

import "./Content.css";

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newBuffer: false
    };
  }

  getUrl = ({year, type, issue}) => {
    const entry = this.props.data.filter(({title}) => title === year)[0];

    if(entry) {
      if(type === 'daily') {
        return entry.daily.filter(({title}) => title === issue)[0].url;
      }
      return entry[type];
    }
  }

  random = type => evt => {
    const candidates = this.props.data.filter(entry => entry[type]);
    const entry = candidates[~~(Math.random() * candidates.length)];
    
    if(type === 'website') {
      const newTab = window.open(entry.website, '_blank');
      newTab.focus();
    } else if(type === 'conbook') {
      window.location.hash = encodeURI(entry.title) + '/conbook';
    } else if(type === 'daily') {
      const daily = entry.daily[~~(Math.random() * entry.daily.length)];
      window.location.hash = encodeURI(entry.title) + '/daily/' + encodeURI(daily.title);
    }
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      newBuffer: true
    });
  }

  getReadableType({type, year, issue}) {
    return (type === 'daily' ? ('the Daily Eurofurence ' + issue) : 'the conbook') + ' of ' + year;
  }

  render() {
    if(this.props.data && this.props.match.params.year) {

      if(this.state.newBuffer) {
        // This hack is needed because Edge does not handle updating the src attribute
        // of an embed element well. So we remove it to force react to create a new one
        // Thanks Microsoft! :/
        window.setTimeout(() => {
          this.setState({
            newBuffer: false
          });
        }, 50);
        return <div></div>;
      } else {
        const url = this.getUrl(this.props.match.params);
  
        return (
          <div className="main-content">
            <object data={url} type="application/pdf">
              <Container text className="error-hint">
                <Header as="h1" textAlign="center" color="grey">Almost there!</Header>
                <Segment textAlign='center'>
                  <p>You are about to download {this.getReadableType(this.props.match.params)}. To view this document, you need a PDF viewer, e.g. the <a href="https://get.adobe.com/reader/" target="_blank" rel="noopener noreferrer">Adobe Reader</a>.</p>
                  <Button positive size="big" as="a" href={url} >Download Now!</Button>
                </Segment>
              </Container>
            </object>
          </div>
        );
      }
    } else {
      return (
        <div className="main-content welcome">
          <Container text>
            <Header as="h1" textAlign="center" color="grey">Welcome to the Eurofurence Archive!</Header>
            <Segment>
              Our convention reaches back over 20 years in tradition and history already. Take a look at the previous convention websites and feel the spirit of our history for yourself! See what has been, how we grew in size and events. Enjoy the nostalgic feeling in case you have been amongst us already or let you inspire what awaits you, should you decide to join the fun this year!
            </Segment>
            <Grid columns='3'>
              <Grid.Row textAlign="center">
                <Grid.Column>
                  <Card onClick={this.random('daily')}>
                    <Card.Content>
                      <Icon name='newspaper' size='huge' />
                    </Card.Content>
                    <Card.Content>
                      Check out a random Daily Eurofurence Issue
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column>
                  <Card onClick={this.random('conbook')}>
                    <Card.Content>
                      <Icon name='book' size='huge' />
                    </Card.Content>
                    <Card.Content>
                      Check out a random Eurofurence Conbook
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column>
                  <Card onClick={this.random('website')}>
                    <Card.Content>
                      <Icon name='desktop' size='huge' />
                    </Card.Content>
                    <Card.Content>
                      Check out a random Eurofurence Website
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      );
    }
  }
}

export default Content;
