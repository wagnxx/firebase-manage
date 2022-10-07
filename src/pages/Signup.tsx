import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, unstable_HistoryRouter, useNavigate } from 'react-router-dom'
import CenterContainer from '../components/CenterContainer'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  const { signup, } = useAuth()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault()
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError('Password do not match')
    }
    console.log('email', emailRef.current?.value)
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current?.value, passwordRef.current?.value)
      navigate('/')
    } catch (error) {
      console.log('error:', error)
      setError('Failed to create an account')
    }

    setLoading(false)
  }
  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className=" w-100 mt-4">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Aready have an account ? <Link to="/login" >Login In</Link>
      </div>
    </CenterContainer>
  )
}
