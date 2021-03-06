// React, Components, Icons
import React, { useState, useRef } from "react"
import ChatMessage from "./ChatMessage"
import "../css/Send.css"

// Firebase
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore } from "../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { badWords } from "../datasets/badwords"

function Send() {
    const messagesRef = firestore.collection("messages")
    const dummy = useRef()
    const [formValue, setFormValue] = useState("")

    const sendMessage = async(e) => {
        e.preventDefault()

        const { uid, photoURL } = auth.currentUser
        
        // No input
        if(!formValue.length) {
            alert("Nothing was typed!")
            return
        }

        // Censor bad words
        const badWordText = new Array(formValue.length + 1).join("*")
        const censoredText = badWords.includes(formValue)? badWordText : formValue

        // Add message to firestore
        await messagesRef.add({
            text: censoredText,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
        })
        
        dummy.current.scrollIntoView({ behavior: "smooth" }) 
        setFormValue("")
    }

    return (
        <>
            <div ref={dummy} className="dummy"></div>
            <form className="send" onSubmit={sendMessage}>
                <input className="send-input" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <button className="send-icon" type="submit">Send</button>
            </form>
        </>
    )
}

export default Send