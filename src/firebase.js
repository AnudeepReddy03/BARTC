// import firebase from 'firebase/compat/app';
// import {getAuth} from 'firebase/auth';
// // import {getStorage} from 'firebase/storage';
import 'firebase/compat/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDtTZWbb2oMLK5QWQgyMtWuqUdEsT_KxF4",
  authDomain: "art-1-b5d07.firebaseapp.com",
  databaseURL: "https://art-1-b5d07-default-rtdb.firebaseio.com",
  projectId: "art-1-b5d07",
  storageBucket: "art-1-b5d07.appspot.com",
  messagingSenderId: "450959061279",
  appId: "1:450959061279:web:bc4e5dc086dbe5e6b2c02a"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();


export {auth,firebase,database,storage,db};

// const app = firebase.initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = firebase.firestore();
// // const storage = getStorage(app);
// const database = firebase.database();