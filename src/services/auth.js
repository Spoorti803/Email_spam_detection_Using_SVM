import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

// Sign up a user
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up: ', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up: ', error.message);
    throw new Error(error.message);
  }
  
};

// Sign in a user
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in: ', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in: ', error.message);
    throw new Error(error.message);
  }
};

// Log out the user
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out: ', error.message);
    throw new Error(error.message);
  }
};
