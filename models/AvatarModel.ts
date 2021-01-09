import moment from 'moment';
import { MonsterModel, MonsterState } from './MonsterModel';

export class AvatarModel {
  id: string;
  name: string;
  pv: number;
  pvTotal: number;
  fights: AvatarFightModel[];

  static formatDateFight(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  static hasBeenDone(fights: AvatarFightModel[], monsterId: string | undefined, date: string): boolean {
    const fight: AvatarFightModel | undefined = fights.find((fight) => fight.monsterId === monsterId);
    const fightingDay: DayFighting | undefined = fight?.daysFightings?.find((day) => day.date === date);

    return fightingDay?.active || false;
  }

  static getPV(fight: AvatarFightModel) {
    return 100 - fight?.daysFightings.filter((days) => days.active).reduce((previousValue, currentValue) => previousValue + 5, 0);
  }

  static getStateMonsterFight(fight: AvatarFightModel, monster: MonsterModel | undefined): MonsterState | undefined {
    return monster?.states?.find((state) => AvatarModel.getPV(fight) <= state.maxPV && AvatarModel.getPV(fight) >= state.minPV);
  }
}

export class AvatarFightModel {
  monsterId: string;
  daysFightings: DayFighting[];
  pv: number;
  killed: boolean;
}

export class DayFighting {
  date: string;
  active: boolean;
}
