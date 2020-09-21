import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Names: [],
      score: this.props.teamScore,
      sira: this.props.sira,
      trueScore: this.props.trueScore,
      tabuuScore: this.props.tabuuScore,
      ScoreTeamOne: 0,
      ScoreTeamTwo: 0,
    };
  }
  async componentDidMount() {
    if (this.state.sira == 3) {
      try {
        const scoreTeamOne = await AsyncStorage.getItem('scoreTeamOne');
        const scoreTeamTwo = await AsyncStorage.getItem('scoreTeamTwo');
        console.warn(JSON.parse(scoreTeamTwo));
        this.setState({
          ScoreTeamOne: JSON.parse(scoreTeamOne),
          ScoreTeamTwo: JSON.parse(scoreTeamTwo),
        });
        console.warn('object');
      } catch (error) {
        console.warn(error);
      }
    }

    try {
      const scoreTeamOne = await AsyncStorage.getItem('scoreTeamOne');
      const scoreTeamTwo = await AsyncStorage.getItem('scoreTeamTwo');

      if (scoreTeamOne !== null || scoreTeamTwo !== null) {
        this.setState({
          ScoreTeamOne: JSON.parse(scoreTeamOne),
          ScoreTeamTwo: JSON.parse(scoreTeamTwo),
        });
      } else {
        console.warn('ne yazıcağımı bilmiyorum');
      }
    } catch (error) {
      console.error(error);
    }

    await this.getData();
    await this.setScore();
  }
  getData = async () => {
    try {
      const teamone = await AsyncStorage.getItem('TeamOne');
      const teamtwo = await AsyncStorage.getItem('TeamTwo');
      if (teamone !== null && teamtwo !== null) {
        let array = [];
        array.push(JSON.parse(teamone));
        array.push(JSON.parse(teamtwo));
        this.setState({Names: array});
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };

  roam = async () => {
    if (this.state.sira === 1) {
      await this.setState({sira: 0});
      Actions.team1({sira: this.state.sira, takımB: this.state.Names[1]});
    } else {
      await this.setState({sira: 1});
      Actions.team1({sira: this.state.sira, takımA: this.state.Names[0]});
    }
  };

  setScore = async () => {
    try {
      const scoreTeamOne = await AsyncStorage.getItem('scoreTeamOne');
      const scoreTeamTwo = await AsyncStorage.getItem('scoreTeamTwo');

      if (scoreTeamOne !== null && scoreTeamTwo !== null) {
        //eğer buraya geçersek bu demek oluyor ki ilk tur oynandı
        if (this.state.sira === 1) {
          // ilk takımın verileri gelir
          let plus = this.state.score + JSON.parse(scoreTeamOne);
          this.setState({
            ScoreTeamOne: plus,
          });
          await AsyncStorage.setItem(
            'scoreTeamOne',
            JSON.stringify(this.state.ScoreTeamOne),
          );
        } else {
          //ikinci takımın verileri gelir ve güncellenir
          let plus2 = this.state.score + JSON.parse(scoreTeamTwo);
          this.setState({
            ScoreTeamTwo: plus2,
          });
          await AsyncStorage.setItem(
            'scoreTeamTwo',
            JSON.stringify(this.state.ScoreTeamTwo),
          );
        }
      } else {
        if (this.state.sira === 1) {
          // sira 1 ise ilk takımın verileri gelir
          this.setState({
            ScoreTeamOne: this.state.score,
          });
          await AsyncStorage.setItem(
            'scoreTeamOne',
            JSON.stringify(this.state.ScoreTeamOne),
          );
        } else {
          // eğer sira 1 değil ise gelen veriler ikinci takıma aittir
          this.setState({
            ScoreTeamTwo: this.state.score,
          });
          await AsyncStorage.setItem(
            'scoreTeamTwo',
            JSON.stringify(this.state.ScoreTeamTwo),
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.containerMain}>
        <Header transparent>
          <Left></Left>
          <Body>
            <Title style={{color: 'black'}}> Takım Puanları</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.roam()}>
              <Text style={{fontSize: 16}}>Oyuna Devam</Text>
            </Button>
          </Right>
        </Header>
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              borderBottomWidth: 2,
              paddingBottom: 10,
            }}>
            <Text> Takım Puanları </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}>
            <Text> {this.state.Names[0]} </Text>
            <Text> {this.state.Names[1]} </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 7,
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}>
            <Text> {this.state.ScoreTeamOne} </Text>
            <Text> {this.state.ScoreTeamTwo} </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              alignItems: 'center',
              marginTop: 17,
              paddingBottom: 10,
            }}>
            <Text>Sonuçlarınız</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 15,
              borderBottomWidth: 1,
              paddingBottom: 7,
            }}>
            <Text>Doğru sayınız : {this.state.trueScore} </Text>
            <Text>Tabuu sayınız : {this.state.tabuuScore} </Text>
            <Text>Puanınız : {this.state.score} </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#ffe6b3',
  },
});
