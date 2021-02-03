import { AvatarFightModel, AvatarModel } from '../../../models/AvatarModel';
import { MonsterModel } from '../../../models/MonsterModel';
import * as React from 'react';
import { Icon, Text } from 'react-native-elements';
import { ActivityIndicator, View } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import { MonsterDetailOverlay } from './MonsterDetailOverlay';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
};
LocaleConfig.defaultLocale = 'fr';

enum FightsScreenStateModel {
  ICON = 'ICON',
  PV = 'PV',
  KILL = 'KILL',
  LOADING = 'LOADING',
}

export class FightIcon extends React.Component<
  {
    monster: MonsterModel | undefined;
    fights: AvatarFightModel[];
    fight: AvatarFightModel;
    updateDailyFight: (monsterId: string | undefined, active: boolean, date: string) => Promise<AvatarModel>;
    killMonster: (monsterId: string | undefined) => Promise<AvatarModel>;
  },
  { stateFight: FightsScreenStateModel; displayDetailOverlay: boolean }
> {
  constructor(props: {
    monster: MonsterModel | undefined;
    fights: AvatarFightModel[];
    fight: AvatarFightModel;
    updateDailyFight: (monsterId: string | undefined, active: boolean, date: string) => Promise<AvatarModel>;
    killMonster: (monsterId: string | undefined) => Promise<AvatarModel>;
  }) {
    super(props);

    this.state = {
      stateFight: FightsScreenStateModel.ICON,
      displayDetailOverlay: false,
    };

    this.displayOverlayDetail = this.displayOverlayDetail.bind(this);
    this.hideOverlayDetail = this.hideOverlayDetail.bind(this);
  }

  private getNewState(currentState: FightsScreenStateModel): FightsScreenStateModel {
    switch (currentState) {
      case FightsScreenStateModel.ICON: {
        return FightsScreenStateModel.PV;
      }
      case FightsScreenStateModel.PV: {
        return FightsScreenStateModel.KILL;
      }
      default: {
        return FightsScreenStateModel.ICON;
      }
    }
  }

  private displayOverlayDetail() {
    this.setState({ displayDetailOverlay: true });
  }

  private hideOverlayDetail() {
    this.setState({ displayDetailOverlay: false });
  }

  render() {
    switch (this.state.stateFight) {
      case FightsScreenStateModel.ICON: {
        return (
          <Icon
            key={`${this.props.monster?.id}icon`}
            reverse
            name={this.props.monster?.icon}
            size={50}
            iconStyle={{ color: 'white' }}
            type='font-awesome-5'
            raised={true}
            color={
              AvatarModel.hasBeenDone(this.props.fights, this.props.monster?.id, AvatarModel.formatDateFight(new Date())) ? 'black' : 'grey'
            }
            onPress={() => this.setState({ stateFight: this.getNewState(this.state.stateFight) })}
            onLongPress={() => {
              this.setState({ stateFight: FightsScreenStateModel.LOADING });
              this.props
                .updateDailyFight(
                  this.props.monster?.id,
                  !AvatarModel.hasBeenDone(this.props.fights, this.props.monster?.id, AvatarModel.formatDateFight(new Date())),
                  AvatarModel.formatDateFight(new Date())
                )
                .then(() => this.setState({ stateFight: FightsScreenStateModel.ICON }));
            }}
          />
        );
      }
      case FightsScreenStateModel.PV: {
        return (
          <View>
            <Icon
              key={`${this.props.monster?.id}detail`}
              reverse
              name={'file-alt'}
              size={50}
              iconStyle={{ color: 'white' }}
              type='font-awesome-5'
              color={'grey'}
              onPress={() => this.setState({ stateFight: this.getNewState(this.state.stateFight) })}
              onLongPress={() => this.displayOverlayDetail()}
            />

            <MonsterDetailOverlay
              monster={this.props.monster}
              fight={this.props.fight}
              displayDetailOverlay={this.state.displayDetailOverlay}
              hideOverlayDetail={this.hideOverlayDetail}
              updateDailyFight={this.props.updateDailyFight}
              fights={this.props.fights}
            ></MonsterDetailOverlay>
          </View>
        );
      }
      case FightsScreenStateModel.LOADING: {
        return (
          <View style={{ justifyContent: 'center', flexDirection: 'row', height: 118 }}>
            <ActivityIndicator size='large' color='black' />
          </View>
        );
      }
      case FightsScreenStateModel.KILL: {
        return (
          <Icon
            key={`${this.props.monster?.id}kill`}
            reverse
            name={'skull'}
            size={50}
            iconStyle={{ color: 'white' }}
            type='font-awesome-5'
            color={'red'}
            onPress={() => this.setState({ stateFight: this.getNewState(this.state.stateFight) })}
            onLongPress={() => this.props.killMonster(this.props.monster?.id)}
          />
        );
      }
    }
  }
}
