import firebase from 'firebase/app';
import 'firebase/auth';

export const signUp = (email: string, password: string): Promise<any> => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signOut = () => {
  return firebase.auth().signOut();
};

export const signIn = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};
