import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, doc, setDoc, updateDoc, increment, getDoc } 
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDI7b7BqUopaBfTC-P0vE1o5PVX3ustFOw",
  authDomain: "xmusic-eb387.firebaseapp.com",
  projectId: "xmusic-eb387",
  storageBucket: "xmusic-eb387.firebasestorage.app",
  messagingSenderId: "758209934631",
  appId: "1:758209934631:web:cac68b8b63245c7e172502",
  measurementId: "G-WGV1FXD6EW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const songRef = doc(db, "views", songId);

const snap = await getDoc(songRef);

if (snap.exists()) {
  await updateDoc(songRef, {
    views: increment(1)
  });
} else {
  await setDoc(songRef, {
    views: 1
  });
}
