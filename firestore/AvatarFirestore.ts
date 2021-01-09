import firebase from 'firebase/app';
import 'firebase/firestore';

import { AvatarFightModel, AvatarModel, DayFighting } from '../models/AvatarModel';

export class AvatarFirestore {
  static loadAvatarFromCloud(): Promise<AvatarModel> {
    return new Promise((resolve, reject) => {
      const avatarCloud = firebase.firestore().collection('avatars').doc('Bcng4MyPHBbUUW5ZQFaf');
      avatarCloud
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            resolve(doc.data());
          } else {
            console.log('No avatar !!');

            reject();
          }
        })
        .catch((error: any) => {
          reject();
          console.log('Error getting avatar:', error);
        });
    });
  }

  static updateDailyFight(avatar: AvatarModel, monsterId: string | undefined, active: boolean, date: string): Promise<AvatarModel> {
    return new Promise((resolve, reject) => {
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

      const avatarCloud = firebase.firestore().collection('avatars').doc('Bcng4MyPHBbUUW5ZQFaf');
      avatarCloud
        .update(updatedAvatar)
        .then(() => resolve(updatedAvatar))
        .catch((error: any) => {
          reject();
          console.log('Error updating fight:', error);
        });
    });
  }

  static addFight(avatar: AvatarModel, fight: AvatarFightModel): Promise<AvatarModel> {
    return new Promise((resolve, reject) => {
      const updatedAvatar: AvatarModel = { ...avatar };

      if (!updatedAvatar.fights) {
        updatedAvatar.fights = [];
      }

      updatedAvatar.fights.push(Object.assign({}, fight));

      const avatarCloud = firebase.firestore().collection('avatars').doc('Bcng4MyPHBbUUW5ZQFaf');
      avatarCloud
        .update(updatedAvatar)
        .then(() => resolve(updatedAvatar))
        .catch((error: any) => {
          reject();
          console.log('Error adding fight:', error);
        });
    });
  }

  static killMonster(avatar: AvatarModel, monsterId: string | undefined): Promise<AvatarModel> {
    return AvatarFirestore.updateStateKill(avatar, monsterId, true);
  }

  static resurrectMonster(avatar: AvatarModel, monsterId: string | undefined): Promise<AvatarModel> {
    return AvatarFirestore.updateStateKill(avatar, monsterId, false);
  }

  private static updateStateKill(avatar: AvatarModel, monsterId: string | undefined, killed: boolean): Promise<AvatarModel> {
    return new Promise((resolve, reject) => {
      const updatedAvatar: AvatarModel = { ...avatar };
      const fight: AvatarFightModel | undefined = updatedAvatar.fights.find((fight) => fight.monsterId === monsterId);

      if (fight) {
        fight.killed = killed;
      }

      const avatarCloud = firebase.firestore().collection('avatars').doc('Bcng4MyPHBbUUW5ZQFaf');
      avatarCloud
        .update(avatar)
        .then(() => resolve(avatar))
        .catch((error: any) => {
          reject();
          console.log('Error updating state killed:', error);
        });
    });
  }
}
