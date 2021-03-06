import React from "react"
import { auth } from "../firebase"
import firebase from "firebase/compat/app"

function SignUpGoogle() {
    console.log("start: Sign up with Google")

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }

    return (
        <button className="google-sign-in" onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    )
}

export default SignUpGoogle