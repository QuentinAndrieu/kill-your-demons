import 'firebase/auth';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ActivityIndicator, ColorSchemeName, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { AuthScreen } from '../screens/AuthScreen/AuthScreen';
import { RootStackParamList } from '../types';
import { BottomTabNavigator } from './components/BottomTabNavigator';
import LinkingConfiguration from './utils/LinkingConfiguration';
import { navigationRef } from './utils/RootNavigation';
import * as RootNavigation from './utils/RootNavigation';
import { MainContainer } from './MainContainer';
import { UserContext } from '../contexts/UserContext';

export default class Main extends React.Component<{ colorScheme: ColorSchemeName }, {}> {
  constructor(props: { colorScheme: ColorSchemeName }) {
    super(props);
  }

  render() {
    const customDefaultTheme = this.props.colorScheme
      ? {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            text: Colors[this.props.colorScheme].text,
            background: Colors[this.props.colorScheme].background,
            tint: Colors[this.props.colorScheme].tint,
            tabIconDefault: Colors[this.props.colorScheme].tabIconDefault,
            tabIconSelected: Colors[this.props.colorScheme].tabIconSelected,
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
                <NavigationContainer linking={LinkingConfiguration} theme={customDefaultTheme} ref={navigationRef}>
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
}

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
        <View style={{ width: '90%', flexDirection: 'row', alignSelf: 'flex-start' }}>
          <Icon style={{ marginRight: 5 }} name='skull' type='font-awesome-5' color='black' />
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>KillYourDemons</Text>
        </View>
        <View style={{ width: '10%' }}>
          <Icon
            style={{ marginRight: 5 }}
            name='cog'
            type='font-awesome-5'
            color='grey'
            onPress={() => RootNavigation.navigate('SettingsScreen', {})}
          />
        </View>
      </View>
    );
  }
}

class RootNavigator extends React.Component {
  render() {
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
  }
}
