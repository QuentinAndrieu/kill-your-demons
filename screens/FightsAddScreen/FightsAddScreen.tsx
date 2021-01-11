import * as React from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { AvatarContext } from '../../contexts/AvatarContext';
import { MonstersContext } from '../../contexts/MonstersContext';
import { DeadMonstersList } from './components/DeadMonstersList';
import { NewFightsList } from './components/NewFightsList';

export class FightsAddScreen extends React.Component<{ navigation: any }, { searchMonsterName: string }> {
  constructor(props: { navigation: any }) {
    super(props);

    this.state = {
      searchMonsterName: '',
    };
  }

  render() {
    return (
      <AvatarContext.Consumer>
        {(avatarContext) => (
          <MonstersContext.Consumer>
            {(monstersContext) => (
              <ScrollView>
                <View>
                  <SearchBar
                    placeholder='Search for monsters'
                    onChangeText={(value) => this.setState({ searchMonsterName: value })}
                    value={this.state.searchMonsterName}
                    lightTheme={true}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                    inputContainerStyle={{ backgroundColor: 'white' }}
                  />

                  <NewFightsList
                    addFight={avatarContext.addFight}
                    fights={avatarContext.avatar.fights}
                    navigation={this.props.navigation}
                    monsters={monstersContext.monsters}
                    searchMonsterName={this.state.searchMonsterName}
                  />

                  <DeadMonstersList
                    resurrectMonster={avatarContext.resurrectMonster}
                    fights={avatarContext.avatar.fights}
                    navigation={this.props.navigation}
                    monsters={monstersContext.monsters}
                    searchMonsterName={this.state.searchMonsterName}
                  />
                </View>
              </ScrollView>
            )}
          </MonstersContext.Consumer>
        )}
      </AvatarContext.Consumer>
    );
  }
}
