import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FavoritePokemons from '../components/FavouritePokemons';

const Details = styled.div`
  display: inline-block;
  background-color: #d3d3d35e;
  height: 67px;
  width: 90%;
  position: relative;
  top: -14px;
`;

const ImgContainer = styled.div`
  display: inline-block;
  background-color: white;
  height: 63px;
  width: 10%;
`;

const Name = styled.p`
  width: 150px;
  margin: 10px 0 0 10px;
  font-size: 15px;
  font-weight: bold;
`;

const Type = styled.span`
  font-size: 15px;
  margin: 10px 0 0 10px;
`;

const HeartContainer = styled.div`
  height: 0;
`;

const Wrapper = styled.div`
  padding: 2px 0 2px 2px;
  display: block;
  height: 70px;
  width: 660px;
  margin-bottom: 10px;
  border: 1px solid #cecece;
  text-decoration: none;
`;

const imgStyle = {
  width: '90%',
  height: '90%',
  marginLeft: '5%',
  marginTop: '5%'
};

const linkStyle = {
  textDecoration: 'none',
  color: 'black'
};

export class PokemonLineListed extends Component<any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, name, types, id, isFavorite } = this.props;
    const typesWithCommas = types.map((t, el) => {
      return (
        <Type key={el}>
          {t}
          {el === types.length - 1 ? '' : ','}
        </Type>
      );
    });
    return (
      <Wrapper>
        <ImgContainer>
          <Link key={id} to={'/' + name}>
            <img src={image} alt='pokemonImage' style={imgStyle} />
          </Link>
        </ImgContainer>
        <Details>
          <Link style={linkStyle} key={id} to={'/' + name}>
            <Name>{name}</Name>
          </Link>
          <HeartContainer>
            <FavoritePokemons
              toggleFavStatus={this.props.toggleFavStatus}
              isFavorite={isFavorite}
              isListedPokemon={this.props.isListedPokemon}
              id={id}
              name={name}
            />
          </HeartContainer>
          {typesWithCommas}
        </Details>
      </Wrapper>
    );
  }
}

export default PokemonLineListed;