import * as React from 'react';
import { View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { AvatarFightModel } from '../../../models/AvatarModel';
import { MonsterModel } from '../../../models/MonsterModel';

export class NewFightsList extends React.Component<
  {
    searchMonsterName: string;
    monsters: MonsterModel[];
    fights: AvatarFightModel[];
    addFight: (fight: AvatarFightModel) => void;
    navigation: any;
  },
  {}
> {
  constructor(props: {
    searchMonsterName: string;
    monsters: MonsterModel[];
    fights: AvatarFightModel[];
    addFight: (fight: AvatarFightModel) => void;
    navigation: any;
  }) {
    super(props);

    this.state = {};
  }

  render() {
    const newMonsters: MonsterModel[] = this.props.monsters.filter(
      (monster) =>
        monster.name.includes(this.props.searchMonsterName) && !this.props.fights?.find((fight) => fight.monsterId === monster.id)
    );

    return newMonsters && newMonsters.length > 0 ? (
      <View>
        <Text h4 key={'title-resurrect'} style={{ marginTop: '2%', color: 'black', fontWeight: 'bold' }}>
          New fights
        </Text>
        {newMonsters.map((monster, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => {
              const fight: AvatarFightModel = new AvatarFightModel();
              fight.daysFightings = [];
              fight.monsterId = monster.id;
              fight.pv = 100;
              this.props.addFight(fight);
              this.props.navigation.navigate('FightsScreen');
            }}
          >
            <Icon key={monster.icon} name={monster.icon} iconStyle={{ color: 'grey' }} type='font-awesome-5' color={'black'} />
            <ListItem.Content>
              <ListItem.Title h5>{monster.name}</ListItem.Title>
              <ListItem.Subtitle>{monster.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    ) : null;
  }
}
