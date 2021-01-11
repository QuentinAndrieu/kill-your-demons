import { AvatarFightModel, AvatarModel } from '../../../models/AvatarModel';
import { MonsterModel, MonsterState } from '../../../models/MonsterModel';
import * as React from 'react';
import { Icon, Image, Overlay, Text } from 'react-native-elements';
import { ActivityIndicator, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
};
LocaleConfig.defaultLocale = 'fr';

export class MonsterDetailOverlay extends React.Component<
  {
    monster: MonsterModel | undefined;
    fight: AvatarFightModel;
    fights: AvatarFightModel[];
    displayDetailOverlay: boolean;
    hideOverlayDetail: () => void;
    updateDailyFight: (monsterId: string | undefined, active: boolean, date: string) => void;
  },
  {}
> {
  constructor(props: {
    monster: MonsterModel | undefined;
    fight: AvatarFightModel;
    fights: AvatarFightModel[];
    displayDetailOverlay: boolean;
    hideOverlayDetail: () => void;
    updateDailyFight: (monsterId: string | undefined, active: boolean, date: string) => void;
  }) {
    super(props);

    this.state = {};
  }

  private getMarkedDatesFightDays(fight: AvatarFightModel) {
    const fightDaysMap = new Map(
      fight.daysFightings.map((day) => [day.date, { selected: day.active, marked: day.active, selectedColor: 'black' }])
    );

    return { ...Object.fromEntries(fightDaysMap) };
  }

  private getSourceStateMonsterFight() {
    const stateMonsterFight: MonsterState | undefined = AvatarModel.getStateMonsterFight(this.props.fight, this.props.monster);

    switch (stateMonsterFight?.maxPV) {
      case 100: {
        return require(`./../../../images/diable-cigarette.jpg`);
      }
      case 69: {
        return require(`./../../../images/sad-cigarette.jpg`);
      }
      case 29: {
        return require(`./../../../images/dead-cigarette.jpg`);
      }
      default: {
        return require(`./../../../images/diable-cigarette.jpg`);
      }
    }
  }

  render() {
    return (
      <Overlay isVisible={this.props.displayDetailOverlay} fullScreen={true}>
        <View style={{ flexDirection: 'column' }}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              height: '10%',
              width: '100%',
              paddingTop: '8%',
            }}
          >
            <View style={{ width: '10%' }}>
              <Icon
                key={`${this.props.monster?.id}icon`}
                reverse
                name={this.props.monster?.icon}
                size={10}
                iconStyle={{ color: 'white' }}
                type='font-awesome-5'
                color={'black'}
              />
            </View>
            <View style={{ width: '75%' }}>
              <Text h4 key={`${this.props.monster?.id}name`} style={{ color: 'black', fontWeight: 'bold', paddingTop: '1.2%' }}>
                {this.props.monster?.name}
              </Text>
            </View>

            <View style={{ width: '15%', marginTop: -15 }}>
              <Icon
                key={`${this.props.monster?.id}times`}
                reverse
                name={'times'}
                size={20}
                iconStyle={{ color: 'black' }}
                type='font-awesome-5'
                color={'white'}
                onPress={() => this.props.hideOverlayDetail()}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-start', height: '50%', width: '100%' }}>
            <View style={{ width: '55%', height: '100%' }}>
              <Image
                source={this.getSourceStateMonsterFight()}
                style={{ width: '100%', height: '100%' }}
                resizeMode='stretch'
                PlaceholderContent={<ActivityIndicator />}
              ></Image>
            </View>
            <View style={{ flexDirection: 'column', alignSelf: 'flex-start', width: '45%' }}>
              <Text key={`${this.props.monster?.id}pv`} style={{ color: 'black' }}>
                PV: {AvatarModel.getPV(this.props.fight)} / 100
              </Text>
              <Text key={`${this.props.monster?.id}description`} style={{ color: 'black', fontWeight: 'bold', marginTop: '5%' }}>
                {this.props.monster?.description}
              </Text>
            </View>
          </View>

          <View
            style={{
              height: '40%',
              width: '100%',
            }}
          >
            <Calendar
              hideDayNames={true}
              markedDates={this.getMarkedDatesFightDays(this.props.fight)}
              onDayPress={(day) => {
                this.props.updateDailyFight(
                  this.props.monster?.id,
                  !AvatarModel.hasBeenDone(this.props.fights, this.props.monster?.id, day.dateString),
                  day.dateString
                );
              }}
            />
          </View>
        </View>
      </Overlay>
    );
  }
}
