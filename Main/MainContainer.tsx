import * as React from 'react';
import firebase, { User } from 'firebase/app';
import 'firebase/auth';
import { AvatarFightModel, AvatarModel } from '../shared/models/AvatarModel';
import { MonsterModel } from '../shared/models/MonsterModel';
import { AvatarContext } from '../shared/contexts/AvatarContext';
import { UserContext } from '../shared/contexts/UserContext';
import { MonstersContext } from '../shared/contexts/MonstersContext';
import { loadMonstersFromCloud } from '../shared/firestore/MonsterFirestore';
import {
  loadAvatarFromCloud,
  updateDailyFromCloud,
  createAvatarFromCloud,
  addFightFromCloud,
  killMonsterFromCloud,
  resurrectMonsterFromCloud,
} from '../shared/firestore/AvatarFirestore';

export function MainContainer(props: { children: any }) {
  const [avatar, setAvatar] = React.useState<AvatarModel>(new AvatarModel());
  const [monsters, setMonsters] = React.useState<MonsterModel[]>([]);
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = React.useState<boolean>(true);

  React.useEffect(() => {
    loadMonstersFromCloud().then((monsters: MonsterModel[]) => setMonsters(monsters));

    const onAuthStateChanged = firebase.auth().onAuthStateChanged((user: User | null) => {
      setUser(user);
      setIsLoadingUser(false);

      if (user) {
        loadAvatarFromCloud(user?.uid)
          .then((avatar: AvatarModel) => setAvatar(avatar))
          .catch(() => {
            const newAvatar: AvatarModel = new AvatarModel();
            newAvatar.id = firebase.firestore().collection('avatars').doc().id;
            newAvatar.userId = user.uid;
            newAvatar.fights = [];
            newAvatar.name = user.displayName;
            newAvatar.pvTotal = 100;
            newAvatar.pv = 100;
            newAvatar.createdAt = new Date();

            return createAvatarFromCloud(newAvatar).then(() =>
              loadAvatarFromCloud(user?.uid).then((avatar: AvatarModel) => {
                setAvatar(avatar);
              })
            );
          });
      }

      return onAuthStateChanged;
    });
  }, []);

  const updateDailyFight = (monsterId: string | undefined, active: boolean, date: string): Promise<AvatarModel> => {
    return updateDailyFromCloud(avatar, monsterId, active, date).then((avatar: AvatarModel) => {
      setAvatar(avatar);

      return avatar;
    });
  };

  const addFight = (fight: AvatarFightModel): Promise<AvatarModel> => {
    return addFightFromCloud(avatar, fight).then((avatar: AvatarModel) => {
      setAvatar(avatar);
      return avatar;
    });
  };

  const killMonster = (monsterId: string | undefined): Promise<AvatarModel> => {
    return killMonsterFromCloud(avatar, monsterId).then((avatar: AvatarModel) => {
      setAvatar(avatar);
      return avatar;
    });
  };

  const resurrectMonster = (monsterId: string | undefined): Promise<AvatarModel> => {
    return resurrectMonsterFromCloud(avatar, monsterId).then((avatar: AvatarModel) => {
      setAvatar(avatar);
      return avatar;
    });
  };

  return (
    <UserContext.Provider value={{ user: user, isLoading: isLoadingUser }}>
      <AvatarContext.Provider
        value={{
          avatar: avatar,
          updateDailyFight: updateDailyFight,
          addFight: addFight,
          killMonster: killMonster,
          resurrectMonster: resurrectMonster,
        }}
      >
        <MonstersContext.Provider value={{ monsters: monsters }}>{props.children}</MonstersContext.Provider>
      </AvatarContext.Provider>
    </UserContext.Provider>
  );
}
