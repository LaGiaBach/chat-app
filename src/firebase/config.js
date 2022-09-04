
import firebase from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";
import 'firebase/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBZZcZ32wnMt8FYN6ooYKfRpkOWUatBqjM",
    authDomain: "chat-app-62973.firebaseapp.com",
    projectId: "chat-app-62973",
    storageBucket: "chat-app-62973.appspot.com",
    messagingSenderId: "37753142473",
    appId: "1:37753142473:web:f584e2a87d86531b9de118",
    measurementId: "G-1XD64JVJSM"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth= firebase.auth();
  const db  = firebase.firestore();

  auth.useEmulator("http://localhost:9099");
  if(window.location.hostname === "localhost"){
    db.useEmulator("localhost", "8080")
  }

  export {db , auth} ;

  export default firebase