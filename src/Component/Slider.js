import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert, Slider} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
//import Slider from '@react-native-community/slider';

export default class Slid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sure: 30,
      pas: 0,
      tabuu: 0,
      puan: 25,
    };
  }

  async componentDidMount() {
    try {
      const time = await AsyncStorage.getItem('sureKey');
      const rust = await AsyncStorage.getItem('pasKey');
      const tab = await AsyncStorage.getItem('tabuuKey');
      const skore = await AsyncStorage.getItem('puanKey');
      if (time !== null) {
        this.setState({sure: JSON.parse(time)});
      }
      if (rust !== null) {
        this.setState({pas: JSON.parse(rust)});
      }
      if (tab !== null) {
        this.setState({tabuu: JSON.parse(tab)});
      }
      if (skore !== null) {
        this.setState({puan: JSON.parse(skore)});
      }
    } catch (e) {
      console.warn(e);
    }
  }

  save = async () => {
    try {
      await AsyncStorage.setItem('sureKey', JSON.stringify(this.state.sure));
      await AsyncStorage.setItem('pasKey', JSON.stringify(this.state.pas));
      await AsyncStorage.setItem('tabuuKey', JSON.stringify(this.state.tabuu));
      await AsyncStorage.setItem('puanKey', JSON.stringify(this.state.puan));
      Alert.alert("Ayarlar Güncellendi")
    } catch (e) {
      console.warn(e);
    }
    Actions.main();
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <View style={styles.sliderContainer}>
          <View style={styles.slider}>
            <Text>Süre : {this.state.sure}</Text>
            <Slider
              style={{marginLeft: 15, marginRight: 15}}
              value={this.state.sure}
              onValueChange={sure => {
                this.setState({sure: sure});
              }}
              step={30}
              maximumValue={180}
              minimumValue={30}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#e67300"
            />
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <View style={styles.slider}>
            <Text>Pas Hakkı : {this.state.pas}</Text>
            <Slider
              style={{marginLeft: 15, marginRight: 15}}
              value={this.state.pas}
              onValueChange={pas => this.setState({pas})}
              step={1}
              maximumValue={5}
              minimumValue={0}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#e67300"
            />
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <View style={styles.slider}>
            <Text>Tabuu : {this.state.tabuu}</Text>
            <Slider
              style={{marginLeft: 15, marginRight: 15}}
              value={this.state.tabuu}
              onValueChange={tabuu => this.setState({tabuu})}
              step={1}
              maximumValue={3}
              minimumValue={0}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#e67300"
            />
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <View style={styles.slider}>
            <Text>Puan : {this.state.puan}</Text>
            <Slider
              style={{marginLeft: 15, marginRight: 15}}
              value={this.state.puan}
              onValueChange={puan => this.setState({puan})}
              step={25}
              maximumValue={250}
              minimumValue={25}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#e67300"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.kayit} onPress={() => this.save()}>
          <Text style={styles.textButton}>Ayarları Kaydet</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    backgroundColor: '#ffc266',
    borderRadius: 15,
    margin: 10,
  },
  slider: {
    margin: 10,
  },
  kayit: {
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#ffc266',
    margin: 10,
  },
  textButton: {
    padding: 20,
    fontSize: 17,
  },
});
