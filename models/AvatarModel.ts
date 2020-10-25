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
  daysFightings: DayFighting[];
  pv: number;
}

export class DayFighting {
  date: string;
  active: boolean;
}
