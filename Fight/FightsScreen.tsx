import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import StyleScreen from '../shared/constants/StyleScreen';
import { Text, Icon } from 'react-native-elements';
import { MonsterModel } from '../shared/models/MonsterModel';
import { MonstersContext } from '../shared/contexts/MonstersContext';
import { AvatarContext } from '../shared/contexts/AvatarContext';
import { FightIcon } from './components/FightIcon';
import { AvatarFightModel } from '../shared/models/AvatarModel';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export function FightsScreen(props: { navigation: any }) {
  const goToFightsAddScreen = () => {
    props.navigation.navigate('FightsAddScreen');
  };

  const canAddNewFights = (fights: AvatarFightModel[], monsters: MonsterModel[]) => {
    const newMonsters: MonsterModel[] = monsters.filter((monster) => !fights?.map((fight) => fight.monsterId).includes(monster.id));
    const hasKilledMonster: boolean = Boolean(fights?.find((fight) => fight.killed));

    return newMonsters.length > 0 || hasKilledMonster;
  };

  return (
    <AvatarContext.Consumer>
      {(avatarContext) => (
        <MonstersContext.Consumer>
          {(monstersContext) => (
            <View style={styles.container}>
              <View style={{ width: '100%', margin: '1%', flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: '5%' }}>
                {avatarContext.avatar?.fights
                  ?.filter((fight) => !fight.killed)
                  .map((fight, i) => {
                    const monster: MonsterModel | undefined = MonsterModel.getMonsterById(fight.monsterId, monstersContext.monsters);

                    return (
                      <View key={i} style={{ width: '50%', height: '50%', marginBottom: '10%', alignItems: 'center' }}>
                        <FightIcon
                          fight={fight}
                          monster={monster}
                          fights={avatarContext.avatar.fights}
                          updateDailyFight={avatarContext.updateDailyFight}
                          killMonster={avatarContext.killMonster}
                        />
                        <Text h5 key={i + 'name'} style={{ color: 'black' }}>
                          {monster?.name}
                        </Text>
                      </View>
                    );
                  })}
                <View style={{ width: '50%', height: '20%', marginBottom: '2%', alignItems: 'center' }}>
                  <Icon
                    key={'plus'}
                    disabled={!canAddNewFights(avatarContext.avatar.fights, monstersContext.monsters)}
                    reverse
                    name={'plus'}
                    size={50}
                    onPress={() => goToFightsAddScreen()}
                    iconStyle={{ color: 'white' }}
                    type='font-awesome-5'
                    color={'grey'}
                  />
                </View>
              </View>
            </View>
          )}
        </MonstersContext.Consumer>
      )}
    </AvatarContext.Consumer>
  );
}
