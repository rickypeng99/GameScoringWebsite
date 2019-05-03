import React, { Component } from 'react';
//import { Provider } from 'react-redux';
import {Button, List, Image, Label, Card} from 'semantic-ui-react';
import axios from 'axios';
import {commentsCss, commentClickCss, commentTitle, commentOverall, cardCss, cardCssLoginLabel, comment_item} from '../DetailPage/Comments/comments.module.scss'

require('./UserProfile.css');


class UserProfile extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      comments: [],
      uid: "undefined",
      email: "undefined",
      username: "undefined",
      content: <p>Loading....</p>
    }
  }

  componentDidMount(){
    axios.get('api/user/' + this.props.match.params.user_id)
        .then(response => {
            if(response.data.data == null){
                this.setState({
                    content:
                    <p>Can't find this user!</p>
                })
            } else{
                this.setState({          
                    uid: response.data.data.uid,
                    email: response.data.data.email,
                    username: response.data.data.name,
                    
                })
                this.setState({
                    content:
                    <UserProfileAuth username = {this.state.username}
                                     email = {this.state.email}
                                     uid = {this.state.uid}
                    ></UserProfileAuth>
                })
            }
           
        }).catch(err => {
            alert(err)
        })
    
    //get comments
    axios.get('api/user/' + this.props.match.params.user_id)
    .then(response => {
        this.setState({
            comments: (response.data.data.comment.reverse())
        })
    })
  }

  transfer_game(game_id){
    this.props.history.push("/detail/" + game_id);
  }

  render() {
    

    let showComments = this.state.comments.map((comment) => {
            var currDate = () => {
                if(comment.date){
                    return comment.date;
                } else{
                    return "Unknown date"
                }
            }
            
            return (
                <List.Item className = {comment_item} onClick = {() => this.transfer_game(comment.game_id)}>
                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
                    <List.Content>
                        <h3>{comment.game_name}</h3>
                        <List.Header>{comment.user_name }</List.Header>
                        <p>{" Commented on " + currDate()}</p>
                        <List.Description>
                            {comment.comment}
                        </List.Description>
                    </List.Content>
                </List.Item>
            );
        })
        
  
    return (
        


      <div className={commentOverall}>
        
        <h1>{this.state.username}</h1>
        <Label>Email</Label>
        <Card className = {cardCss}>
            <Card.Content className = {commentsCss}>
                {this.state.content}
            </Card.Content>
        </Card>
        <Label>Comments:</Label>
        <Card className = {cardCss}>
            <Card.Content className = {commentsCss}>
                <List relaxed='very' animated >
                    {showComments}
                </List>
            </Card.Content>
        </Card>
      </div>
      

       
    );
  }
}



const UserProfileAuth = (props) => (
  <div>
       
    <p>{props.email}</p>
  </div>
  
    
    
    
  );





export default UserProfile;
