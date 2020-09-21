import React, {Component} from 'react';
import Slider from '../Component/Slider';
import {View, StyleSheet, ImageBackground,AsyncStorage} from 'react-native';
import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class Ayarlar extends Component {



  render() {
    return (
      <View style={styles.Container}>
        <Header transparent>
          <Left>
            <Button transparent onPress={() => Actions.main()}>
              <Icon name="arrow-back" style={{color:'#e67300'}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'black'}}>Ayarlar</Title>
          </Body>
          <Right/>
        </Header>
        <ImageBackground
          source={require('./images/Logo2.png')}
          style={styles.logo}
        />
        <View style={styles.contentContainer}>
          <Slider this={this} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#ffe6b3',
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 1,
  },
  logo: {
    flex: 0.5,
  },
});
