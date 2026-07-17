import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  runTransaction,
  onValue
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
