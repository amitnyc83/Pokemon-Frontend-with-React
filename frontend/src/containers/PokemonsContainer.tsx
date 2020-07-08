import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {} from 'react-apollo';
import PokemonPageConsumer from '../components/PageLayoutConsumer';
import gql from 'graphql-tag';
import { PokemonInfo } from './PokemonInfo';

const wrapper = {
  width: '700px',
  padding: '10px',
  margin: 'auto'
};

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

export class PokemonsContainer extends Component<any> {
  constructor(props) {
    super(props);
  }

  state = {
    pending: false,
    routes: undefined,
    favs: {}
  };

  toggleFavStatus = index => {
    let tempFavs = { ...this.state.favs };
    tempFavs[index] = !tempFavs[index];

    this.setState({ favs: tempFavs });
  };

  componentDidMount() {
    this.fetchDetailsComponents();
  }

  fetchDetailsComponents = async () => {
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
        let evoIds = p.evolutions.map(n => n.id);

        let tempFavs: any = {};
        data.pokemons.edges.map(pokemon => {
          tempFavs[`${pokemon.id}`] = pokemon.isFavorite;
        });
        this.setState({
          favs: { ...this.state.favs, ...tempFavs }
        });
        return (
          <Route
            key={p.id}
            path={`/${p.name}`}
            render={props => {
              return (
                <PokemonInfo
                  toggleFavStatus={this.toggleFavStatus}
                  newClient={client}
                  id={p.id}
                  name={p.name}
                  types={p.types}
                  image={p.image}
                  isFavorite={this.state.favs[`${p.id}`]}
                  maxWeight={p.weight.maximum}
                  minWeight={p.weight.minimum}
                  maxHeight={p.height.maximum}
                  minHeight={p.height.minimum}
                  maxCP={p.maxCP}
                  maxHP={p.maxHP}
                  sound={p.sound}
                  evolutions={evoIds}
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
    return (
      <Router>
        <div style={wrapper}>
          <Route path='/' exact component={PokemonPageConsumer} />
          {this.state.routes}
        </div>
      </Router>
    );
  }
}

export default PokemonsContainer;