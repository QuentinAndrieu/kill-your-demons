import 'firebase/auth';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ActivityIndicator, ColorSchemeName, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../shared/constants/Colors';
import { RootStackParamList } from '../types';

import * as RootNavigation from '../shared/utils/RootNavigation';
import { MainContainer } from './MainContainer';
import { UserContext } from '../shared/contexts/UserContext';
import { BottomTabNavigator } from './components/BottomTabNavigator';
import LinkingConfiguration from '../shared/utils/LinkingConfiguration';
import { AuthScreen } from '../Auth/AuthScreen';

const LogoTitle = () => {
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
      <View style={{ width: '90%', flexDirection: 'row', alignSelf: 'flex-start' }}>
        <Icon style={{ marginRight: 5 }} name='skull' type='font-awesome-5' color='black' />
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>KillYourDemons</Text>
      </View>
      <View style={{ width: '10%' }}>
        <Icon style={{ marginRight: 5 }} name='cog' type='font-awesome-5' color='grey' onPress={() => RootNavigation.navigate('SettingsScreen', {})} />
      </View>
    </View>
  );
};

const RootNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='KillYourDemons'
        options={{
          headerTitle: (props) => <LogoTitle />,
        }}
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default function Main(props: { colorScheme: ColorSchemeName }) {
  const customDefaultTheme = props.colorScheme
    ? {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          text: Colors[props.colorScheme].text,
          background: Colors[props.colorScheme].background,
          tint: Colors[props.colorScheme].tint,
          tabIconDefault: Colors[props.colorScheme].tabIconDefault,
          tabIconSelected: Colors[props.colorScheme].tabIconSelected,
        },
      }
    : DefaultTheme;

  return (
    <MainContainer>
      <UserContext.Consumer>
        {(userContext) => {
          if (userContext.isLoading) {
            return (
              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                <ActivityIndicator size='large' />
              </View>
            );
          }

          if (userContext.user) {
            return (
              <NavigationContainer linking={LinkingConfiguration} theme={customDefaultTheme} ref={RootNavigation.navigationRef}>
                <RootNavigator />
              </NavigationContainer>
            );
          }

          return <AuthScreen />;
        }}
      </UserContext.Consumer>
    </MainContainer>
  );
}
