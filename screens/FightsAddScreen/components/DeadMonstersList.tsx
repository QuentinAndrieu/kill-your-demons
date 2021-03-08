import * as React from 'react';
import { View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { AvatarFightModel } from '../../../models/AvatarModel';
import { MonsterModel } from '../../../models/MonsterModel';

export function DeadMonstersList(props: {
  searchMonsterName: string;
  monsters: MonsterModel[];
  fights: AvatarFightModel[];
  resurrectMonster: (monsterId: string | undefined) => void;
  navigation: any;
}) {
  const deadMonstersFight: AvatarFightModel[] = props.fights?.filter(
    (fight) => fight.killed && MonsterModel.getMonsterById(fight.monsterId, props.monsters)?.name.includes(props.searchMonsterName)
  );

  return deadMonstersFight && deadMonstersFight.length > 0 ? (
    <View>
      <Text h4 key={'title-resurrect'} style={{ marginTop: '2%', color: 'red', fontWeight: 'bold' }}>
        Resurrect monsters
      </Text>
      {deadMonstersFight.map((fight, i) => {
        const monster: MonsterModel | undefined = MonsterModel.getMonsterById(fight.monsterId, props.monsters);
        return (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => {
              props.resurrectMonster(fight.monsterId);
              props.navigation.navigate('FightsScreen');
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
