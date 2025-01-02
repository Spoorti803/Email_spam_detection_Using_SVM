 // Import individual Firebase modules instead of the entire package
 import { initializeApp } from 'firebase/app';  // Firebase app initialization
 import { getAuth } from 'firebase/auth';  // Firebase Authentication
 import { getFirestore } from 'firebase/firestore';  // Firebase Firestore

 // Your Firebase config from the Firebase Console
 const firebaseConfig = {
   apiKey: "AIzaSyBcpT4MM8f1idQCd8wsVWNdNQL-wO-2QGo",
   authDomain: "email-spam-detection-97b90.firebaseapp.com",
   projectId: "email-spam-detection-97b90",
   storageBucket: "email-spam-detection-97b90.appspot.com",
   messagingSenderId: "436113528324",
   appId: "1:436113528324:web:ca9dc4ce5a4be3eec50751",
   measurementId: "G-1WHGJKYTNP"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 // Get instances of Firebase services
 const auth = getAuth(app);
 const db = getFirestore(app);

 export { auth, db };

