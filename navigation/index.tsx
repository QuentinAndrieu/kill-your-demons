import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { RootStackParamList } from '../types';
import { BottomTabNavigator } from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function LogoTitle() {
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
      <Icon style={{ marginRight: 5 }} name='skull' type='font-awesome-5' color='white' />
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>KillYourDemons</Text>
    </View>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='KillYourDemons' options={{ headerTitle: (props) => <LogoTitle /> }} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
