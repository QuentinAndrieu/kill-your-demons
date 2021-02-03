import firebase from 'firebase/app';
import 'firebase/firestore';

import { AvatarFightModel, AvatarModel, DayFighting } from '../models/AvatarModel';

export class AvatarFirestore {
  static createAvatar(avatar: AvatarModel): Promise<void> {
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
  }

  static loadAvatar(userId: string): Promise<AvatarModel> {
    return this.getAvatarCollectionByUserId(userId)
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
  }

  static updateDailyFight(avatar: AvatarModel, monsterId: string | undefined, active: boolean, date: string): Promise<AvatarModel> {
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

    return this.getAvatarCollectionByUserId(avatar.userId).then((response) => {
      return this.getAvatarCollectionByDocumentId(response.docs[0].id)
        .update(updatedAvatar)
        .then(() => updatedAvatar)
        .catch((error: any) => {
          console.log('Error updateDailyFight:', error);
          return error;
        });
    });
  }

  static addFight(avatar: AvatarModel, fight: AvatarFightModel): Promise<AvatarModel> {
    const updatedAvatar: AvatarModel = { ...avatar };

    if (!updatedAvatar.fights) {
      updatedAvatar.fights = [];
    }

    updatedAvatar.fights.push(Object.assign({}, fight));

    return this.getAvatarCollectionByUserId(avatar.userId).then((response) => {
      return this.getAvatarCollectionByDocumentId(response.docs[0].id)
        .update(updatedAvatar)
        .then(() => updatedAvatar)
        .catch((error: any) => {
          console.log('Error adding fight:', error);
          return error;
        });
    });
  }

  static killMonster(avatar: AvatarModel, monsterId: string | undefined): Promise<AvatarModel> {
    return this.updateStateKill(avatar, monsterId, true);
  }

  static resurrectMonster(avatar: AvatarModel, monsterId: string | undefined): Promise<AvatarModel> {
    return this.updateStateKill(avatar, monsterId, false);
  }

  private static getAvatarCollectionByUserId(userId: string) {
    return firebase.firestore().collection('avatars').where('userId', '==', userId).get();
  }

  private static getAvatarCollectionByDocumentId(docId: string) {
    return firebase.firestore().collection('avatars').doc(docId);
  }

  private static updateStateKill(avatar: AvatarModel, monsterId: string | undefined, killed: boolean): Promise<AvatarModel> {
    return new Promise((resolve, reject) => {
      const updatedAvatar: AvatarModel = { ...avatar };
      const fight: AvatarFightModel | undefined = updatedAvatar.fights.find((fight) => fight.monsterId === monsterId);

      if (fight) {
        fight.killed = killed;
      }

      this.getAvatarCollectionByUserId(avatar.userId).then((response) => {
        return this.getAvatarCollectionByDocumentId(response.docs[0].id)
          .update(updatedAvatar)
          .then(() => resolve(updatedAvatar))
          .catch((error: any) => {
            reject();
            console.log('Error updating fight:', error);
            return error;
          });
      });
    });
  }
}
