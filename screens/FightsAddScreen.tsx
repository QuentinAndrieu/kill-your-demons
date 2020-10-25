import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from '../components/Themed';
import { AvatarModel } from '../models/AvatarModel';
import { FlatList } from 'react-native-gesture-handler';
import { MonsterModel } from '../models/MonsterModel';
import StyleScreen from '../constants/StyleScreen';
import { AvatarContext } from '../contexts/AvatarContext';
import { MonstersContext } from '../contexts/MonstersContext';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class FightsAddScreen extends React.Component {
  render() {
    return (
      <AvatarContext.Consumer>
        {(avatarContext) => (
          <MonstersContext.Consumer>
            {(monstersContext) => (
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
                    data={monstersContext.monsters?.map((monster) => monster)}
                    renderItem={({ item }) => <Text key={item.id}>{item.name}</Text>}
                  />
                </View>
              </View>
            )}
          </MonstersContext.Consumer>
        )}
      </AvatarContext.Consumer>
    );
  }
}
