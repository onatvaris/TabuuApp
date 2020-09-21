import React, {Component} from 'react';
import Main from './Main';
import Ayarlar from './Screens/Ayarlar';
import Start from './Screens/Start';
import Team1 from './Screens/GameScreen';
import ScoreBoard from './Screens/ScoreBoard'
import {Router, Stack, Scene} from 'react-native-router-flux';
import SplashScreen from './Component/SplashScreen';

export default class Rout extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="main" component={Main} hideNavBar="false" />
          <Scene key="ayarlar" component={Ayarlar} hideNavBar="false" />
          <Scene key="start" component={Start} hideNavBar="false" />
          <Scene key="team1" component={Team1} hideNavBar="false" />
          <Scene key="scoreboard" component={ScoreBoard} hideNavBar="false" />
          <Scene key="splashScreen" component={SplashScreen} hideNavBar="false"/>
        </Stack>
      </Router>
    );
  }
}
