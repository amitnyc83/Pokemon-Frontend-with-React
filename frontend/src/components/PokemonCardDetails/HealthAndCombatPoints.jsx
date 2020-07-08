import React from 'react';
import styled from 'styled-components';

const Stat = styled.span`
  position: relative;
  bottom: 10px;
  font-weight: bold;
`;

const HPBar = styled.div`
  display: inline-block;
  width: 564px;
  height: 10px;
  border-radius: 30px;
  margin: 0 10px 10px 10px;
  background-color: green;
`;

const CPBar = styled.div`
  display: inline-block;
  width: 564px;
  height: 10px;
  border-radius: 30px;
  margin: 0 10px 10px 10px;
  background-color: blue;
`;

const HealthAndCombatPoints = props => {
  return (
    <div>
      <div>
        <CPBar />
        <Stat>CP: {props.maxCP}</Stat>
      </div>
      <div>
        <HPBar />
        <Stat>HP: {props.maxHP}</Stat>
      </div>
    </div>
  );
};

export default HealthAndCombatPoints;