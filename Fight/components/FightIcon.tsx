import { AvatarFightModel, AvatarModel } from '../../shared/models/AvatarModel';
import { MonsterModel } from '../../shared/models/MonsterModel';
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

export function FightIcon(props: {
  monster: MonsterModel | undefined;
  fights: AvatarFightModel[];
  fight: AvatarFightModel;
  updateDailyFight: (monsterId: string | undefined, active: boolean, date: string) => Promise<AvatarModel>;
  killMonster: (monsterId: string | undefined) => Promise<AvatarModel>;
}) {
  const [stateFight, setStateFight] = React.useState<FightsScreenStateModel>(FightsScreenStateModel.ICON);
  const [displayDetailOverlay, setDisplayDetailOverlay] = React.useState<boolean>(false);

  const getNewState = (currentState: FightsScreenStateModel): FightsScreenStateModel => {
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
  };

  const displayOverlayDetail = () => {
    setDisplayDetailOverlay(true);
  };

  const hideOverlayDetail = () => {
    setDisplayDetailOverlay(false);
  };

  switch (stateFight) {
    case FightsScreenStateModel.ICON: {
      return (
        <Icon
          key={`${props.monster?.id}icon`}
          reverse
          name={props.monster?.icon}
          size={50}
          iconStyle={{ color: 'white' }}
          type='font-awesome-5'
          raised={true}
          color={AvatarModel.hasBeenDone(props.fights, props.monster?.id, AvatarModel.formatDateFight(new Date())) ? 'black' : 'grey'}
          onPress={() => setStateFight(getNewState(stateFight))}
          onLongPress={() => {
            setStateFight(FightsScreenStateModel.LOADING);
            props
              .updateDailyFight(
                props.monster?.id,
                !AvatarModel.hasBeenDone(props.fights, props.monster?.id, AvatarModel.formatDateFight(new Date())),
                AvatarModel.formatDateFight(new Date())
              )
              .then(() => setStateFight(FightsScreenStateModel.ICON));
          }}
        />
      );
    }
    case FightsScreenStateModel.PV: {
      return (
        <View>
          <Icon
            key={`${props.monster?.id}detail`}
            reverse
            name={'file-alt'}
            size={50}
            iconStyle={{ color: 'white' }}
            type='font-awesome-5'
            color={'grey'}
            onPress={() => setStateFight(getNewState(stateFight))}
            onLongPress={() => displayOverlayDetail()}
          />

          <MonsterDetailOverlay
            monster={props.monster}
            fight={props.fight}
            displayDetailOverlay={displayDetailOverlay}
            hideOverlayDetail={hideOverlayDetail}
            updateDailyFight={props.updateDailyFight}
            fights={props.fights}
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
          key={`${props.monster?.id}kill`}
          reverse
          name={'skull'}
          size={50}
          iconStyle={{ color: 'white' }}
          type='font-awesome-5'
          color={'red'}
          onPress={() => setStateFight(getNewState(stateFight))}
          onLongPress={() => props.killMonster(props.monster?.id)}
        />
      );
    }
  }
}
