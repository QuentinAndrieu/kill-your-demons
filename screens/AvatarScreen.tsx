import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { AvatarModel } from '../models/AvatarModel';
import StyleScreen from '../constants/StyleScreen';
import { Card } from 'react-native-elements';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class AvatarScreen extends React.Component<{ avatar: AvatarModel }, {}> {
  constructor(props: { avatar: AvatarModel }) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Card containerStyle={{ width: '100%', height: '70%', margin: '0%' }}>
          <Card.Title>{this.props.avatar.name}</Card.Title>
          <Card.Divider />
        </Card>
      </View>
    );
  }
}
