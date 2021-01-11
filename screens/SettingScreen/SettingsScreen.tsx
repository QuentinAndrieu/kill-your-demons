import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import StyleScreen from '../../constants/StyleScreen';
import { AuthFirestore } from '../../firestore/AuthFirestore';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'flex-start',
            height: '40%',
            width: '100%',
            padding: '10%',
          }}
        >
          <Text
            h4
            style={{
              marginBottom: '5%',
            }}
          >
            Settings
          </Text>
          <Button
            style={{
              width: '40%',
            }}
            title='SignOut'
            onPress={() => AuthFirestore.signOut()}
          />
        </View>
      </View>
    );
  }
}
