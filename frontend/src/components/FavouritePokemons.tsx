import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Heart as EmptyHeart } from 'styled-icons/boxicons-regular';
import { Heart as WholeHeart } from 'styled-icons/boxicons-solid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

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
  top: -14px;
  ${props => (props.isDetailPage ? 'top: -24px;' : null)};
  ${props => (props.isListedPokemon ? 'top: -11px' : null)};
  left: ${props => (props.isListedPokemon ? '540px' : '170px')};
  height: 25px;
`;

const Love = styled(WholeHeart)`
  color: red;
  position: relative;
  top: -14px;
  ${props => (props.isDetailPage ? 'top: -24px;' : null)};
  ${props => (props.isListedPokemon ? 'top: -11px' : null)};
  left: ${props => (props.isListedPokemon ? '540px' : '170px')};
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

const FavouritePokemons = props => {
  return (
    <div>
      <Mutation
        mutation={
          props.isFavorite === false ? FAVORITE_POKEMON : UNFAVORITE_POKEMON
        }
      >
        {!props.isFavorite
          ? (favoritePokemon, { data }) => (
              <Like
                onClick={async ev => {
                  ev.preventDefault();
                  await favoritePokemon({
                    variables: {
                      mutation: props.id
                    }
                  })
                    .then(() => {
                      props.toggleFavStatus(props.id);
                      toast(`${props.name} liked!`);
                    })
                    .catch(err => {
                      console.log(err);
                      toast('Wow so hard !');
                    });
                }}
              >
                {props.isFavorite ? (
                  <Love
                    isDetailPage={props.isDetailPage}
                    isListedPokemon={props.isListedPokemon}
                  />
                ) : (
                  <Nope
                    isDetailPage={props.isDetailPage}
                    isListedPokemon={props.isListedPokemon}
                  />
                )}
              </Like>
            )
          : (unFavoritePokemon, { data }) => (
              <Like
                onClick={async ev => {
                  ev.preventDefault();
                  await unFavoritePokemon({
                    variables: {
                      mutation: props.id
                    }
                  })
                    .then(() => {
                      props.toggleFavStatus(props.id);
                      toast(`${props.name} disliked!`);
                    })
                    .catch(err => {
                      console.log(err);
                      toast('Wow so hard !');
                    });
                }}
              >
                {props.isFavorite ? (
                  <Love
                    isDetailPage={props.isDetailPage}
                    isListedPokemon={props.isListedPokemon}
                  />
                ) : (
                  <Nope
                    isDetailPage={props.isDetailPage}
                    isListedPokemon={props.isListedPokemon}
                  />
                )}
              </Like>
            )}
      </Mutation>
    </div>
  );
};

export default FavouritePokemons;