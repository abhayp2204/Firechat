// React, Components, Icons
import React, { useState } from "react"
import ChatMessage from "./ChatMessage"

// Firebase
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore } from "../App"
import { useCollectionData } from "react-firebase-hooks/firestore"

function ChatRoom() {
    const messagesRef = firestore.collection("messages")
    const query = messagesRef.orderBy("createdAt").limit(25)

    const [messages] = useCollectionData(query, {idField: "id"})
    const [formValue, setFormValue] = useState("")

    const sendMessage = async(e) => {
        e.preventDefault()

        const { uid, photoURL } = auth.currentUser

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
        })

        setFormValue("")
    }

    return(
        <>
            <div className="chat-room">
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>

            <form className="send" onSubmit={sendMessage}>
                <input className="send-input" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <button className="send-icon" type="submit">Send</button>
            </form>
        </>
    )
}

export default ChatRoom