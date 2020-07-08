import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import PokemonPage from '../containers/PokemonPage';

export class PokemonPageRoute extends Component {
  render() {
    return (
      <ApolloConsumer>{client => <PokemonPage client={client} />}</ApolloConsumer>
    );
  }
}

export default PokemonPageRoute;