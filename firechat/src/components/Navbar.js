import React from "react"
import "../css/Navbar.css"

// Firebase
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth } from "../firebase"

import logo from "../images/firelogo.png"
import logo2 from "../images/firelogo2.png"
import logo3 from "../images/firelogo3.png"


function Navbar() {
    return (
        <div className="navbar">
            <h1>Firechat</h1>
            <img src={logo3} alt="logo"></img>
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