import React, { Component } from 'react'
import { Input, Label, Form, Button } from 'semantic-ui-react'
import { withFirebase } from '../Firebase';
import { Link, withRouter } from 'react-router-dom';
require('./Signin.css');


const all_states = {
    email: '',
    passwordOne: '',
}

const SignInPage = () => (
    <div className = "signUpContainer">
      <h1>SignIn</h1>
        <SignInForm/>
    </div>
  );

class Signin extends Component{
    constructor(props){
        super(props);
        this.state = { ...all_states};

    }


    formSubmitHandler = ((event) => {
        const {email, passwordOne} = this.state;
    
    
        this.props.firebase
          .userSignIn(email, passwordOne)
          .then(() => {
            
            this.setState({ ...all_states });
            this.props.history.push("/");

            })
          .catch(error => {
           
            alert(error.message);
    
            this.setState({ error });
          });
    
        event.preventDefault();
    });

    formChangeHandler = ((event) => {
        this.setState({ [event.target.name]: event.target.value });

    });


    render(){

        const {
            email,
            passwordOne,
          } = this.state;
        
        const isInvalid  = (
                passwordOne === '' ||
                email === ''
        );
            
            
        
        var showError = (input) => {
            if(input === "email"){
                if(email === ''){
                    return <Label pointing>Please input your email!</Label>

                }

            } else if(input === "password"){
                if(passwordOne === ''){
                    return <Label pointing>Please input your password!</Label>

                }
            }
        }
        return(
            <div>
                <Form onSubmit = {this.formSubmitHandler}>
                    <Form.Field>
                        <Label>Email</Label> 
                        <div className = "input-container">

                            <Input 
                                name = "email"
                                value = {email}
                                onChange = {this.formChangeHandler}
                                type = "text"
                                placeholder = "xxx@gmail.com"
                            />
                            {
                                showError("email")
                            }
                        </div>
                    </Form.Field>
                    <Form.Field>
                        
                        <Label>Password</Label> 
                        <div className = "input-container">

                            <Input 
                                name = "passwordOne"
                                value = {passwordOne}
                                onChange = {this.formChangeHandler}
                                type = "password"
                            />
                        </div>
                    </Form.Field>
                    <Button primary disabled={isInvalid} type="submit">
                    Sign In
                    </Button>

                </Form>
            </div>
           
        )
    }
}

const SignInForm = withRouter(withFirebase(Signin));
export default SignInPage;
export { SignInForm};
