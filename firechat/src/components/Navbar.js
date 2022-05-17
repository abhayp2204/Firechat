import React from "react"
import "../css/Navbar.css"

// Firebase
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore } from "../App"
import { useCollectionData } from "react-firebase-hooks/firestore"


function Navbar() {
    return (
        <div className="navbar">
            <h1>Firechat</h1>
            <SignOut />
        </div>
    )
}

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default Navbar