import React, { useRef, useState } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"

function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { signup, currentUser } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match!")
        }

        try {
            setLoading(true)
            setError("")
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)

    } 

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-2">Sign Up</h2>
                    {currentUser && currentUser.email}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        <Button disabled={loading} className="w-100 mt-3" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Already have an account? Log In    
            </div> 
        </>
    )
}

export default Signup