import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

const {width} = Dimensions.get('window');

export default class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      takım1: '1. Takım',
      takım2: '2. Takım',
    };
  }



  setItem = async () => {
    try {
      const scoreTeamOne = AsyncStorage.getItem('scoreTeamOne') 
      const scoreTeamTwo = AsyncStorage.getItem('scoreTeamTwo') 

      if (scoreTeamOne !== null && scoreTeamTwo !== null) {
        AsyncStorage.removeItem('scoreTeamTwo')
        AsyncStorage.removeItem('scoreTeamOne')
      } else {
        console.warn("zaten kayıtlı score yok. Devam")
      }
    } catch (error) {
      console.error(error);
    }

    Actions.team1({
      takımA: this.state.takım1,
      takımB: this.state.takım2,
      sira: 1,
    });
    
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('./images/Logo2.png')}
          style={styles.logo}
        />
        <View style={styles.middle}>
          <View style={styles.takım1}>
            <TextInput
              placeholder={this.state.takım1}
              placeholderTextColor="black"
              onChangeText={text => this.setState({takım1: text})}
              value={this.state.takım1}
            />
          </View>
          <View style={styles.takım2}>
            <TextInput
              placeholder={this.state.takım2}
              placeholderTextColor="black"
              value={this.state.takım2}
              onChangeText={text => this.setState({takım2: text})}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => this.setItem()}>
            <Text>Oyuna Başla</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6b3',
  },
  logo: {
    flex: 0.5,
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
  },
  takım1: {
    marginBottom: 15,
    marginLeft: ([width] * 35) / 100,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#e64d00',
    borderRadius: 5,
  },
  takım2: {
    marginBottom: 15,
    marginRight: ([width] * 35) / 100,
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#e67300',
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: '#ff5c33',
    padding: 15,
    borderRadius: 5,
  },
});
