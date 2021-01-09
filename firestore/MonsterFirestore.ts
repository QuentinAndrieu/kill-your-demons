import firebase from 'firebase/app';
import 'firebase/firestore';

import { MonsterModel } from '../models/MonsterModel';

export class MonsterFirestore {
  static loadMonstersFromCloud(): Promise<MonsterModel[]> {
    return new Promise((resolve, reject) => {
      const monstersCloud = firebase.firestore().collection('monsters');
      const monsters: MonsterModel[] = [];
      monstersCloud
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            let monster = doc.data();
            monster = { ...monster, id: doc.id };
            monsters.push(monster);
          });
          resolve(monsters);
        })
        .catch((error: any) => {
          reject();
          console.log('Error getting monsters:', error);
        });
    });
  }
}
