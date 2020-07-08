import React, { Component } from 'react';
import styled from 'styled-components';
import ListType from '../components/ListType';
import Form from '../components/Form';

const Field = styled.div`
  margin: 10px 5px;
`;

const Wrapper = styled.div`
  border: 1px solid #d3d3d35e;
  box-shadow: 1px 1px 5px #d3d3d35e;
`;

export class Menu extends Component<any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <ListType
          favsListOpen={this.props.favsListOpen}
          allTab={this.props.allTab}
          favTab={this.props.favTab}
        />
        <Field>
          <Form
            types={this.props.types}
            search={this.props.search}
            searchHandler={this.props.searchHandler}
            select={this.props.select}
            changeDisplay={this.props.changeDisplay}
          />
        </Field>
      </Wrapper>
    );
  }
}

export default Menu;