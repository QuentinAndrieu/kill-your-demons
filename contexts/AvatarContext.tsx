import * as React from 'react';

import { AvatarFightModel, AvatarModel } from '../models/AvatarModel';

export const avatar: AvatarModel = {
  id: 'Bcng4MyPHBbUUW5ZQFaf',
  name: '',
  pv: 0,
  pvTotal: 0,
  fights: [],
};

export const AvatarContext = React.createContext({
  avatar,
  updateDailyFight: (monsterId: string | undefined, active: boolean, date: string | undefined): void => {},
  killMonster: (monsterId: string | undefined): void => {},
  resurrectMonster: (monsterId: string | undefined): void => {},
  addFight: (fight: AvatarFightModel): void => {},
});
