import React, { ReactChildren, ReactNode } from 'react'
import { Container } from 'react-bootstrap'

interface iProps {
  children: ReactNode
}

export default function CenterContainer({ children }: iProps) {
  return (
    <Container
      className="d-flex align-items-center
      justify-content-center"
      style={{
        minHeight: '100vh'
      }}
    >
      <div className="w-100" style={{
        maxWidth: '400px'
      }}>
        {children}
      </div>

    </Container>
  )
}
