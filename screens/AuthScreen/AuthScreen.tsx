import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import StyleScreen from '../../constants/StyleScreen';
import { AuthFirestore } from '../../firestore/AuthFirestore';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class AuthScreen extends React.Component<{}, { email: string; password: string; toggleSignIn: boolean }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      email: '',
      password: '',
      toggleSignIn: false,
    };
  }

  render() {
    return (
      <View style={{ flexDirection: 'column', margin: '5%' }}>
        <View style={{ flexDirection: 'column', height: '40%', alignItems: 'center', paddingTop: '50%' }}>
          <Text h1 style={{ fontWeight: 'bold' }}>
            Kill Your Demons
          </Text>
        </View>
        <View style={{ flexDirection: 'column', height: '40%' }}>
          <Input
            value={this.state.email}
            placeholder='Email'
            label='Email'
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(email) => this.setState({ email })}
          />
          <Input
            value={this.state.password}
            placeholder='Password'
            label='Password'
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(password) => this.setState({ password })}
          />
          <Button
            title={this.state.toggleSignIn ? 'Sign In' : 'Sign Up'}
            disabled={Boolean(!this.state.email || !this.state.password)}
            onPress={() => {
              if (this.state.toggleSignIn) {
                AuthFirestore.signIn(this.state.email, this.state.password);
              } else {
                AuthFirestore.signUp(this.state.email, this.state.password);
              }
            }}
          />

          <Button
            title={this.state.toggleSignIn ? 'No Account ? Sign Up' : 'Already an account ? Sign In'}
            buttonStyle={{ backgroundColor: 'lightgrey', marginTop: '5%' }}
            onPress={() => {
              this.setState({ toggleSignIn: !this.state.toggleSignIn });
            }}
          />
        </View>
      </View>
    );
  }
}
