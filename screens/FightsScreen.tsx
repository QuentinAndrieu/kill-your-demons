import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { AvatarModel } from '../models/AvatarModel';
import StyleScreen from '../constants/StyleScreen';
import { ListItem, Avatar, Button, Text } from 'react-native-elements';
import { MonsterModel } from '../models/MonsterModel';
import { MonstersContext } from '../contexts/MonstersContext';
import { avatar, AvatarContext } from '../contexts/AvatarContext';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class FightsScreen extends React.Component<{ navigation: any }, {}> {
  constructor(props: { navigation: any }) {
    super(props);
  }

  goToFightsAddScreen() {
    this.props.navigation.navigate('FightsAddScreen');
  }

  getMonster(monsterId: string, monsters: MonsterModel[]): MonsterModel | undefined {
    return monsters?.find((monster) => monster.id === monsterId);
  }

  render() {
    const list = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
      },
    ];

    return (
      <AvatarContext.Consumer>
        {(avatarContext) => (
          <MonstersContext.Consumer>
            {(monstersContext) => (
              <View style={styles.container}>
                <View style={{ width: '100%', height: '70%', margin: '1%' }}>
                  <View>
                    <Text>caca{avatarContext.avatar.name}</Text>
                    {avatarContext.avatar?.fights?.map((fight, i) => (
                      <ListItem key={i} bottomDivider>
                        <Avatar source={{ uri: list[0].avatar_url }} />
                        <ListItem.Content>
                          <ListItem.Title>{this.getMonster(fight.monsterId, monstersContext.monsters)?.name}</ListItem.Title>
                          <ListItem.Subtitle>{this.getMonster(fight.monsterId, monstersContext.monsters)?.description}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    ))}
                  </View>
                  <Button onPress={() => this.goToFightsAddScreen()} title='Add fight'>
                    Start a fight
                  </Button>
                </View>
              </View>
            )}
          </MonstersContext.Consumer>
        )}
      </AvatarContext.Consumer>
    );
  }
}
