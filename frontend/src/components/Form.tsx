import React from 'react';
import Text from './Inputs/Text';
import Select from './Inputs/Select';
import Button from './Inputs/Button';
import styled from 'styled-components';

const Bar = styled.div`
  display: inline-block;
  background-color: #d3d3d35e;
  height: 25px;
  width: 1px;
  padding: 5px 0;
  position: absolute;
`;

const Form = props => {
  return (
    <div>
      <Text search={props.search} searchHandler={props.searchHandler} />
      <Select types={props.types} select={props.select} />
      <Button isLine={true} changeDisplay={props.changeDisplay} List>
        {props.children}
      </Button>
      <Bar />
      <Button isLine={false} changeDisplay={props.changeDisplay}>
        {props.children}
      </Button>
    </div>
  );
};

export default Form;