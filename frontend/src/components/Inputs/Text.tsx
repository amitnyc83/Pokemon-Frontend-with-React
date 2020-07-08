import React from 'react';
import styled from 'styled-components';

const TextInput = styled.input.attrs({
  type: 'text'
})`
    border-radius: 3px;
    display: inline-block;
    margin-right: 5px;
    padding: 5px;
    width: 400px;
    background-color: #d3d3d35e;
    border: 1px solid transparent;
  }
`;

const Text = props => {
  return (
    <TextInput
      type='text'
      placeholder='Search'
      value={props.search}
      onChange={props.searchHandler}
    />
  );
};

export default Text;