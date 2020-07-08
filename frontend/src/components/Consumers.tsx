import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import PokemonsContainer from '../containers/PokemonsContainer';

export class LayoutConsumer extends Component {
  render() {
    return (
      <ApolloConsumer>{client => <PokemonsContainer client={client} />}</ApolloConsumer>
    );
  }
}

export default LayoutConsumer;