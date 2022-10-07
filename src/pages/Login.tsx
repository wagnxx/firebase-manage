import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CenterContainer from '../components/CenterContainer'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
 
  const { login, } = useAuth()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e: any) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current?.value, passwordRef.current?.value)
      navigate('/')
    } catch (error) {
      console.log('error:', error)
      setError('Failed to log in')
    }

    setLoading(false)
  }
  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {
            error && <Alert variant="danger" >{error}</Alert>
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
            <Form.Group id="password">
              <Form.Label>Passwod</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
 
            <Button disabled={loading} type="submit" className=" w-100 mt-4">Login</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">
              Forgot Password
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
