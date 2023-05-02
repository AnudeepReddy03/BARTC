// import firebase from 'firebase/compat/app';
// import {getAuth} from 'firebase/auth';
// // import {getStorage} from 'firebase/storage';
import 'firebase/compat/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  
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
