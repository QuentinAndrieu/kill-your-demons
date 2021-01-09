import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import { AvatarScreen } from '../screens/AvatarScreen/AvatarScreen';
import { BottomTabParamList, AvatarTabParamList, FightsTabParamList } from '../types';
import { FightsScreen } from '../screens/FightsScreen/FightsScreen';
import { AvatarFightModel, AvatarModel } from '../models/AvatarModel';
import { FightsAddScreen } from '../screens/FightsAddScreen/FightsAddScreen';
import { MonsterModel } from '../models/MonsterModel';
import { Icon } from 'react-native-elements';
import { AvatarContext } from '../contexts/AvatarContext';
import { MonstersContext } from '../contexts/MonstersContext';
import { AvatarFirestore } from '../firestore/AvatarFirestore';
import { MonsterFirestore } from '../firestore/MonsterFirestore';

export class BottomTabNavigator extends React.Component<{}, { avatar: AvatarModel; monsters: MonsterModel[] }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      avatar: new AvatarModel(),
      monsters: [],
    };

    this.updateDailyFight = this.updateDailyFight.bind(this);
    this.addFight = this.addFight.bind(this);
    this.killMonster = this.killMonster.bind(this);
    this.resurrectMonster = this.resurrectMonster.bind(this);
  }

  componentDidMount() {
    AvatarFirestore.loadAvatarFromCloud().then((avatar: AvatarModel) => this.setState({ avatar }));
    MonsterFirestore.loadMonstersFromCloud().then((monsters: MonsterModel[]) => this.setState({ monsters }));
  }

  private updateDailyFight(monsterId: string | undefined, active: boolean, date: string | undefined) {
    AvatarFirestore.updateDailyFight(this.state.avatar, monsterId, active, date).then((avatar) => this.setState({ avatar }));
  }

  private addFight(fight: AvatarFightModel) {
    AvatarFirestore.addFight(this.state.avatar, fight).then((avatar) => this.setState({ avatar }));
  }

  private killMonster(monsterId: string | undefined) {
    AvatarFirestore.killMonster(this.state.avatar, monsterId).then((avatar) => this.setState({ avatar }));
  }

  private resurrectMonster(monsterId: string | undefined) {
    AvatarFirestore.resurrectMonster(this.state.avatar, monsterId).then((avatar) => this.setState({ avatar }));
  }

  render() {
    const BottomTab = createBottomTabNavigator<BottomTabParamList>();

    return (
      <AvatarContext.Provider
        value={{
          avatar: this.state.avatar,
          updateDailyFight: this.updateDailyFight,
          addFight: this.addFight,
          killMonster: this.killMonster,
          resurrectMonster: this.resurrectMonster,
        }}
      >
        <MonstersContext.Provider value={{ monsters: this.state.monsters }}>
          <BottomTab.Navigator initialRouteName='Main' tabBarOptions={{ activeTintColor: Colors['light'].tint, showLabel: false }}>
            <BottomTab.Screen
              name='Main'
              options={{
                tabBarIcon: ({ color }) => <Icon name='home' type='font-awesome-5' color='black' />,
              }}
            >
              {(props) => <FightsNavigator {...props} />}
            </BottomTab.Screen>

            <BottomTab.Screen
              name='Fights'
              options={{
                tabBarIcon: ({ color }) => <Icon name='user-alt' type='font-awesome-5' color='black' />,
              }}
            >
              {(props) => <AvatarNavigator {...props} />}
            </BottomTab.Screen>
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
      <AvatarStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AvatarStack.Screen name='AvatarScreen'>{(props) => <AvatarScreen {...props} />}</AvatarStack.Screen>
      </AvatarStack.Navigator>
    );
  }
}

class FightsNavigator extends React.Component {
  render() {
    const FightsStack = createStackNavigator<FightsTabParamList>();

    return (
      <FightsStack.Navigator
        initialRouteName='FightsScreen'
        screenOptions={{
          headerShown: false,
        }}
      >
        <FightsStack.Screen name='FightsScreen'>{(props) => <FightsScreen {...props} />}</FightsStack.Screen>

        <FightsStack.Screen name='FightsAddScreen'>{(props) => <FightsAddScreen {...props} />}</FightsStack.Screen>
      </FightsStack.Navigator>
    );
  }
}
