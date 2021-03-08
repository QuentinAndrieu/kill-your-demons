import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../../shared/constants/Colors';

import { BottomTabParamList, AvatarTabParamList, HomeTabParamList } from '../../types';
import { Icon } from 'react-native-elements';
import { AvatarScreen } from '../../Avatar/AvatarScreen';
import { SettingsScreen } from '../../Settings/SettingsScreen';
import { FightsScreen } from '../../Fight/FightsScreen';
import { FightsAddScreen } from '../../Fight/FightsAddScreen';

const AvatarNavigator = (props: any) => {
  const AvatarStack = createStackNavigator<AvatarTabParamList>();

  return (
    <AvatarStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AvatarStack.Screen name='AvatarScreen'>{(props) => <AvatarScreen />}</AvatarStack.Screen>
    </AvatarStack.Navigator>
  );
};

const HomeNavigator = (props: any) => {
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
      <HomeStack.Screen name='SettingsScreen'>{() => <SettingsScreen />}</HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export function BottomTabNavigator() {
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
