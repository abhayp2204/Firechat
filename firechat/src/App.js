// Firebase
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Firebase hooks
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"

// React hooks
import { useState } from "react"

// Components
import Navbar from "./components/Navbar"

// CSS
import "./css/App.css"

// Initialize firebase
firebase.initializeApp({
    apiKey: "AIzaSyCju9Y074uregBHT3dj_-S9-fRw6NOTz9U",
    authDomain: "firechat-e5607.firebaseapp.com",
    projectId: "firechat-e5607",
    storageBucket: "firechat-e5607.appspot.com",
    messagingSenderId: "307412017758",
    appId: "1:307412017758:web:f47748e2c35dc43bcf4acf",
    measurementId: "G-982CCDNJGP"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
    const [user] = useAuthState(auth)

    return (
        <div className="App">
            <Navbar />
            <section>
                {user? <ChatRoom /> : <SignIn />}
            </section>
        </div>
    )
}

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
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <button type="submit">Send</button>
            </form>

            <SignOut />
        </>
    )
}

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message

    const messageClass = uid === auth.currentUser.uid? "sent" : "received"

    return (
        <div className={messageClass}>
            <img src={photoURL} />
            <p>{text}</p>
        </div>
    )
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }

    return (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
}

function SignOut() {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default App
