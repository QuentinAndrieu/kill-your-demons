import * as React from 'react';
import { Text } from 'react-native';

import { View } from '../components/Themed';
import StyleScreen from '../constants/StyleScreen';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { MonstersContext } from '../contexts/MonstersContext';

const styleScreen: any = StyleScreen;

export class MonstersScreen extends React.Component {
  render() {
    return (
      <MonstersContext.Consumer>
        {(monstersContext) => (
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
              {monstersContext.monsters.map((monster) => (
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
        )}
      </MonstersContext.Consumer>
    );
  }
}
