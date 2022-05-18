// Firebase
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"

// Components
import Navbar from "./components/Navbar"
import SignUpGoogle from "./components/SignUpGoogle"
import ChatRoom from "./components/ChatRoom"

// CSS
import { Container } from "react-bootstrap"
import "./css/App.css"

function App() {
    const [user] = useAuthState(auth)
    console.log(user)

    return (
        <>
            <Navbar />
            <Container className="d-flex align-items-center justify-content-center">
                <div className="master">
                    {user? <ChatRoom /> : <SignUpGoogle />}
                </div>
            </Container>
        </>
    )
}

export default App
