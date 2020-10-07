import { MonsterModel } from './MonsterModel';

export class AvatarModel {
  id: string;
  name: string;
  pv: number;
  pvTotal: number;
  fights: AvatarFightModel[];
}

class AvatarFightModel {
  monster: MonsterModel;
  pv: number;
}
