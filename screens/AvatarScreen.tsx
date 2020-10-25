import * as React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { AvatarFightModel, AvatarModel, DayFighting } from '../models/AvatarModel';
import StyleScreen from '../constants/StyleScreen';
import { Icon } from 'react-native-elements';
import { MonsterModel } from '../models/MonsterModel';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { AvatarContext } from '../contexts/AvatarContext';
import { MonstersContext } from '../contexts/MonstersContext';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class AvatarScreen extends React.Component {
  constructor(props: {}) {
    super(props);

    console.log('context', this.context);
  }

  getMonsterById(monsterId: string, monsters: MonsterModel[]): MonsterModel | undefined {
    return monsters.find((monster) => monster.id === monsterId);
  }

  hasBeenDone(avatar: AvatarModel, monsterId: string | undefined): boolean {
    const fight: AvatarFightModel | undefined = avatar.fights.find((fight) => fight.monsterId === monsterId);
    const todayFightingDay: DayFighting | undefined = fight?.daysFightings?.find((day) => day.date === this.formatDate(new Date()));

    return todayFightingDay?.active || false;
  }

  formatDate(date: Date): string | undefined {
    return moment(date).format('DD-MM-YYYY');
  }

  render() {
    return (
      <AvatarContext.Consumer>
        {(avatarContext) => (
          <MonstersContext.Consumer>
            {(monstersContext) => (
              <View style={styles.container}>
                <View style={{ width: '100%', height: '85%' }}>
                  <ImageBackground source={require('./images/avatar.jpg')} style={{ width: '100%', height: '100%' }}>
                    <View
                      style={{
                        width: '20%',
                        height: '100%',
                        marginTop: '5%',
                        backgroundColor: 'transparent',
                        flexDirection: 'column',
                        alignSelf: 'flex-end',
                      }}
                    >
                      {avatarContext.avatar.fights?.map((fight, i) => {
                        const monster: MonsterModel | undefined = this.getMonsterById(fight.monsterId, monstersContext.monsters);
                        return (
                          <Icon
                            key={i}
                            reverse
                            name={monster?.icon}
                            size={24}
                            iconStyle={{ color: 'red' }}
                            type='font-awesome-5'
                            color={'gold'}
                          />
                        );
                      })}
                    </View>
                  </ImageBackground>
                </View>
                <View style={{ width: '100%', height: '10%', marginTop: '5%' }}>
                  <ScrollView horizontal={true} style={{ flexDirection: 'row', alignSelf: 'flex-start', width: '100%' }}>
                    {avatarContext.avatar?.fights?.map((fight, i) => {
                      const monster: MonsterModel | undefined = this.getMonsterById(fight.monsterId, monstersContext.monsters);

                      return (
                        <Icon
                          key={i}
                          reverse
                          name={monster?.icon}
                          size={24}
                          iconStyle={{ color: this.hasBeenDone(avatarContext.avatar, monster?.id) ? 'black' : 'lightgrey' }}
                          type='font-awesome-5'
                          color={this.hasBeenDone(avatarContext.avatar, monster?.id) ? 'white' : 'grey'}
                          onPress={() =>
                            avatarContext.updateFight(
                              monster?.id,
                              !this.hasBeenDone(avatarContext.avatar, monster?.id),
                              this.formatDate(new Date())
                            )
                          }
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            )}
          </MonstersContext.Consumer>
        )}
      </AvatarContext.Consumer>
    );
  }
}
