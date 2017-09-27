import React, { Component } from 'react';
import {Container, Header, Segment, Statistic, List, Message, Menu} from 'semantic-ui-react';
import YearEntry from './contentSelection/YearEntry';

import './mobile.css';

class MobileView extends Component {
  render() {
    const hasYear = !!this.props.match.params.year;
    const entry = hasYear ? this.props.data.filter(({title}) => title.split(' ')[1] === this.props.match.params.year)[0] : [];
    return (
      <div>
      <Header inverted as='h1' textAlign='center' className="mobile-header">
        Eurofurence Archive
      </Header>
      <div className="mobile-content">
      {
        this.props.match.params.year && (
          <div className="mobile-main-content">
          <Container>
            <Header as="h1" textAlign="center" color="grey">{entry.title}</Header>
            <Header as="h2" textAlign="center">{entry.theme}</Header>

            {entry.statistics && !!entry.statistics.length && (
              <Statistic.Group widths={entry.statistics.length} style={{marginTop: '2em'}}>
                {entry.statistics.map(({title, number}) => <Statistic key={title} label={title} value={number} />)}
              </Statistic.Group>
            )}

            <Segment>
              <Message warning 
                icon='warning'
                header='Large Files'
                content='The following links contain big PDF and video files! Please mind your data plan and storage capacity!'
              />
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
          <p style={{margin: '1em'}}>Also check out the other years:</p>
        </div>
        )
      }
      {
        !this.props.match.params.year &&
        <p style={{margin: '1em'}}>Please select a year:</p>
      }
      </div>
      <Menu vertical className="mobile-year-selection">
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
      </div>
    );
  }
}

export default MobileView;
