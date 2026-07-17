import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  runTransaction,
  onValue
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDI7b7BqUopaBfTC-P0vE1o5PVX3ustFOw",
  authDomain: "xmusic-eb387.firebaseapp.com",
  projectId: "xmusic-eb387",
  storageBucket: "xmusic-eb387.firebasestorage.app",
  messagingSenderId: "758209934631",
  appId: "1:758209934631:web:cac68b8b63245c7e172502"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get song ID from page
const songId = window.location.pathname
  .split("/")
  .pop()
  .replace(".html","");

const likeRef = ref(db, "likes/" + songId);

const likeNumber = document.getElementById("likes");
const likeButton = document.getElementById("likeBtn");

// Display likes
onValue(likeRef, (snapshot) => {
  likeNumber.textContent = snapshot.val() || 0;
});

// Add like
likeButton.addEventListener("click", () => {

  runTransaction(likeRef, (currentLikes) => {
    return (currentLikes || 0) + 1;
  });

});
