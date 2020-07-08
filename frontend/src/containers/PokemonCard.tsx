import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FavoritePokemons from '../components/FavouritePokemons';
import Modal from 'react-awesome-modal';
import { More } from 'styled-icons/material';

const ImgContainer = styled.div`
  background-color: white;
  height: 200px;
  width: 100%;
`;

const Name = styled.p`
  width: 100px;
  padding: 10px 0 0 10px;
  margin: 0;
  font-size: 15px;
  font-weight: bold;
`;

const Type = styled.span`
  margin: 0 0 0 10px;
  font-size: 15px;
`;

const HeartContainer = styled.div`
  height: 0;
`;

const Title = styled.h1`
  text-align: center;
`;

const Wrap = styled.div`
  width: 300px;
  height: 300px;
  margin: 10px auto 10px auto;
`;

const Half = styled.ul`
  width: 130px;
  margin: 0 3% 10px 3%;
  display: inline-block;
`;

const Spec = styled.h4`
  width: 130px;
  margin: 0 3% 10px 3%;
  display: inline-block;
`;
const Many = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  height: 15px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  left: 463px;
  background-color: transparent;
  border: 1px solid transparent;
  height: 40px;
  width: 40px;
  outline: none;
`;

const imgStyle = {
  width: '80%',
  height: '80%',
  marginLeft: '10%',
  marginTop: '10%'
};

const linkStyle = {
  textDecoration: 'none',
  color: 'black'
};

const Mor = styled(More)`
  color: blue;
  height: 15px;
  ${props =>
    props.isDetailPage
      ? 'position: relative; left: 70px; bottom: 21.8px;'
      : null}
`;

const Wrapper = styled.div`
  display: inline-block;
  height: ${props => (props.isDetailPage ? '240px' : '260px')};
  width: 213px;
  margin-bottom: 10px;
  ${props => (props.isDetailPage ? 'margin-right: 10px;' : null)}
  border: 1px solid #cecece;
`;

const Details = styled.div`
  background-color: #d3d3d35e;
  height: ${props => (props.isDetailPage ? '40px' : '60px')};
`;

export class PokemonCard extends Component<any> {
  constructor(props) {
    super(props);
  }

  state = {
    visible: false
  };

  openModal = () => {
    this.setState({
      visible: true
    });
  };

  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {
      image,
      name,
      types,
      id,
      isDetailPage,
      isFavorite,
      classification,
      resistant,
      weaknesses
    } = this.props;

    const typesWithCommas = isDetailPage
      ? undefined
      : types.map((t, el) => {
          return (
            <Type key={el}>
              {t}
              {el === types.length - 1 ? '' : ','}
            </Type>
          );
        });

    const updatedWeaknesses = weaknesses.map(weak => (
      <li key={weak}>{weak}</li>
    ));
    const updatedResistant = resistant.map(rez => <li key={rez}>{rez}</li>);

    return (
      <Wrapper isDetailPage={isDetailPage}>
        <ImgContainer>
          <Link key={id} to={'/' + name}>
            <img src={image} alt='pokemonImage' style={imgStyle} />
          </Link>
        </ImgContainer>
        <Details isDetailPage={isDetailPage}>
          <Link style={linkStyle} key={id} to={'/' + name}>
            <Name>{name}</Name>
          </Link>
          <HeartContainer>
            <FavoritePokemons
              name={name}
              toggleFavStatus={this.props.toggleFavStatus}
              isFavorite={isFavorite}
              isDetailPage={isDetailPage}
              isListedPokemon={this.props.isListedPokemon}
              id={id}
            />
          </HeartContainer>
          {typesWithCommas}
          <Type>
            <Many>
              <Mor isDetailPage={isDetailPage} onClick={this.openModal} />
            </Many>
          </Type>
        </Details>
        <Modal
          visible={this.state.visible}
          width='500'
          height='400'
          effect='fadeInUp'
          onClickAway={() => this.closeModal()}
        >
          <div>
            <Title>{name}</Title>
            <Wrap>
              <p>Classification: {classification}</p>
              <CloseBtn onClick={() => this.closeModal()}>X</CloseBtn>
              <Spec>Resistant</Spec>
              <Spec>Weaknesses</Spec>
              <Half>{updatedResistant}</Half>
              <Half>{updatedWeaknesses}</Half>
            </Wrap>
          </div>
        </Modal>
      </Wrapper>
    );
  }
}

export default PokemonCard;