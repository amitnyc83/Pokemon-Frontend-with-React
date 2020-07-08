import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import PokemonPageConsumer from '../components/PokemonPageConsumer';
// import { css } from '@emotion/core';
// import ClipLoader from 'react-spinners/ClipLoader';
import { PokemonInfo } from '../containers/PokemonInfo';



const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;



const GET_POKEMONS = gql`
  query($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      edges {
        id
        name
        types
        image
        isFavorite
        weight {
          maximum
          minimum
        }
        height {
          maximum
          minimum
        }
        maxCP
        maxHP
        sound
        evolutions {
          id
        }
      }
    }
  }
`;






export class PageLayout extends Component<any> {
  constructor(props) {
    super(props);
  }

  state = {
    // loading: true,
    pending: false,
    routes: undefined,
    favouritePokemons: {}
  };

  favouritePokemonStatus = index => {
    let tempFavourites = { ...this.state.favouritePokemons };
    tempFavourites[index] = !tempFavourites[index];

    this.setState({ favouritePokemons: tempFavourites });
  };


  componentDidMount() {
    this.fetchDetailComponents();
  };



  fetchDetailComponents = async () => {
    const { client } = this.props;
    const { data, error, ...rest } = await client.query({
      query: GET_POKEMONS,
      variables: {
        query: {
          limit: 151
        }
      } 
    });
    if (error) console.log('error: ', error);
    if (data) {
      const pokemons = data.pokemons.edges;

      const updatedRoutes = pokemons.map(p => {
        let evolutionIds  = p.evolutions.map(x => x.id);

        let tempFavourites: any = {};

        data.pokemons.edges.map(pokemon => {
          tempFavourites[`${pokemon.id}`] = pokemon.isFavourite;
        });
        this.setState({
          favouritePokemons: { ...this.state.favouritePokemons, ...tempFavourites}
        })
        return (
          <Route key={p.id} path={`/${p.name}`} render={props => {
            return (
              <PokemonInfo
              newClient={client}
              id={p.id}
              name={p.name}
              types={p.types}
              image={p.image}
              favouritePokemonStatus={this.favouritePokemonStatus}
              isFavourite={this.state.favouritePokemons[`${p.id}`]}
              maxWeight={p.weight.maximum}
              minWeight={p.weight.minimum}
              maxHeight={p.height.maximum}
              minHeight={p.height.minimum}
              maxCP={p.maxCP}
              maxHP={p.maxHP}
              sound={p.sound}
              evolutions={evolutionIds}
              />
            );
          }}
          />
        );
      });

      this.setState({
        routes: updatedRoutes
      });
    }
  };

  render() {
    return(
      <Router>
        <Container>
          <Route path='/' exact component={PokemonPageConsumer} />
          {this.state.routes}
        </Container>
      </Router>
    );
  }
}


export default PageLayout;