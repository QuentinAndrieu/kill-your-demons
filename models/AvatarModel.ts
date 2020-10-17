import { MonsterModel } from './MonsterModel';

export class AvatarModel {
  id: string;
  name: string;
  pv: number;
  pvTotal: number;
  fights: AvatarFightModel[];
}

export class AvatarFightModel {
  monsterId: string;
  daysFighting: DayFighting[];
  pv: number;
}

export class DayFighting {
  date: Date;
  active: boolean;
}
