import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from '../components/Themed';
import { AvatarModel } from '../models/AvatarModel';
import { FlatList } from 'react-native-gesture-handler';
import { MonsterModel } from '../models/MonsterModel';
import StyleScreen from '../constants/StyleScreen';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class FightsAddScreen extends React.Component<{ avatar: AvatarModel; monsters: MonsterModel[] }, {}> {
  constructor(props: { avatar: AvatarModel; monsters: MonsterModel[] }) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            margin: '2%',
          }}
        >
          <FlatList
            data={this.props.monsters?.map((monster) => monster)}
            renderItem={({ item }) => <Text key={item.id}>{item.name}</Text>}
          />
        </View>
      </View>
    );
  }
}
