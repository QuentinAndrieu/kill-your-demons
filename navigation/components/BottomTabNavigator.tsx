import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../../constants/Colors';
import { AvatarScreen } from '../../screens/AvatarScreen/AvatarScreen';
import { BottomTabParamList, AvatarTabParamList, HomeTabParamList } from '../../types';
import { FightsScreen } from '../../screens/FightsScreen/FightsScreen';
import { FightsAddScreen } from '../../screens/FightsAddScreen/FightsAddScreen';
import { Icon } from 'react-native-elements';

import { SettingsScreen } from '../../screens/SettingScreen/SettingsScreen';

export class BottomTabNavigator extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    const BottomTab = createBottomTabNavigator<BottomTabParamList>();

    return (
      <BottomTab.Navigator initialRouteName='Home' tabBarOptions={{ activeTintColor: Colors['light'].tint, showLabel: false }}>
        <BottomTab.Screen
          name='Home'
          options={{
            tabBarIcon: ({ color }) => <Icon name='home' type='font-awesome-5' color={color} />,
          }}
        >
          {(props) => <HomeNavigator {...props} />}
        </BottomTab.Screen>

        <BottomTab.Screen
          name='Avatar'
          options={{
            tabBarIcon: ({ color }) => <Icon name='user-alt' type='font-awesome-5' color={color} />,
          }}
        >
          {(props) => <AvatarNavigator {...props} />}
        </BottomTab.Screen>
      </BottomTab.Navigator>
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

class HomeNavigator extends React.Component {
  render() {
    const HomeStack = createStackNavigator<HomeTabParamList>();

    return (
      <HomeStack.Navigator
        initialRouteName='FightsScreen'
        screenOptions={{
          headerShown: false,
        }}
      >
        <HomeStack.Screen name='FightsScreen'>{(props) => <FightsScreen {...props} />}</HomeStack.Screen>
        <HomeStack.Screen name='FightsAddScreen'>{(props) => <FightsAddScreen {...props} />}</HomeStack.Screen>
        <HomeStack.Screen name='SettingsScreen'>{(props) => <SettingsScreen {...props} />}</HomeStack.Screen>
      </HomeStack.Navigator>
    );
  }
}
