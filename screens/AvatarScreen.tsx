import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as firebase from 'firebase';

import { View, Text } from '../components/Themed';
import { AvatarModel } from '../models/AvatarModel';
import StyleScreen from '../constants/StyleScreen';
import { Card, Avatar } from 'react-native-elements';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class AvatarScreen extends React.Component<{ avatar: AvatarModel }, {}> {
  constructor(props: { avatar: AvatarModel }) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Card containerStyle={{ width: '49%', height: '70%', margin: '0%' }}>
          <Card.Title>CARD WITH DIVIDER</Card.Title>
          <Card.Divider />

          <Text>{this.props.avatar.name}</Text>
        </Card>

        <View style={{ width: '50%', height: '70%', margin: '0%' }}>
          <Card containerStyle={{ height: '50%', marginTop: '0%', margin: '1%', padding: '0%' }}>
            <View style={{ width: '40%' }}>
              <Avatar size='small' rounded title='MT' onPress={() => console.log('Works!')} containerStyle={{ backgroundColor: 'blue' }} />
            </View>

            <View style={{ width: '40%' }}>
              <Avatar size='small' rounded title='MT' onPress={() => console.log('Works!')} containerStyle={{ backgroundColor: 'blue' }} />
            </View>
          </Card>
          <Card containerStyle={{ height: '50%', backgroundColor: 'yellow', margin: '1%' }}></Card>
        </View>

        {/* <View style={{ width: '100%', height: '15%', backgroundColor: 'orange' }} />
        <View style={{ width: '100%', height: '15%', backgroundColor: 'violet' }} /> */}
      </View>
    );
  }
}
