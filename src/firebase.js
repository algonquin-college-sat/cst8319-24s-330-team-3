import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDfXjc7seZBW6qS9GZasccRGwwbgDAC57c",
  authDomain: "liveconnect-fc035.firebaseapp.com",
  databaseURL: "https://liveconnect-fc035-default-rtdb.firebaseio.com",
  projectId: "liveconnect-fc035",
  storageBucket: "liveconnect-fc035.appspot.com",
  messagingSenderId: "265782230103",
  appId: "1:265782230103:web:fac9234d4ad178071cb712",
  measurementId: "G-F8F66EEGKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const realtimeDb = getDatabase(app);

export { auth, db, realtimeDb };



