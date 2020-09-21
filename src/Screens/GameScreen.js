import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
  Badge,
  Icon,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import Data from '../data.json';
const {height} = Dimensions.get('window');

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      puan1: 0,
      pasHak: 0,
      tabu: 0,
      myInterval: null,
      pickerDisplayed: false,
      trueScore: 0,
      tabuuScore: 0,
      sira: this.props.sira,
      teamName: '',
      Words: [],
      Yasak: [],
    };
  }

  async componentDidMount() {
    await AsyncStorage.getItem('sureKey').then(res => {
      this.setState({time: JSON.parse(res)});
    });
    await AsyncStorage.getItem('pasKey').then(res => {
      this.setState({pasHak: JSON.parse(res)});
    });
    await AsyncStorage.getItem('tabuuKey').then(res => {
      this.setState({tabu: JSON.parse(res)});
    });
    AsyncStorage.setItem('TeamOne', JSON.stringify(this.props.takımA));
    AsyncStorage.setItem('TeamTwo', JSON.stringify(this.props.takımB));
    this.teamNameSelect();
    let myInterval = setInterval(this.myTimer, 1000);
    this.setState({myInterval});

    this.RequestData();
  }

  RequestData = async () => {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let Words = await Data.map((value, index, array) => {
      if (randomNumber === index) {
        this.setState({Words: value, Yasak: value.tabu});
      }
    });
  };

  teamNameSelect = () => {
    if (this.state.sira === 1) {
      this.setState({teamName: this.props.takımA});
    } else {
      this.setState({teamName: this.props.takımB});
    }
  };

  myTimer = () => {
    let i = this.state.time;
    if (i === 0) {
      clearInterval(this.state.myInterval);
      Actions.splashScreen({
        teamScore: this.state.puan1,
        teamName: this.state.teamName,
        trueScore: this.state.trueScore,
        tabuuScore: this.state.tabuuScore,
        sira: this.state.sira,
      });
    } else {
      i = i - 1;
      this.setState({time: i});
    }
  };

  _pasHak = () => {
    if (this.state.pasHak === 0) {
      //TODO
    } else {
      this.setState({pasHak: this.state.pasHak - 1});
      //Card Değişikliği
      this.RequestData();
    }
  };
  _puan = () => {
    this.setState({
      puan1: this.state.puan1 + 1,
      trueScore: this.state.trueScore + 1,
    });
    this.RequestData();
  };
  _tabuu = () => {
    this.setState({
      puan1: this.state.puan1 - this.state.tabu,
      tabuuScore: this.state.tabuuScore + 1,
    });
    this.RequestData();
  };
  //süre tekrar başlar
  StartTimer() {
    let myInterval = setInterval(this.myTimer, 1000);
    this.setState({myInterval});
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed,
    });
  }
  // Molaya basılınca tetiklenen fonk. Modal a devreye sokar Displayed yapar
  BreakTimer() {
    clearInterval(this.state.myInterval);
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed,
    });
  }
  //Mola ekranında Menü sayfasına geçiş
  roamMainMenü() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed,
    });

    Actions.main();
  }
  // Mola ekranı Change Pause (Modal)
  changePause = () => {
    return (
      <View>
        <Modal
          visible={this.state.pickerDisplayed}
          animationType={'slide'}
          transparent={true}>
          <View
            style={{
              marginBottom: ([height] * 15) / 100,
              margin: 20,
              padding: 20,
              bottom: 20,
              left: 20,
              right: 20,
              alignItems: 'center',
              position: 'absolute',
              borderWidth: 1,
              borderColor: '#999',
            }}>
            <Text>Oyuna biraz mola</Text>
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableHighlight
                onPress={() => this.StartTimer()}
                style={{paddingTop: 4, paddingBottom: 4, marginRight: 10}}>
                <Text style={{color: '#999'}}>Başlat</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.roamMainMenü()}
                style={{paddingTop: 4, paddingBottom: 4}}>
                <Text style={{color: '#999'}}>Menü</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header transparent>
          <Left>
            <Text>Oyun Zamanı</Text>
          </Left>
          <Body>
            <Text>{this.state.time}</Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.BreakTimer()}>
              <Text>Mola</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        {this.changePause()}
        <View style={styles.prop}>
          <Text style={{fontSize: 17}}>{this.state.teamName} </Text>
          <Text style={{fontSize: 17}}>Puan : {this.state.puan1} </Text>
        </View>
        <Card style={styles.cardContainer} transparent>
          <CardItem header bordered style={{justifyContent: 'center'}}>
            <Text> {this.state.Words.word} </Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{this.state.Yasak[0]} </Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{this.state.Yasak[1]}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{this.state.Yasak[2]}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{this.state.Yasak[3]}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{this.state.Yasak[4]}</Text>
            </Body>
          </CardItem>
        </Card>
        <Footer>
          <FooterTab style={{backgroundColor: '#ffe6b3'}}>
            <Button vertical onPress={() => this._puan()}>
              <Icon name="check" type="FontAwesome5" />
              <Text>Doğru</Text>
            </Button>
            <Button vertical onPress={() => this._tabuu()}>
              <Icon name="times" type="FontAwesome5" />
              <Text>Tabuu</Text>
            </Button>
            <Button badge vertical onPress={() => this._pasHak()}>
              <Badge>
                <Text> {this.state.pasHak} </Text>
              </Badge>
              <Icon name="arrow-circle-right" type="FontAwesome5" />
              <Text>Pas</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6b3',
  },
  prop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 0.03,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
