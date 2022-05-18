// React, Components, Icons
import React from "react"
import ChatMessage from "./ChatMessage"
import "../css/Send.css"

// Firebase
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { firestore } from "../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"

function ChatRoom() {
    const messagesRef = firestore.collection("messages")
    const query = messagesRef.orderBy("createdAt").limit(100)
    const [messages] = useCollectionData(query, {idField: "id"})
    
    return(
        <div className="chat-room">
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </div>
    )
}

export default ChatRoom