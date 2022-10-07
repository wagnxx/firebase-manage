import React, { ReactChildren, ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext'

interface iProps {
  redirectPath?: string
  children?: ReactChildren
}

export default function PrivateRoutes() {

  const { currentUser } = useAuth()

  if (!currentUser) {
    // login
    return <Navigate to='/login' />
  }
  return <Outlet />
}
