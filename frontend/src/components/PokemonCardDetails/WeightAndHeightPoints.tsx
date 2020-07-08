import React from 'react';
import styled from 'styled-components';

const Cell = styled.div`
  display: inline-block;
  width: 50%;
  border: 1px solid #cecece;
  text-align: center;
  background-color: #d3d3d35e;
`;

const WeightAndHeightPoints = props => {
  return (
    <div>
      <Cell>
        <p>
          <strong>Weight</strong>
        </p>
        <p>
          {props.minWeight} - {props.maxWeight}
        </p>
      </Cell>
      <Cell>
        <p>
          <strong>Height</strong>
        </p>
        <p>
          {props.minHeight} - {props.maxHeight}
        </p>
      </Cell>
    </div>
  );
};

export default WeightAndHeightPoints;