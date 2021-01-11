import * as React from 'react';
import { View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { monsters } from '../../../contexts/MonstersContext';
import { AvatarFightModel } from '../../../models/AvatarModel';
import { MonsterModel } from '../../../models/MonsterModel';

export class DeadMonstersList extends React.Component<
  {
    searchMonsterName: string;
    monsters: MonsterModel[];
    fights: AvatarFightModel[];
    resurrectMonster: (monsterId: string | undefined) => void;
    navigation: any;
  },
  {}
> {
  constructor(props: {
    searchMonsterName: string;
    monsters: MonsterModel[];
    fights: AvatarFightModel[];
    resurrectMonster: (monsterId: string | undefined) => void;
    navigation: any;
  }) {
    super(props);

    this.state = {};
  }

  render() {
    const deadMonstersFight: AvatarFightModel[] = this.props.fights?.filter(
      (fight) =>
        fight.killed && MonsterModel.getMonsterById(fight.monsterId, this.props.monsters)?.name.includes(this.props.searchMonsterName)
    );

    return deadMonstersFight && deadMonstersFight.length > 0 ? (
      <View>
        <Text h4 key={'title-resurrect'} style={{ marginTop: '2%', color: 'red', fontWeight: 'bold' }}>
          Resurrect monsters
        </Text>
        {deadMonstersFight.map((fight, i) => {
          const monster: MonsterModel | undefined = MonsterModel.getMonsterById(fight.monsterId, this.props.monsters);
          return (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => {
                this.props.resurrectMonster(fight.monsterId);
                this.props.navigation.navigate('FightsScreen');
              }}
            >
              <Icon key={monster?.icon} name={monster?.icon} iconStyle={{ color: 'grey' }} type='font-awesome-5' color={'black'} />
              <ListItem.Content>
                <ListItem.Title h5>{monster?.name}</ListItem.Title>
                <ListItem.Subtitle>{monster?.description}</ListItem.Subtitle>
              </ListItem.Content>

              <Icon key={'skull'} name={'skull'} iconStyle={{ color: 'red' }} type='font-awesome-5' color={'black'} />
            </ListItem>
          );
        })}
      </View>
    ) : null;
  }
}
