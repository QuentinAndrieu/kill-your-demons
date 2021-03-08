import firebase from 'firebase/app';
import 'firebase/firestore';

import { AvatarFightModel, AvatarModel, DayFighting } from '../models/AvatarModel';

export const createAvatarFromCloud = (avatar: AvatarModel): Promise<void> => {
  return firebase
    .firestore()
    .collection('avatars')
    .doc()
    .set(Object.assign({}, avatar))
    .then(() => {
      console.log('Avatar created:');
    })
    .catch((error: any) => {
      console.log('Error add Avatar:', error);
    });
};

export const loadAvatarFromCloud = (userId: string): Promise<AvatarModel> => {
  return getAvatarCollectionByUserIdFromCloud(userId)
    .then((querySnapshot: any) => {
      const avatars: AvatarModel[] = [];
      querySnapshot.forEach((doc: any) => {
        avatars.push(doc.data());
      });

      if (!avatars[0]) {
        console.log(' No avatar !!');

        throw 'No avatar';
      }

      return avatars[0];
    })
    .catch((error: any) => {
      console.log('Error getting avatar:', error);

      return error;
    });
};

export const updateDailyFromCloud = (avatar: AvatarModel, monsterId: string | undefined, active: boolean, date: string): Promise<AvatarModel> => {
  const updatedAvatar: AvatarModel = { ...avatar };
  const fight: AvatarFightModel | undefined = updatedAvatar.fights.find((fight) => fight.monsterId === monsterId);
  const dayFighting: DayFighting | undefined = fight?.daysFightings?.find((day) => day.date === date);

  if (dayFighting) {
    dayFighting.active = active;
  } else if (fight?.daysFightings) {
    fight.daysFightings.push({ date, active });
  } else if (fight) {
    fight.daysFightings = [{ date, active }];
  }

  return getAvatarCollectionByUserIdFromCloud(avatar.userId).then((response) => {
    return getAvatarCollectionByDocumentIdFromCloud(response.docs[0].id)
      .update(updatedAvatar)
      .then(() => updatedAvatar)
      .catch((error: any) => {
        console.log('Error updateDailyFight:', error);
        return error;
      });
  });
};

export const addFightFromCloud = (avatar: AvatarModel, fight: AvatarFightModel): Promise<AvatarModel> => {
  const updatedAvatar: AvatarModel = { ...avatar };

  if (!updatedAvatar.fights) {
    updatedAvatar.fights = [];
  }

  updatedAvatar.fights.push(Object.assign({}, fight));

  return getAvatarCollectionByUserIdFromCloud(avatar.userId).then((response) => {
    return getAvatarCollectionByDocumentIdFromCloud(response.docs[0].id)
      .update(updatedAvatar)
      .then(() => updatedAvatar)
      .catch((error: any) => {
        console.log('Error adding fight:', error);
        return error;
      });
  });
};

export const killMonsterFromCloud = (avatar: AvatarModel, monsterId: string | undefined): Promise<AvatarModel> => {
  return updateStateKillFromCloud(avatar, monsterId, true);
};

export const resurrectMonsterFromCloud = (avatar: AvatarModel, monsterId: string | undefined): Promise<AvatarModel> => {
  return updateStateKillFromCloud(avatar, monsterId, false);
};

export const getAvatarCollectionByUserIdFromCloud = (userId: string) => {
  return firebase.firestore().collection('avatars').where('userId', '==', userId).get();
};

export const getAvatarCollectionByDocumentIdFromCloud = (docId: string) => {
  return firebase.firestore().collection('avatars').doc(docId);
};

export const updateStateKillFromCloud = (avatar: AvatarModel, monsterId: string | undefined, killed: boolean): Promise<AvatarModel> => {
  return new Promise((resolve, reject) => {
    const updatedAvatar: AvatarModel = { ...avatar };
    const fight: AvatarFightModel | undefined = updatedAvatar.fights.find((fight) => fight.monsterId === monsterId);

    if (fight) {
      fight.killed = killed;
    }

    getAvatarCollectionByUserIdFromCloud(avatar.userId).then((response) => {
      return getAvatarCollectionByDocumentIdFromCloud(response.docs[0].id)
        .update(updatedAvatar)
        .then(() => resolve(updatedAvatar))
        .catch((error: any) => {
          reject();
          console.log('Error updating fight:', error);
          return error;
        });
    });
  });
};
