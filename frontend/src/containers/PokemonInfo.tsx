import React, { Component } from 'react';
import styled from 'styled-components';
import { Heart as EmptyHeart } from 'styled-icons/boxicons-regular';
import { Heart as WholeHeart } from 'styled-icons/boxicons-solid';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import ReactPlayer from 'react-player';
import PokemonCardLayout from './PokemonCardLayout';
import Image from '../components/PokemonCardDetails/Image';
import HealthAndCombatPoints from '../components/PokemonCardDetails/HealthAndCombatPoints';
import WeightAndHeightPoints from '../components/PokemonCardDetails/WeightAndHeightPoints';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.div`
  display: block;
  height: 600px;
  width: 666px;
  border: 1px solid #cecece;
`;

const Details = styled.div`
  background-color: #d3d3d35e;
  height: 105px;
`;

const Name = styled.p`
  width: 150px;
  padding: 10px 0 0 10px;
  margin: 0;
  font-size: 15px;
  font-weight: bold;
`;

const Type = styled.span`
  margin: 0 0 0 10px;
  font-size: 10px;
  font-weight: bold;
  position: relative;
  bottom: 7px;
`;

const HeartContainer = styled.div`
  height: 0;
`;

const Like = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  height: 15px;
`;

const Nope = styled(EmptyHeart)`
  color: red;
  position: relative;
  top: -18px;
  left: 616px;
  height: 25px;
`;

const Love = styled(WholeHeart)`
  color: red;
  position: relative;
  top: -18px;
  left: 616px;
  height: 25px;
`;

const FAVORITE_POKEMON = gql`
  mutation($mutation: ID!) {
    favoritePokemon(id: $mutation) {
      name
      isFavorite
    }
  }
`;

const UNFAVORITE_POKEMON = gql`
  mutation($mutation: ID!) {
    unFavoritePokemon(id: $mutation) {
      name
      isFavorite
    }
  }
`;

const GET_EVOLUTION = gql`
  query($id: ID!) {
    pokemonById(id: $id) {
      name
      image
      isFavorite
      resistant
      weaknesses
      classification
    }
  }
`;

export class PokemonInfo extends Component<any> {
  constructor(props) {
    super(props);
  }

  state = {
    isFavorite: this.props.isFavorite,
    playing: false,
    evolutions: []
  };

  componentDidMount() {
    this.setState({
      isFavorite: this.props.isFavorite
    });
  }

  onPlay = () => {
    this.setState({ playing: true });
  };
  onEnded = () => {
    this.setState({ playing: false });
  };

  playPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  changeFavStat = () => {
    this.setState({ isFavorite: !this.state.isFavorite });
  };

  render() {
    const {
      name,
      types,
      image,
      maxWeight,
      minWeight,
      maxHeight,
      minHeight,
      maxCP,
      maxHP,
      sound,
      evolutions
    } = this.props;

    const evos = evolutions.map(id => (
      <Query key={id} query={GET_EVOLUTION} variables={{ id: `${id}` }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          if (data) {
            const pokemon = data.pokemonById;

            return (
              <PokemonCardLayout
                id={id}
                isDetailPage={true}
                name={pokemon.name}
                isFavorite={pokemon.isFavorite}
                image={pokemon.image}
                favouritePokemon={this.changeFavStat}
                classification={pokemon.classification}
                weaknesses={pokemon.weaknesses}
                resistant={pokemon.resistant}
              />
            );
          }
        }}
      </Query>
    ));

    const tipuri = types.map((t, el) => {
      return (
        <Type key={el}>
          {t}
          {el === types.length - 1 ? '' : ','}
        </Type>
      );
    });

    return (
      <Wrapper>
        <Image image={image} playPause={this.playPause} />
        <Details>
          <Name>{name}</Name>

          <HeartContainer>
            <Mutation
              mutation={
                this.props.isFavorite === false
                  ? FAVORITE_POKEMON
                  : UNFAVORITE_POKEMON
              }
            >
              {!this.props.isFavorite
                ? (favoritePokemon, { data }) => (
                    <Like
                      onClick={async ev => {
                        ev.preventDefault();
                        await favoritePokemon({
                          variables: {
                            mutation: this.props.id
                          }
                        })
                          .then(() => {
                            this.props.toggleFavStatus(this.props.id);
                            toast(`${name} liked!`);
                          })
                          .catch(err => {
                            console.log(err);
                            toast('Error !');
                          });
                      }}
                    >
                      {this.props.isFavorite ? <Love /> : <Nope />}
                    </Like>
                  )
                : (unFavoritePokemon, { data }) => (
                    <Like
                      onClick={async ev => {
                        ev.preventDefault();
                        await unFavoritePokemon({
                          variables: {
                            mutation: this.props.id
                          }
                        })
                          .then(() => {
                            this.props.toggleFavStatus(this.props.id);
                            toast(`${name} disliked!`);
                          })
                          .catch(err => {
                            console.log(err);
                            toast('Error !');
                          });
                      }}
                    >
                      {this.props.isFavorite ? <Love /> : <Nope />}
                    </Like>
                  )}
            </Mutation>
          </HeartContainer>

          {tipuri}

          <HealthAndCombatPoints maxCP={maxCP} maxHP={maxHP} />
        </Details>

        <WeightAndHeightPoints
          minWeight={minWeight}
          maxWeight={maxWeight}
          minHeight={minHeight}
          maxHeight={maxHeight}
        />

        <ReactPlayer
          style={{ display: 'none' }}
          onPlay={this.onPlay}
          onEnded={this.onEnded}
          playing={this.state.playing}
          url={sound}
          config={{
            file: {
              forceAudio: true
            }
          }}
        />

        {!!evolutions.length && <h4>Evolutions</h4>}
        {!!evolutions.length && evos}
      </Wrapper>
    );
  }
}

export default PokemonInfo;