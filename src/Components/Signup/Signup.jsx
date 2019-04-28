import React, { Component } from 'react'
import { Input, Label, Form, Button } from 'semantic-ui-react'
import { withFirebase } from '../Firebase';
import { Link, withRouter } from 'react-router-dom';
require('./Signup.css');


const all_states = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
}

const SignUpPage = () => (
    <div className = "signUpContainer">
      <h1>SignUp</h1>
        <SignUpForm/>
    </div>
  );

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = { ...all_states};

    }


    formSubmitHandler = ((event) => {
        const { username, email, passwordOne} = this.state;
    
    
        this.props.firebase
          .userSignUp(email, passwordOne)
          .then(authUser => {
            
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
            username,
            email,
            passwordOne,
            passwordTwo,
          } = this.state;
        
        const isInvalid  = (
                passwordOne !== passwordTwo ||
                passwordOne === '' ||
                email === '' ||
                username === ''
        );
            
            
        
        var showError = (input) => {
            if(input === "username"){
                if(username === ''){
                    return <Label pointing>Please input username!</Label>

                }
            } else if(input === "email"){
                if(email === ''){
                    return <Label pointing>Please input email!</Label>

                }

            } else if(input === "password2"){
                if(passwordOne !== passwordTwo){
                    return <Label pointing>Password different!</Label>

                }
            }
        }
        return(
            <div>
                <Form onSubmit = {this.formSubmitHandler}>
                    <Form.Field>
                        <Label>Username</Label> 
                        <div className = "input-container">
                            <Input 
                                name = "username"
                                value = {username}
                                onChange = {this.formChangeHandler}
                                type = "text"
                                placeholder = "coolboi"
                            />
                            {
                                showError("username")
                            }
                        </div>
                       
                    </Form.Field>
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
                    <Form.Field>
                        <Label>Comfirm Password</Label>
                        <div className = "input-container">
 
                        <Input 
                            className = "input"
                            name = "passwordTwo"
                            value = {passwordTwo}
                            onChange = {this.formChangeHandler}
                            type = "password"
                        />
                        {
                            showError("password2")
                        }
                        </div>
                    </Form.Field>
                    <Button primary disabled={isInvalid} type="submit">
                    Sign Up
                    </Button>

                </Form>
            </div>
           
        )
    }
}

const SignUpForm = withRouter(withFirebase(Signup));
export default SignUpPage;
export { SignUpForm};
