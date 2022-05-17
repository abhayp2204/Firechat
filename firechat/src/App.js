// Firebase
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { AuthProvider } from "./contexts/AuthContext"

// Firebase hooks
import { useAuthState } from "react-firebase-hooks/auth"
// import { useCollectionData } from "react-firebase-hooks/firestore"

// Bootstrap
import { Container } from "react-bootstrap"

// Components
import Navbar from "./components/Navbar"
import SignUpGoogle from "./components/SignUpGoogle"
import ChatRoom from "./components/ChatRoom"
// import Signup from "./components/Signup"

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

export const auth = firebase.auth()
export const firestore = firebase.firestore()

function App() {
    const [user] = useAuthState(auth)

    return (
        <AuthProvider>
            <Navbar />
            <Container className="d-flex align-items-center justify-content-center">
                <section className="master">
                    {user? <ChatRoom /> : <SignUpGoogle />}
                </section>
            </Container>
        </AuthProvider>
    )
}

export default App
