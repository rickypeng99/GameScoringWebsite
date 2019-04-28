import React, { Component } from 'react';
//import { Provider } from 'react-redux';
import SignOutButton from '../Signout/Signout';
import {Button} from 'semantic-ui-react';
//Check session
import { AuthUserContext } from '../Session';
import { Link, withRouter } from 'react-router-dom';


//import components
import Signup from '../Signup/Signup'
import Signin from '../Signin/Signin'

class Home extends Component {
  render() {
  
    return (
      
        <div>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? <HomeAuth /> : <HomeNonAuth history = {this.props.history}/>
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}


const HomeAuth = () => (
    <div>
        <p>Hello!</p>
        <SignOutButton />
    </div>
    
  );
  
  const HomeNonAuth = (props) => (
    <div>
        <p>Fuck off!</p>
        <Button primary onClick={()=>props.history.push("/signin")}>Sign in</Button>
        <div inline>
        <p>Dont have an account?</p>
        <Button primary onClick={()=>props.history.push("/signup")}>Sign up</Button>
        </div>
    </div>
  );


export default withRouter(Home);