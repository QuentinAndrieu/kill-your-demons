import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import StyleScreen from '../../constants/StyleScreen';
import { signIn, signUp } from '../../firestore/AuthFirestore';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export function AuthScreen() {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [toggleSignIn, setToggleSignIn] = React.useState<boolean>(false);

  return (
    <View style={{ flexDirection: 'column', margin: '5%' }}>
      <View style={{ flexDirection: 'column', height: '40%', alignItems: 'center', paddingTop: '50%' }}>
        <Text h1 style={{ fontWeight: 'bold' }}>
          Kill Your Demons
        </Text>
      </View>
      <View style={{ flexDirection: 'column', height: '40%' }}>
        <Input value={email} placeholder='Email' label='Email' leftIcon={{ type: 'font-awesome', name: 'envelope' }} onChangeText={(email) => setEmail(email)} />
        <Input value={password} placeholder='Password' label='Password' leftIcon={{ type: 'font-awesome', name: 'lock' }} onChangeText={(password) => setPassword(password)} />
        <Button
          title={toggleSignIn ? 'Sign In' : 'Sign Up'}
          disabled={Boolean(!email || !password)}
          onPress={() => {
            if (toggleSignIn) {
              signIn(email, password);
            } else {
              signUp(email, password);
            }
          }}
        />

        <Button
          title={toggleSignIn ? 'No Account ? Sign Up' : 'Already an account ? Sign In'}
          buttonStyle={{ backgroundColor: 'lightgrey', marginTop: '5%' }}
          onPress={() => setToggleSignIn(!toggleSignIn)}
        />
      </View>
    </View>
  );
}
