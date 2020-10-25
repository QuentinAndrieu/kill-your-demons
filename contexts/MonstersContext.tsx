import * as React from 'react';
import { MonsterModel } from '../models/MonsterModel';

export const monsters: MonsterModel[] = [];

export const MonstersContext = React.createContext({ monsters });
