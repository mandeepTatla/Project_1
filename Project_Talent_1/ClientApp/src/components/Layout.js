import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Nav_Menu from './Nav_Menu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Nav_Menu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
