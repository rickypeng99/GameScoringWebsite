import React, { Component } from 'react'
import { Input, Label, Form, Button } from 'semantic-ui-react'
import { withFirebase } from '../firebase';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


require('./Signup.css');



class Signup extends Component{
    constructor(props){
        super(props);
        this.state = { 
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
        };

    }


    formSubmitHandler = ((event) => {
        const { username, email, passwordOne} = this.state;
       
        this.props.firebase
          .userSignUp(email, passwordOne)
          .then(currentUser => {            
            let url = "http://localhost:5000/api/user"
            // alert(currentUser.user.uid)
            // alert(currentUser.uid + " "+typeof(currentUser.uid))
            // axios.post(url, {
            //     "uid" : currentUser.user.uid,
            //     "email": email,
            //     "name": username
            // })
            // .then((response) => {
            //     alert("cg create " + response.data.email + " on database!")

            // })
            // .catch(error => {
            //     alert("post: " + error)
            // })


            this.props.history.push("/");


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
                    return <Label pointing = "below" primary color = "red">Please input username!</Label>

                }
            } else if(input === "email"){
                if(email === ''){
                    return <Label pointing = "below" primary color = "red">Please input email!</Label>

                }

            } else if(input === "password"){
                if(passwordOne === ''){
                    return <Label pointing = "below" primary color = "red">Please input password!</Label>

                }
            } else if(input === "password2"){
                if(passwordOne !== passwordTwo){
                    return <Label pointing = "below" primary color = "red">Password different!</Label>

                }
            }
        }
        return(
            <div>
                <Form onSubmit = {this.formSubmitHandler}>
                    <Form.Field>

                       
                        <div className = "input-container">
                            <p inline>Username</p> 
                            {
                                showError("username")
                            }
                        </div>
                        <Input 
                                name = "username"
                                value = {username}
                                onChange = {this.formChangeHandler}
                                type = "text"
                                placeholder = "admin"
                            />
                    </Form.Field>
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
                    <Form.Field>
                        <div className = "input-container">
                        <p>Comfirm Password</p>

                        
                        {
                            showError("password2")
                        }

                        </div>
                        <Input 
                            className = "input"
                            name = "passwordTwo"
                            value = {passwordTwo}
                            onChange = {this.formChangeHandler}
                            type = "password"
                        />
                    </Form.Field>
                    <Button primary disabled={isInvalid} type="submit" >
                    Sign Up
                    </Button>
                </Form>
                <div class = "already">
                    <p>Already have an account?</p>
                    <Button primary onClick={()=>this.props.history.push("/")}>Return and sign in!</Button>
                </div>
                
               
            </div>
           
        )
    }
}



const SignUpForm = withRouter(withFirebase(Signup));
const SignUpPage = () => (
    <div className = "signUpContainer">
      <h1>SignUp</h1>
        <SignUpForm/>
    </div>
  );

export default SignUpPage;

