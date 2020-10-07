import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from '../components/Themed';
import { MonsterModel } from '../models/MonsterModel';
import * as firebase from 'firebase';
import StyleScreen from '../constants/StyleScreen';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class MonstersScreen extends React.Component<{ monsters: MonsterModel[] }, {}> {
  constructor(props: { monsters: MonsterModel[] }) {
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
          {this.props.monsters.map((monster) => (
            <View key={monster.id} style={{ width: '49%', height: 200, marginBottom: '2%', backgroundColor: 'green' }}>
              <Text>{monster.name}</Text>
              <Text>{monster.description}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
