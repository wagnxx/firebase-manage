import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, unstable_HistoryRouter, useNavigate } from 'react-router-dom'
import CenterContainer from '../components/CenterContainer'
import { useAuth } from '../context/AuthContext'

export default function UpdateProfile() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  const { currentUser, updateEmail,
    updatePassword } = useAuth()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

 function handleSubmit(e: any) {
    e.preventDefault()

    const promises = []
    if (emailRef.current?.value && emailRef.current?.value !== currentUser?.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    if (  passwordRef.current?.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    setError('')
    setLoading(true)

    Promise.all(promises)
    .then(() => {
      navigate('/user')
    })
    .catch(() => {
      setError('Failed to update account')

    })
    .finally(() => {

      setLoading(false)
    })



    // if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
    //   return setError('Password do not match')
    // }
    // console.log('email', emailRef.current?.value)
    // try {
    //   setError('')
    //   setLoading(true)
    //   // await signup(emailRef.current?.value, passwordRef.current?.value)
    //   navigate('/')
    // } catch (error) {
    //   console.log('error:', error)
    // }

  }
  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Pofile</h2>
          {
            error && <Alert variant="danger" >{error}</Alert>
          }

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser?.email || ''}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Passwod</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className=" w-100 mt-4">Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user" >Cancel</Link>
      </div>
    </CenterContainer>
  )
}
