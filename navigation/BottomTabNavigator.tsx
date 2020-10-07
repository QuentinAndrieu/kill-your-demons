import { Ionicons } from '@expo/vector-icons';
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
import { AvatarModel } from '../models/AvatarModel';
import { FightsAddScreen } from '../screens/FightsAddScreen';
import { MonsterModel } from '../models/MonsterModel';

export class BottomTabNavigator extends React.Component<{}, { firestore: any; avatar: AvatarModel; monsters: MonsterModel[] }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      firestore: firebase.firestore(),
      avatar: new AvatarModel(),
      monsters: [],
    };
  }

  componentDidMount() {
    this.loadAvatarFromCloud();
    this.loadMonstersFromCloud();
  }

  private loadAvatarFromCloud() {
    if (this.state.firestore) {
      const avatarCloud = this.state.firestore.collection('avatars').doc('Bcng4MyPHBbUUW5ZQFaf');
      avatarCloud
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            this.setState({ avatar: doc.data() });
          } else {
            console.log('No avatar !!');
          }
        })
        .catch((error: any) => {
          console.log('Error getting avatar:', error);
        });
    }
  }

  private loadMonstersFromCloud() {
    if (this.state.firestore) {
      const monstersCloud = this.state.firestore.collection('monsters');
      const monsters: MonsterModel[] = [];
      monstersCloud.get().then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          let monster = doc.data();
          monster = { ...monster, id: doc.id };
          monsters.push(monster);
        });
        console.log('monsters', monsters);
        this.setState({ monsters });
      });
    }
  }

  render() {
    const BottomTab = createBottomTabNavigator<BottomTabParamList>();

    return (
      <BottomTab.Navigator initialRouteName='Avatar' tabBarOptions={{ activeTintColor: Colors['dark'].tint }}>
        <BottomTab.Screen
          name='Avatar'
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name='ios-code' color={color} />,
          }}
        >
          {(props) => <AvatarNavigator {...props} avatar={this.state.avatar} />}
        </BottomTab.Screen>

        <BottomTab.Screen
          name='Fights'
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name='ios-code' color={color} />,
          }}
        >
          {(props) => <FightsNavigator {...props} avatar={this.state.avatar} monsters={this.state.monsters} />}
        </BottomTab.Screen>

        <BottomTab.Screen
          name='Monsters'
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name='ios-code' color={color} />,
          }}
        >
          {(props) => <MonstersNavigator {...props} monsters={this.state.monsters} />}
        </BottomTab.Screen>

        <BottomTab.Screen
          name='Overview'
          component={OverviewNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name='ios-code' color={color} />,
          }}
        />
      </BottomTab.Navigator>
    );
  }
}

class TabBarIcon extends React.Component<{ name: string; color: string }> {
  constructor(props: { name: string; color: string }) {
    super(props);
  }

  render() {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...this.props} />;
  }
}

class AvatarNavigator extends React.Component<{ avatar: AvatarModel }, {}> {
  constructor(props: { avatar: AvatarModel }) {
    super(props);
  }

  render() {
    const AvatarStack = createStackNavigator<AvatarTabParamList>();

    return (
      <AvatarStack.Navigator>
        <AvatarStack.Screen name='AvatarScreen' options={{ headerTitle: 'Avatar Title' }}>
          {(props) => <AvatarScreen {...props} avatar={this.props.avatar} />}
        </AvatarStack.Screen>
      </AvatarStack.Navigator>
    );
  }
}

class MonstersNavigator extends React.Component<{ monsters: MonsterModel[] }> {
  constructor(props: { monsters: MonsterModel[] }) {
    super(props);
  }

  render() {
    const MonstersStack = createStackNavigator<MonstersTabParamList>();

    return (
      <MonstersStack.Navigator>
        <MonstersStack.Screen name='MonstersScreen' options={{ headerTitle: 'Monsters' }}>
          {(props) => <MonstersScreen {...props} monsters={this.props.monsters} />}
        </MonstersStack.Screen>
      </MonstersStack.Navigator>
    );
  }
}

class FightsNavigator extends React.Component<{ avatar: AvatarModel; monsters: MonsterModel[] }> {
  constructor(props: { avatar: AvatarModel; monsters: MonsterModel[] }) {
    super(props);
  }

  render() {
    const FightsStack = createStackNavigator<FightsTabParamList>();

    return (
      <FightsStack.Navigator initialRouteName='FightsScreen'>
        <FightsStack.Screen name='FightsScreen' component={FightsScreen} options={{ headerTitle: 'Fights' }} />
        <FightsStack.Screen name='FightsAddScreen' options={{ headerTitle: 'Fights Add' }}>
          {(props) => <FightsAddScreen {...props} monsters={this.props.monsters} avatar={this.props.avatar} />}
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
