// Firebase
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Initialize firebase
firebase.initializeApp({
    apiKey: "AIzaSyDLvd-UVcAg3sIbq_IqXFXkoU1EOptjOqY",
    authDomain: "firechat2-eb196.firebaseapp.com",
    projectId: "firechat2-eb196",
    storageBucket: "firechat2-eb196.appspot.com",
    messagingSenderId: "761906542548",
    appId: "1:761906542548:web:e8f97ed5f028f503cd8841",
    measurementId: "G-XNM6M34DDF"
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()