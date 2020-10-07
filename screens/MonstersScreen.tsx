import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import { View } from '../components/Themed';
import { MonsterModel } from '../models/MonsterModel';
import * as firebase from 'firebase';
import StyleScreen from '../constants/StyleScreen';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class MonstersScreen extends React.Component<{ monsters: MonsterModel[] }, {}> {
  constructor(props: { monsters: MonsterModel[] }) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
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
            <View key={monster.id} style={{ width: '98%', height: 200, marginBottom: '2%', backgroundColor: 'green' }}>
              <Card containerStyle={{ width: '100%', height: '100%', margin: '0%' }}>
                <Card.Title>{monster.name}</Card.Title>
                <Card.Divider />

                <Text p>{monster.description}</Text>
              </Card>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}
