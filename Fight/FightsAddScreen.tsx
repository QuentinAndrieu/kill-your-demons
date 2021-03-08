import * as React from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { AvatarContext } from '../shared/contexts/AvatarContext';
import { MonstersContext } from '../shared/contexts/MonstersContext';
import { DeadMonstersList } from './components/DeadMonstersList';
import { NewFightsList } from './components/NewFightsList';

export function FightsAddScreen(props: { navigation: any }) {
  const [searchMonsterName, setSearchMonsterName] = React.useState<string>('');

  return (
    <AvatarContext.Consumer>
      {(avatarContext) => (
        <MonstersContext.Consumer>
          {(monstersContext) => (
            <ScrollView>
              <View>
                <SearchBar
                  placeholder='Search for monsters'
                  onChangeText={(value) => setSearchMonsterName(value)}
                  value={searchMonsterName}
                  lightTheme={true}
                  containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                  inputContainerStyle={{ backgroundColor: 'white' }}
                />

                <NewFightsList
                  addFight={avatarContext.addFight}
                  fights={avatarContext.avatar.fights}
                  navigation={props.navigation}
                  monsters={monstersContext.monsters}
                  searchMonsterName={searchMonsterName}
                />

                <DeadMonstersList
                  resurrectMonster={avatarContext.resurrectMonster}
                  fights={avatarContext.avatar.fights}
                  navigation={props.navigation}
                  monsters={monstersContext.monsters}
                  searchMonsterName={searchMonsterName}
                />
              </View>
            </ScrollView>
          )}
        </MonstersContext.Consumer>
      )}
    </AvatarContext.Consumer>
  );
}
