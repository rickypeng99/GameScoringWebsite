import React from 'react'
import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();

  }
    userSignUp = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);
    userSignIn = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);
    userSignOut = ()=>{
      this.auth.signOut();
    }
    
    getUser = ()=>{
      return this.auth.currentUser;
    }
  
}


const FirebaseContext = React.createContext(null);
//addomg the firebase prop to the component passed in
const withFirebase = Component => props => {
  return (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)
};
export default Firebase;
export {FirebaseContext, withFirebase, Firebase};

