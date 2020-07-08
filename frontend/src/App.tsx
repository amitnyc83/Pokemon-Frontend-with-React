import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import PageLayoutConsumer from './components/PageLayoutConsumer';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

export class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <PageLayoutConsumer />
      </ApolloProvider>
    );
  }
}

export default App;