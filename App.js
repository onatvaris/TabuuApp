import React, {Component} from 'react';
import {View} from 'react-native';
import Rout from './src/Router';
export default class App extends Component {
  render() {
    return (
      <View style={{flex :1}}>
        <Rout />
      </View>
    );
  }
}
