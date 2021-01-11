import firebase, { User } from 'firebase/app';
import 'firebase/auth';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { AuthScreen } from '../screens/AuthScreen/AuthScreen';
import { RootStackParamList } from '../types';
import { BottomTabNavigator } from './components/BottomTabNavigator';
import LinkingConfiguration from './utils/LinkingConfiguration';
import { navigationRef } from './utils/RootNavigation';
import * as RootNavigation from './utils/RootNavigation';
import { MainContainer } from './MainContainer';

export default class Main extends React.Component<{ colorScheme: ColorSchemeName }, { user: User | null }> {
  constructor(props: { colorScheme: ColorSchemeName }) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const onAuthStateChanged = firebase.auth().onAuthStateChanged((user: User | null) => {
      this.setState({ user });

      return onAuthStateChanged;
    });
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

    return this.state.user ? (
      <MainContainer>
        <NavigationContainer linking={LinkingConfiguration} theme={customDefaultTheme} ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </MainContainer>
    ) : (
      <AuthScreen />
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
            headerTitle: (props) => {
              console.log('props', props);
              return <LogoTitle />;
            },
          }}
          component={BottomTabNavigator}
        />
      </Stack.Navigator>
    );
  }
}
