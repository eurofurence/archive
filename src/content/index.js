import React, { Component } from 'react';
import {Container, Header, Segment, Statistic, List} from 'semantic-ui-react';

import "./Content.css";

class Content extends Component {
  render() {
    if(this.props.data && this.props.match.params.year) {
      const entry = this.props.data.filter(({title}) => title.split(' ')[1] === this.props.match.params.year)[0];
      return (
        <div className="main-content">
          <Container text>
            <Header as="h1" textAlign="center" color="grey">{entry.title}</Header>
            <Header as="h2" textAlign="center">{entry.theme}</Header>

            {entry.statistics && !!entry.statistics.length && (
              <Statistic.Group widths={entry.statistics.length} style={{marginTop: '2em'}}>
                {entry.statistics.map(({title, number}) => <Statistic key={title} label={title} value={number} />)}
              </Statistic.Group>
            )}

            <Segment>
              <p>The following resources are available for you to enjoy:</p>
              <List relaxed size='large'>
                {entry.website && (
                  <List.Item>
                    <List.Icon name='desktop' />
                    <List.Content>
                      <List.Header as='a' href={entry.website}>Website</List.Header>
                    </List.Content>
                  </List.Item>
                )}
                {entry.conbook && (
                  <List.Item>
                    <List.Icon name='book' />
                    <List.Content>
                      <List.Header as='a' href={entry.conbook}>Conbook</List.Header>
                    </List.Content>
                  </List.Item>
                )}
                {entry.daily && !!entry.daily.length && (
                  <List.Item>
                    <List.Icon name='newspaper' />
                    <List.Content>
                      <List.Header>Daily Eurofurence</List.Header>
                      <List.List>
                        {entry.daily.map(({title, url}) => {
                          return (
                            <List.Item key={title}>
                              <List.Content>
                                <List.Header as='a' href={url}>{title}</List.Header>
                              </List.Content>
                            </List.Item>
                          );
                        })}
                      </List.List>
                    </List.Content>
                  </List.Item>
                )}
                {entry.videos && !!entry.videos.length && (
                  <List.Item>
                    <List.Icon name='video' />
                    <List.Content>
                      <List.Header>Videos</List.Header>
                      <List.List>
                        {entry.videos.map(({title, url}) => {
                          return (
                            <List.Item key={title}>
                              <List.Content>
                                <List.Header as='a' href={url}>{title}</List.Header>
                              </List.Content>
                            </List.Item>
                          );
                        })}
                      </List.List>
                    </List.Content>
                  </List.Item>
                )}
                {entry.photos && !!entry.photos.length && (
                  <List.Item>
                    <List.Icon name='photo' />
                    <List.Content>
                      <List.Header>Photos</List.Header>
                      <List.List>
                        {entry.photos.map(({title, url}) => {
                          return (
                            <List.Item key={title}>
                              <List.Content>
                                <List.Header as='a' href={url}>{title}</List.Header>
                              </List.Content>
                            </List.Item>
                          );
                        })}
                      </List.List>
                    </List.Content>
                  </List.Item>
                )}
                {entry.misc && !!entry.misc.length && (
                  <List.Item>
                    <List.Icon name='external' />
                    <List.Content>
                      <List.Header>Other</List.Header>
                      <List.List>
                        {entry.misc.map(({title, url}) => {
                          return (
                            <List.Item key={title}>
                              <List.Content>
                                <List.Header as='a' href={url}>{title}</List.Header>
                              </List.Content>
                            </List.Item>
                          );
                        })}
                      </List.List>
                    </List.Content>
                  </List.Item>
                )}
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
          </Container>
        </div>
      );
    }
  }
}

export default Content;
