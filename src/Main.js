import React, {Component} from 'react';
import Menü from './Screens/Menü';
import {Container, Header, Title, Body, Left, Right} from 'native-base';
export default class Main extends Component {

  render() {
    return (
      <Container style={{backgroundColor: '#ffc266'}}>
        <Header transparent>
          <Left />
          <Body>
            <Title style={{color: 'black'}}>Menü</Title>
          </Body>
          <Right />
        </Header>
        <Menü />
      </Container>
    );
  }
}
