import React from "react"
import { Container } from "react-bootstrap"
import { auth } from "../App"
import "../css/Chat.css"

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message

    const messageClass = uid === auth.currentUser.uid? "sent" : "received"

    return (
        <div className="chat-msg">
            <img src={photoURL} alt="not found"/>
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage