import * as React from 'react';

import { AvatarFightModel, AvatarModel } from '../models/AvatarModel';

export const avatar: AvatarModel = {
  id: '',
  userId: '',
  name: '',
  pv: 0,
  pvTotal: 0,
  createdAt: new Date(),
  fights: [],
};

export const AvatarContext = React.createContext({
  avatar,
  updateDailyFight: (monsterId: string | undefined, active: boolean, date: string): any => {},
  killMonster: (monsterId: string | undefined): any => {},
  resurrectMonster: (monsterId: string | undefined): any => {},
  addFight: (fight: AvatarFightModel): any => {},
});
