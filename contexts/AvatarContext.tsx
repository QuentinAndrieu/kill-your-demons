import * as React from 'react';

import { AvatarModel } from '../models/AvatarModel';

export const avatar: AvatarModel = {
  id: 'Bcng4MyPHBbUUW5ZQFaf',
  name: '',
  pv: 0,
  pvTotal: 0,
  fights: [],
};

export const AvatarContext = React.createContext({
  avatar,
  updateFight: (monsterId: string | undefined, active: boolean, date: string | undefined) => {},
});
