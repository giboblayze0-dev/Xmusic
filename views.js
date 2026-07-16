import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment 
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDI7b7BqUopaBfTC-P0vE1o5PVX3ustFOw",
  authDomain: "xmusic-eb387.firebaseapp.com",
  projectId: "xmusic-eb387",
  storageBucket: "xmusic-eb387.firebasestorage.app",
  messagingSenderId: "758209934631",
  appId: "1:758209934631:web:cac68b8b63245c7e172502"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const viewRef = doc(db, "views", songId);

const viewSnap = await getDoc(viewRef);

if (viewSnap.exists()) {
    await updateDoc(viewRef, {
        views: increment(1)
    });
} else {
    await setDoc(viewRef, {
        views: 1
    });
}

const newSnap = await getDoc(viewRef);

document.getElementById("viewCount").textContent =
newSnap.data().views;
