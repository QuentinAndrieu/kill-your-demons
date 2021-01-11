import { User } from 'firebase';
import * as React from 'react';

export const user: User | null = null;

export const UserContext = React.createContext({
  user,
});
