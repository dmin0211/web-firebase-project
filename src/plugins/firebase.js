import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '/firebaseConfig'

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged((fu)=>console.log(fu))
