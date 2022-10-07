import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CenterContainer from '../components/CenterContainer'
import { useAuth } from '../context/AuthContext'

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null)
 
  const { resetPassword, } = useAuth()

  const [ error,setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

 

  async function handleSubmit(e: any) {
    e.preventDefault()

    try {
      setLoading(true)
      setMessage('')
      setError('')
      await resetPassword(emailRef.current?.value)
      setMessage('Check your inbox for further instructions')
 
    } catch (error) {
      console.log('error:', error)
      setError('Failed to reset passwor')
    }

    setLoading(false)
  }
  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {
            error && <Alert variant="danger" >{error}</Alert>
          }
          {
            message && <Alert variant="success" >{message}</Alert>
          }
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
    
 
            <Button disabled={loading} type="submit" className=" w-100 mt-4">Reset Password</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account ? <Link to="/signup" >Sign Up</Link>
      </div>
    </CenterContainer>
  )
}
