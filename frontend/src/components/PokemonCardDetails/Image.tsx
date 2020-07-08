import React from 'react';
import styled from 'styled-components';
import { VolumeUp as Sound } from 'styled-icons/material';

const PokemonSound = styled(Sound)`
  color: MediumAquaMarine;
  height: 50px;
`;

const ImgContainer = styled.div`
  background-color: white;
  height: 400px;
  width: 100%;
`;

const Btn = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  outline: transparent;
  position: relative;
  right: 530px;
  bottom: 5px;
`;

const imgStyle = {
  width: '60%',
  height: '90%',
  marginLeft: '20%',
  marginTop: '3%'
};

const Image = props => {
  return (
    <div>
      <ImgContainer>
        <img src={props.image} alt='pokemonImage' style={imgStyle} />
        <Btn
          onClick={() => {
            props.playPause();
          }}
        >
          <PokemonSound />
        </Btn>
      </ImgContainer>
    </div>
  );
};

export default Image;