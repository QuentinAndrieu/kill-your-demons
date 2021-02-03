import firebase from 'firebase/app';
import 'firebase/auth';

export class AuthFirestore {
  static signUp(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  static signOut() {
    return firebase.auth().signOut();
  }

  static signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}
