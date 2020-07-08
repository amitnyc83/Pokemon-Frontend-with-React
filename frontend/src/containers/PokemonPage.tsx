import React, { Component } from 'react';
import styled from 'styled-components';
import Menu from '../components/Menu';
import PokemonList from '../components/PokemonCardDetails/PokemonList';
import { gql } from 'apollo-boost';

const Content = styled.main`
  width: 100%;
  min-height: 700px;
  background-color: white;
  border: 1px solid #d3d3d35e;
  box-shadow: 1px 1px 5px #d3d3d35e;
`;

const Button = styled.button`
  font-size: 30px;
  background-color: #d3d3d35e;
  width: 60%;
  height: 50px;
  margin-left: 20%;
  border: 1px solid #cecece;
  box-shadow: 1px 1px 5px #d3d3d35e;
  margin-bottom: 20px;
`;

const GET_POKEMONS = gql`
  query($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      edges {
        name
        types
        image
        isFavorite
        id
        classification
        resistant
        weaknesses
      }
    }
  }
`;

const GET_POKEMON_TYPES = gql`
  {
    pokemonTypes
  }
`;

export class PokemonPage extends Component<any, any> {
  state = {
    pokemons: [],
    favs: {},
    offset: 0,
    pending: false,
    limit: 9,
    menu: {
      searchFieldValue: undefined,
      selectFieldValue: undefined,
      isFavorite: false,
      displayStyle: false
    },
    types: []
  } as any;

  componentDidMount() {
    this.fetchPokemons(this.state.menu.isFavorite);
    this.fetchTypes();
  }

  onChangeSearchHandler = ev => {
    const value = ev.target.value;
    const tempMenu = {
      ...this.state.menu,
      searchFieldValue: value
    };

    this.setState(
      {
        offset: 0,
        pokemons: [],
        favs: {},
        menu: tempMenu
      },
      () => {
        this.fetchPokemons(this.state.menu.isFavorite);
      }
    );
  };

  onChangeSelectHandler = ev => {
    const value = ev.target.value;
    const tempMenu = {
      ...this.state.menu,
      selectFieldValue: value
    };

    this.setState(
      {
        menu: tempMenu,
        pokemons: [],
        favs: {},
        offset: 0
      },
      () => {
        this.fetchPokemons(this.state.menu.isFavorite);
      }
    );
  };

  fetchTypes = async () => {
    const { client } = this.props;
    const { data, error, ...rest } = await client.query({
      query: GET_POKEMON_TYPES
    });

    if (error) console.log('error: ', error);
    if (data) {
      this.setState({
        types: data.pokemonTypes
      });
    }
  };

  fetchPokemons = async fav => {
    const { client } = this.props;
    this.setState({
      pending: true
    });

    const { data, error, loading } = await client.query({
      query: GET_POKEMONS,
      variables: {
        query: {
          limit: this.state.limit,
          offset: this.state.offset,
          search: this.state.menu.searchFieldValue,
          filter: {
            type: this.state.menu.selectFieldValue,
            isFavorite: this.state.menu.isFavorite
          }
        }
      },
      fetchPolicy: 'network-only'
    });

    if (error) console.log('error: ', error);
    if (loading) console.log('Loading ...');
    if (data) {
      const prevPokemons = this.state.pokemons;
      const prevFavs = this.state.favs;
      let tempFavs: any = {};
      data.pokemons.edges.map(pokemon => {
        tempFavs[`${pokemon.id}`] = pokemon.isFavorite;
      });

      let tempPokemons: any = [];
      data.pokemons.edges.map(pokemon => {
        if (tempFavs[`${pokemon.id}`] === pokemon.isFavorite) {
          tempPokemons = [...tempPokemons, pokemon];
        }
      });

      fav
        ? this.setState({
            favs: { ...prevFavs, ...tempFavs },
            pokemons: [...prevPokemons, ...tempPokemons],
            offset: this.state.offset + 9,
            pending: false
          })
        : this.setState({
            favs: { ...prevFavs, ...tempFavs },
            pokemons: [...prevPokemons, ...data.pokemons.edges],
            offset: this.state.offset + 9,
            pending: false
          });
    }
  };

  changeFavStat = index => {
    let tempFavs = { ...this.state.favs };
    tempFavs[index] = !tempFavs[index];

    this.setState({ favs: tempFavs });
  };

  onClickAllTabHandler = () => {
    const newState = {
      menu: {
        ...this.state.menu,
        isFavorite: false
      },
      offset: 0,
      pokemons: []
    };
    this.setState(newState, () => {
      this.fetchPokemons(this.state.menu.isFavorite);
    });
  };

  onClickFavoritesTabHandler = () => {
    const newState = {
      menu: {
        ...this.state.menu,
        isFavorite: true
      },
      offset: 0,
      pokemons: []
    };
    this.setState(newState, () => {
      this.fetchPokemons(this.state.menu.isFavorite);
    });
  };

  changeDisplay = style => {
    this.setState({ displayStyle: style });
  };

  render() {
    return (
      <React.Fragment>
        <Menu
          favsListOpen={this.state.menu.isFavorite}
          allTab={this.onClickAllTabHandler}
          favTab={this.onClickFavoritesTabHandler}
          types={this.state.types}
          search={this.state.menu.searchFieldValue}
          searchHandler={this.onChangeSearchHandler}
          select={this.onChangeSelectHandler}
          changeDisplay={this.changeDisplay}
        />
        <Content>
          <PokemonList
            toggleFavStatus={this.changeFavStat}
            favs={this.state.favs}
            favsListOpen={this.state.menu.isFavorite}
            pokemons={this.state.pokemons}
            displayStyle={this.state.displayStyle}
          />
          <Button disabled={this.state.pending} onClick={this.fetchPokemons}>
            Load More...
          </Button>
        </Content>
      </React.Fragment>
    );
  }
}

export default PokemonPage;