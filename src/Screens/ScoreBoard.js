import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Header, Left, Button, Right, Body, Title, Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
export default class ScoreBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team1: '',
      team2: '',
      skor1: [],
      skor2: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('TeamOne').then(res => {
      console.warn(res);
      this.setState({team1: JSON.parse(res)});
    });
    AsyncStorage.getItem('TeamTwo').then(res => {
      this.setState({team2: JSON.parse(res)});
    });
  }

  render() {
    return (
      <View style={styles.ScoreBoard}>
        <Header transparent>
          <Body>
            <Title>Takım Puanları</Title>
          </Body>
          <Right>
            <Button transparent>
              <Title>Oyuna Devam</Title>
            </Button>
          </Right>
        </Header>
        <View style={styles.tabloContainer}>
          <View style={styles.team1}>
            <Text style={{fontSize: 17}}> {this.state.team1} </Text>
          </View>
          <View style={styles.team2}>
            <Text style={{fontSize: 17}}>{this.state.team2}</Text>
            <View style={styles.scoreContainer}>
              <Text> skor board </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ScoreBoard: {
    flex: 1,
    backgroundColor: '#ffe6b3',
  },
  tabloContainer: {
    flex: 19,
    flexDirection: 'row',
    borderTopWidth: 1,
    marginBottom: 20,
  },
  scoreContainer: {
    flex: 1,
    backgroundColor: 'red',
    marginTop: 10,
  },
  team1: {
    borderRightWidth: 2,
    flex: 1,
    alignItems: 'center',
  },
  team2: {
    borderRightWidth: 2,
    flex: 1,
    alignItems: 'center',
  },
});
