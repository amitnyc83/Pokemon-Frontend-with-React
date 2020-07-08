import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import PageLayout from '../containers/PageLayout';

export class PageLayoutConsumer extends Component {
  render() {
    return (
      <ApolloConsumer>{client => <PageLayout client={client} />}</ApolloConsumer>
    );
  }
}

export default PageLayoutConsumer;