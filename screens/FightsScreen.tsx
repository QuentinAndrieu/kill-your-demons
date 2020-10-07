import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { AvatarModel } from '../models/AvatarModel';
import StyleScreen from '../constants/StyleScreen';
import { ListItem, Avatar, Button, Text } from 'react-native-elements';
import { MonsterModel } from '../models/MonsterModel';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class FightsScreen extends React.Component<{ avatar: AvatarModel; monsters: MonsterModel[]; navigation: any }, {}> {
  constructor(props: { avatar: AvatarModel; monsters: MonsterModel[]; navigation: any }) {
    super(props);
    console.log('props', props);
  }

  goToFightsAddScreen() {
    this.props.navigation.navigate('FightsAddScreen');
  }

  getMonster(monsterId: string): MonsterModel | undefined {
    console.log('monster', this.props.monsters);
    return this.props.monsters?.find((monster) => monster.id === monsterId);
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
      <View style={styles.container}>
        <View style={{ width: '100%', height: '70%', margin: '1%' }}>
          <View>
            <Text>caca{this.props.avatar?.name}</Text>
            {this.props.avatar?.fights?.map((fight, i) => (
              <ListItem key={i} bottomDivider>
                <Avatar source={{ uri: list[0].avatar_url }} />
                <ListItem.Content>
                  <ListItem.Title>{this.getMonster(fight.monsterId)?.name}</ListItem.Title>
                  <ListItem.Subtitle>{this.getMonster(fight.monsterId)?.description}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
          <Button onPress={() => this.goToFightsAddScreen()} title='Add fight'>
            Start a fight
          </Button>
        </View>
      </View>
    );
  }
}
