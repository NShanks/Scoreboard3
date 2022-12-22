import React, { useRef, useState } from 'react'
import Navbar from './navbar'
import Home from './pages/home'
import Tournaments from './pages/tournaments'
import Active from './pages/active'
import Create from './pages/create'
import { Route, Routes } from 'react-router-dom'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/analytics'
import { getAuth, onAuthStateChanged, getRedirectResult, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
// import { styled } from '@mui/system'

firebase.initializeApp({
  apiKey: "AIzaSyC4yu_DzUvODmdtYLJHKnt3buvAbQh4MhQ",
  authDomain: "scoreboard-41349.firebaseapp.com",
  projectId: "scoreboard-41349",
  storageBucket: "scoreboard-41349.appspot.com",
  messagingSenderId: "880269289772",
  appId: "1:880269289772:web:57be74b2233cb2e6cb2489",
  measurementId: "G-254MF7DNYE"
})

const auth = getAuth();
// const auth = firebase.auth()
const firestore = firebase.firestore()
const analytics = firebase.analytics()

function App() {
  const [user] = useAuthState(auth)

  return (
  <>
    <Navbar />
    <div className="container">
      <section>
        {user ? <SignOut /> : <SignIn />}
      </section>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/active" element={<Active />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
    
  </>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
