import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyC7UeAWof10hJQFAaSUFd3zyJQZhW2_Vas',
  authDomain: 'crndd-d6d6c.firebaseapp.com',
  projectId: 'crndd-d6d6c',
  storageBucket: 'crndd-d6d6c.appspot.com',
  messagingSenderId: '505564054216',
  appId: '1:505564054216:web:a00b0afa485261d1a7dbfd',
  measurementId: 'G-6CPNXDS1C7',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user ', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
