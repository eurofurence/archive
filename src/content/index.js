import React, { Component } from 'react';
import {Container, Header, Segment, Grid, Card, Icon, Button, Statistic, List} from 'semantic-ui-react';

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
      const entry = this.props.data.filter(({title}) => title === this.props.match.params.year)[0];
      console.log('entry', entry);
      return (
        <div className="main-content">
          <Container text>
            <Header as="h1" textAlign="center" color="grey">{entry.title}</Header>
            <Header as="h2" textAlign="center">{entry.theme}</Header>

            <Statistic.Group widths="three" style={{marginTop: '2em'}}>
              <Statistic label='Visitors' value='2,271' />
              <Statistic label='Fursuiters' value='814' />
              <Statistic label='Events' value='83' />
            </Statistic.Group>

            <Segment>
              <p>The following resources are available for you to enjoy:</p>
              <List relaxed size='large'>
              <List.Item>
                  <List.Icon name='desktop' />
                  <List.Content>
                    <List.Header as='a'>Website</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='book' />
                  <List.Content>
                    <List.Header as='a'>Conbook</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='newspaper' />
                  <List.Content>
                    <List.Header>Daily Eurofurence</List.Header>
                    <List.List>
                      <List.Item>
                        <List.Content>
                          <List.Header as='a'>Thursday</List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header as='a'>Friday</List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header as='a'>Saturday</List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header as='a'>Sunday</List.Header>
                        </List.Content>
                      </List.Item>
                    </List.List>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='video' />
                  <List.Content>
                    <List.Header>Videos</List.Header>
                    <List.List>
                      <List.Item>
                        <List.Content>
                          <List.Header as='a'>Eurofurence 21 (2015) - Part 1/2</List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header as='a'>Eurofurence 21 (2015) - Part 2/2</List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header as='a'>The Anatomy of a Pawpet Show</List.Header>
                        </List.Content>
                      </List.Item>
                    </List.List>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='photo' />
                  <List.Content>
                    <List.Header>Photos</List.Header>
                    <List.List>
                      <List.Item>
                        <List.Content>
                          <List.Header as='a'>Group Photo</List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header as='a'>Fursuit Photo Gallery</List.Header>
                        </List.Content>
                      </List.Item>
                    </List.List>
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Container>
        </div>
      );
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
