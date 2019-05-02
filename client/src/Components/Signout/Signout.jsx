import React from 'react';

import { withFirebase } from '../firebase';
import {Button} from 'semantic-ui-react';

const SignOutButton = ({ firebase }) => (
  <Button primary type="button" onClick={firebase.userSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);