
import React, { createContext, useContext, useEffect, useState, ReactElement, ReactChild, ReactChildren, ReactNode } from 'react'
import {
  auth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail as updateEmailByAuth,
  updatePassword as updatePasswordByAuth,
  User
} from '../firebase'

type UserType = User | null

interface iContext {
  currentUser: UserType
  signup: Function,
  login: Function,
  logout: Function,
  resetPassword: Function,
  updateEmail: Function,
  updatePassword: Function,
}

export const AuthContext = createContext<iContext>({
  currentUser: null,
  signup: () => { },
  login: () => { },
  logout: () => { },
  resetPassword: () => { },
  updateEmail: () => { },
  updatePassword: () => { },
})

export function useAuth() {
  return useContext(AuthContext)
}




type propsType = {
  children: ReactNode
}


export default function AuthContextProvider({ children }: propsType) {
  const [currentUser, setCurrentUser] = useState<UserType>(null)
  const [loading, setLoading] = useState(true)

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email: string) {
    if (!currentUser) return;
    return updateEmailByAuth(currentUser, email)
  }

  function updatePassword(password: string) {
    if (!currentUser) return;
    return updatePasswordByAuth(currentUser, password)
  }



  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, user => {
      setLoading(false)
      setCurrentUser(user)
    })

    return () => unsubcribe()
  }, [])

  const value: iContext = {
    currentUser,
    signup,
    login,
    logout,
    updatePassword,
    updateEmail,
    resetPassword
  }
  return (
    <AuthContext.Provider value={value} >{!loading ? children : 'loading.....'} </AuthContext.Provider>
  )
}
