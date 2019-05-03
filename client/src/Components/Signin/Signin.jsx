import React, { Component } from 'react'
import { Input, Label, Form, Button } from 'semantic-ui-react'
import { withFirebase } from '../firebase';
require('./Signin.css');






class Signin extends Component{
    constructor(props){
        super(props);
        this.state = { 
            email: '',
            passwordOne: '',
        };

    }


    formSubmitHandler = ((event) => {
        const {
            email,
            passwordOne,
          } = this.state;
        
    
    
        this.props.firebase
          .userSignIn(email, passwordOne)
          .then(() => {
            
                this.setState({ 
                    email: '',
                    passwordOne: '' 
                });
            })
          .catch(error => {
           
            alert(error.message);
    
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
                    return <Label pointing = "below" primary color = "red">Please input email!</Label>

                }

            } else if(input === "password"){
                if(passwordOne === ''){
                    return <Label pointing = "below" primary color = "red">Please input password!</Label>

                }
           
            }
        }
        return(
            <div>
                <Form onSubmit = {this.formSubmitHandler}>
                    <Form.Field>
                        <div className = "input-container">
                            <p>Email</p>       
                            {
                                showError("email")
                            }          
                        </div>

                        <Input 
                                name = "email"
                                value = {email}
                                onChange = {this.formChangeHandler}
                                type = "text"
                                placeholder = "xxx@gmail.com"
                            />
                    </Form.Field>
                    <Form.Field>
                        
                        
                        <div className = "input-container">
                            <p>Password</p> 
                            {
                                showError("password")
                            }
                           
                        </div>
                        <Input 
                                name = "passwordOne"
                                value = {passwordOne}
                                onChange = {this.formChangeHandler}
                                type = "password"
                        />
                    </Form.Field>
                    <Button primary disabled={isInvalid} type="submit">
                    Sign In
                    </Button>

                </Form>
            </div>
           
        )
    }
}

const SignInForm = withFirebase(Signin);

const SignInPage = () => (
    <div className = "signInContainer">
      <h1>Please sign in!</h1>
      <SignInForm/>
    </div>
  );
export default SignInPage;
