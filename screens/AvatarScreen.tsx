import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { AvatarModel, DayFighting } from '../models/AvatarModel';
import StyleScreen from '../constants/StyleScreen';
import { Card, Icon } from 'react-native-elements';
import { MonsterModel } from '../models/MonsterModel';
import moment from 'moment';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class AvatarScreen extends React.Component<{ avatar: AvatarModel; monsters: MonsterModel[] }, {}> {
  constructor(props: { avatar: AvatarModel; monsters: MonsterModel[] }) {
    super(props);
  }

  getMonsterById(monsterId: string): MonsterModel | undefined {
    return this.props.monsters.find((monster) => monster.id === monsterId);
  }

  hasBeenDone(monsterId: string): boolean {
    const todayFightingDay: DayFighting | undefined = this.props.avatar.fights
      .find((fight) => fight.monsterId === monsterId)
      ?.daysFighting.find((day) => moment(day.date).isSame(new Date()));

    return todayFightingDay?.active || false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./images/avatar.jpg')} resizeMode='cover' style={{ width: '100%', height: '70%' }} />
        {/* <Card
          containerStyle={{ width: '100%', height: '70%', margin: '0%', padding: '0%', backgroundColor: 'black', borderColor: 'black' }}
        >
          <Card.Title>{this.props.avatar.name}</Card.Title>
        </Card> */}

        <Card containerStyle={{ width: '100%', height: '15%', margin: '0%', backgroundColor: 'black', borderColor: 'black' }}>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
            {this.props.avatar?.fights?.map((fight, i) => {
              const monster: MonsterModel | undefined = this.getMonsterById(fight.monsterId);

              return (
                <Icon
                  key={i}
                  reverse
                  name={monster?.icon}
                  type='font-awesome-5'
                  color={monster && this.hasBeenDone(monster.id) ? 'red' : 'grey'}
                  onPress={() => console.log('hello')}
                />
              );
            })}
          </View>
        </Card>
      </View>
    );
  }
}
