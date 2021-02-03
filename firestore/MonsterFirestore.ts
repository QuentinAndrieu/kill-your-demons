import firebase from 'firebase/app';
import 'firebase/firestore';

import { MonsterModel } from '../models/MonsterModel';

export class MonsterFirestore {
  static loadMonstersFromCloud(): Promise<MonsterModel[]> {
    return firebase
      .firestore()
      .collection('monsters')
      .get()
      .then((querySnapshot: any) => {
        const monsters: MonsterModel[] = [];
        querySnapshot.forEach((doc: any) => {
          let monster = doc.data();
          monster = { ...monster, id: doc.id };
          monsters.push(monster);
        });
        return monsters;
      })
      .catch((error: any) => {
        console.log('Error getting monsters:', error);
        return error;
      });
  }
}
