
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCkINGw-Q5_51O7sY-iFYIFbb6Bqr85-Cc',
  authDomain: 'instagram-5e064.firebaseapp.com',
  projectId: 'instagram-5e064',
  storageBucket: 'instagram-5e064.appspot.com',
  messagingSenderId: '398779687914',
  appId: '1:398779687914:web:3f4d624e2179199471c893',
  measurementId: 'G-J0WYMGF6VJ',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
