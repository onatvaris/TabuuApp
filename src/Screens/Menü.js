import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class Menü extends Component {
  async componentDidMount() {
    const time = await AsyncStorage.getItem('sureKey');
    const rust = await AsyncStorage.getItem('pasKey');
    const tab = await AsyncStorage.getItem('tabuuKey');

    try {
      if (time === null) {
        AsyncStorage.setItem('sureKey', JSON.stringify(30))
      }
      if (rust === null) {
        AsyncStorage.setItem('pasKey', JSON.stringify(0))
      }
      if (tab === null) {
        AsyncStorage.setItem('tabuuKey', JSON.stringify(0))
      }
    } catch (error) {
      console.error(error);
    }

    console.warn('time ' + time + 'rust ' + rust + 'tab ' + tab);
  }

  render() {
    return (
      <View style={styles.menüContainer}>
        <ImageBackground
          source={require('./images/Logo.png')}
          style={{flex: 0.6}}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Actions.start()}>
            <Text style={{padding: 15}}>Oyuna Başla </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Actions.ayarlar()}>
            <Text style={{padding: 15}}>Ayarlar </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={{padding: 15}}>Kelime Ekle </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={{padding: 15}}>Yardım</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menüContainer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 10,
  },
  button: {
    backgroundColor: '#ffe6b3',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
});
