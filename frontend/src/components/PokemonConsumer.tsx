import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import Pokemon from '../containers/PokemonCardLayout';

export class PokemonConsumer extends Component {
  render() {
    return (
      <ApolloConsumer>{client => <Pokemon client={client} />}</ApolloConsumer>
    );
  }
}

export default PokemonConsumer;