import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import { AvatarScreen } from '../screens/AvatarScreen';
import { MonstersScreen } from '../screens/MonstersScreen';
import { BottomTabParamList, AvatarTabParamList, MonstersTabParamList, OverviewTabParamList, FightsTabParamList } from '../types';
import { OverviewScreen } from '../screens/OverviewScreen';
import { FightsScreen } from '../screens/FightsScreen';
import * as firebase from 'firebase';
import { AvatarFightModel, AvatarModel, DayFighting } from '../models/AvatarModel';
import { FightsAddScreen } from '../screens/FightsAddScreen';
import { MonsterModel } from '../models/MonsterModel';
import { Icon } from 'react-native-elements';
import { AvatarContext } from '../contexts/AvatarContext';
import { MonstersContext } from '../contexts/MonstersContext';
import moment from 'moment';

export class BottomTabNavigator extends React.Component<{}, { avatar: AvatarModel; monsters: MonsterModel[] }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      avatar: new AvatarModel(),
      monsters: [],
    };

    this.updateFight = this.updateFight.bind(this);
  }

  componentDidMount() {
    this.loadAvatarFromCloud();
    this.loadMonstersFromCloud();
  }

  private formatDate(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  }

  private updateFight(monsterId: string | undefined, active: boolean, date: string | undefined) {
    if (firebase.firestore()) {
      const avatar: AvatarModel = { ...this.state.avatar };
      const fight: AvatarFightModel | undefined = avatar.fights.find((fight) => fight.monsterId === monsterId);
      const dayFighting: DayFighting | undefined = fight?.daysFightings?.find((day) => day.date === date);

      if (dayFighting) {
        dayFighting.active = active;
      } else if (fight?.daysFightings) {
        fight.daysFightings.push({ date: this.formatDate(new Date()), active });
      } else if (fight) {
        fight.daysFightings = [{ date: this.formatDate(new Date()), active }];
      }

      this.setState({
        avatar,
      });

      const avatarCloud = firebase.firestore().collection('avatars').doc('Bcng4MyPHBbUUW5ZQFaf');
      avatarCloud.update(avatar);
    }
  }

  private loadAvatarFromCloud() {
    if (firebase.firestore()) {
      const avatarCloud = firebase.firestore().collection('avatars').doc('Bcng4MyPHBbUUW5ZQFaf');
      avatarCloud
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            this.setState({ avatar: doc.data() });
            console.log('========> state', this.state);
          } else {
            console.log('No avatar !!');
          }
          console.log('doc', doc.data());
        })
        .catch((error: any) => {
          console.log('Error getting avatar:', error);
        });
    }
  }

  private loadMonstersFromCloud() {
    if (firebase.firestore()) {
      const monstersCloud = firebase.firestore().collection('monsters');
      const monsters: MonsterModel[] = [];
      monstersCloud.get().then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          let monster = doc.data();
          monster = { ...monster, id: doc.id };
          monsters.push(monster);
        });
        this.setState({ monsters });
      });
    }
  }

  render() {
    const BottomTab = createBottomTabNavigator<BottomTabParamList>();

    return (
      <AvatarContext.Provider value={{ avatar: this.state.avatar, updateFight: this.updateFight }}>
        <MonstersContext.Provider value={{ monsters: this.state.monsters }}>
          <BottomTab.Navigator initialRouteName='Avatar' tabBarOptions={{ activeTintColor: Colors['light'].tint, showLabel: false }}>
            <BottomTab.Screen
              name='Avatar'
              options={{
                tabBarIcon: ({ color }) => <Icon name='home' type='font-awesome-5' color='white' />,
              }}
            >
              {(props) => <AvatarNavigator {...props} />}
            </BottomTab.Screen>

            <BottomTab.Screen
              name='Fights'
              options={{
                tabBarIcon: ({ color }) => <Icon name='fist-raised' type='font-awesome-5' color='white' />,
              }}
            >
              {(props) => <FightsNavigator {...props} />}
            </BottomTab.Screen>

            <BottomTab.Screen
              name='Monsters'
              options={{
                tabBarIcon: ({ color }) => <Icon name='pastafarianism' type='font-awesome-5' color='white' />,
              }}
            >
              {(props) => <MonstersNavigator {...props} />}
            </BottomTab.Screen>

            <BottomTab.Screen
              name='Overview'
              component={OverviewNavigator}
              options={{
                tabBarIcon: ({ color }) => <Icon name='calendar-alt' type='font-awesome-5' color='white' />,
              }}
            />
          </BottomTab.Navigator>
        </MonstersContext.Provider>
      </AvatarContext.Provider>
    );
  }
}

class AvatarNavigator extends React.Component {
  render() {
    const AvatarStack = createStackNavigator<AvatarTabParamList>();

    return (
      <AvatarStack.Navigator>
        <AvatarStack.Screen name='AvatarScreen' options={{ headerTitle: 'Avatar Title' }}>
          {(props) => <AvatarScreen {...props} />}
        </AvatarStack.Screen>
      </AvatarStack.Navigator>
    );
  }
}

class MonstersNavigator extends React.Component {
  render() {
    const MonstersStack = createStackNavigator<MonstersTabParamList>();

    return (
      <MonstersStack.Navigator>
        <MonstersStack.Screen name='MonstersScreen' options={{ headerTitle: 'Monsters' }}>
          {(props) => <MonstersScreen {...props} />}
        </MonstersStack.Screen>
      </MonstersStack.Navigator>
    );
  }
}

class FightsNavigator extends React.Component {
  render() {
    const FightsStack = createStackNavigator<FightsTabParamList>();

    return (
      <FightsStack.Navigator initialRouteName='FightsScreen'>
        <FightsStack.Screen name='FightsScreen' options={{ headerTitle: 'Fights' }}>
          {(props) => <FightsScreen {...props} />}
        </FightsStack.Screen>

        <FightsStack.Screen name='FightsAddScreen' options={{ headerTitle: 'Fights Add' }}>
          {(props) => <FightsAddScreen {...props} />}
        </FightsStack.Screen>
      </FightsStack.Navigator>
    );
  }
}

class OverviewNavigator extends React.Component {
  render() {
    const OverviewStack = createStackNavigator<OverviewTabParamList>();

    return (
      <OverviewStack.Navigator>
        <OverviewStack.Screen name='OverviewScreen' component={OverviewScreen} options={{ headerTitle: 'Overview' }} />
      </OverviewStack.Navigator>
    );
  }
}
