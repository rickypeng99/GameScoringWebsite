import React from 'react';

import { withFirebase } from './firebase';

const getCurrentUserContext = React.createContext(null);

//adding the authentication session
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        currentUser => {
          if(currentUser != null){
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.setState({currentUser: currentUser})
          } else{
            localStorage.removeItem('currentUser');
            this.setState({currentUser: null})

          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <getCurrentUserContext.Provider value={this.state.currentUser}>
          <Component {...this.props} />
        </getCurrentUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
export {withAuthentication, getCurrentUserContext};