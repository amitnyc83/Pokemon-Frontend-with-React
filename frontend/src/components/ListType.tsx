import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  text-align: center;
  width: 50%;
  height: 25px;
  background-color: transparent;
  padding: auto;
  color: MediumAquaMarine;
  border: 1px solid MediumAquaMarine;
  // &:active {
  //   background-color: MediumAquaMarine;
  //   color: white;
  // }
`;

const active = {
  backgroundColor: 'MediumAquaMarine',
  color: 'white'
};

const Field = styled.div`
  margin: 10px 5px;
`;

const Routes = props => {
  return (
    <Field>
      <Button
        style={props.favsListOpen ? undefined : active}
        onClick={() => props.allTab()}
      >
        All
      </Button>
      <Button
        style={props.favsListOpen ? active : undefined}
        onClick={() => props.favTab()}
      >
        Favorites
      </Button>
    </Field>
  );
};

export default Routes;