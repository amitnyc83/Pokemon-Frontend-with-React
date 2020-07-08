import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  border: 0px solid transparent;
  color: MediumAquaMarine;
  background-color: transparent;
  width: 25px;
  height: 25px;
`;

const Button = props => {
  return (
    <Btn
      onClick={() => props.changeDisplay(props.isLine)}
      style={{ border: '0px solid transparent' }}
      className={props.List ? 'fas fa-bars' : 'fas fa-grip-horizontal'}
    >
      <i className={props.classes} style={{ color: 'MediumAquaMarine' }} />
    </Btn>
  );
};

export default Button;