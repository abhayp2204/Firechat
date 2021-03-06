import React from "react"
import { auth } from "../firebase"
import "../css/Chat.css"

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message
    const messageClass = uid === auth.currentUser.uid? "sent" : "received"

    return (
        <>
            {
                messageClass === "sent"? 
                <SentMessage text={text} photoURL={photoURL} /> :
                <ReceivedMessage text={text} photoURL={photoURL} />
            }
        </>
    )
}

function SentMessage(props) {
    const { text, photoURL } = props
    return (
        <div className="chat-msg chat-msg-sent">
            <p>{text}</p>   
            <img src={photoURL} alt="not found"/>
        </div>
    )
}

function ReceivedMessage(props) {
    const { text, photoURL } = props
    return (
        <div className="chat-msg chat-msg-received">
            <img src={photoURL} alt="not found"/>
            <p>{text}</p>   
        </div>
    )
}

export default ChatMessage