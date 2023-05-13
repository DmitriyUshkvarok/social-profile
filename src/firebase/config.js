// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB-oOLmdeAeLdgJCH7Id7Y0qsTVz2umiaY',
  authDomain: 'social-profile-29865.firebaseapp.com',
  projectId: 'social-profile-29865',
  databaseURL: 'https://social-profile-29865.firebaseio.com',
  storageBucket: 'social-profile-29865.appspot.com',
  messagingSenderId: '605019429432',
  appId: '1:605019429432:web:e7483c12eb1abf27c1e4cd',
  measurementId: 'G-RXXQRW50XT',
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
