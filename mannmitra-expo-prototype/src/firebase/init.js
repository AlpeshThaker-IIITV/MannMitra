import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.EXPO_FIREBASE_API_KEY,
  authDomain: Constants.expoConfig.extra.EXPO_FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig.extra.EXPO_FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig.extra.EXPO_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig.extra.EXPO_FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig.extra.EXPO_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const ensureAnonymousAuth = async () => {
  try { await signInAnonymously(auth); } catch (e) { console.log('Auth err', e.message); }
};
