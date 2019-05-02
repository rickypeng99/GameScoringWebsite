import React, { Component } from 'react';
import axios from 'axios';
import {Card, Button, Label} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {commentsCss, commentClickCss, commentTitle} from './comments.module.scss'

class Comments extends Component {
    constructor() {
        super();
        this.state = {            
            comments: [],                                       //all comments and corresponding users of the game
            addComment: '',                                     //the comment added by user
            commentClickDisplay: 'block',                       //add comment link, not visible when a comment box appears
            commentBoxDisplay: 'none',                          //comment box, visible when add comment link is clicked
            buttonDisplay: 'none',                              //submit and cancel button, visible when add comment link is clicked
        }
        this.addComment = this.addComment.bind(this);           //click to add a comment box
        this.writeComment = this.writeComment.bind(this);       //input change handler of the comment box
        this.submit = this.submit.bind(this);                   //submit comment handler
        this.cancel = this.cancel.bind(this);                   //cancel commenting handler
    }

    componentDidMount() {
        axios.get('api/game/' + this.props.appid)
        .then(response => {
            this.setState({          
                comments: response.data.data.comment
            })
        }).catch(err => {
            alert(err)
        })
    }

    componentDidUpdate() {
        axios.get('api/game/' + this.props.appid)
        .then(response => {
            this.setState({          
                comments: response.data.data.comment
            })
        }).catch(err => {
            alert(err)
        })
    }

    addComment() {
        this.setState({
             commentBoxDisplay: 'block',
             buttonDisplay: 'inline',
             commentClickDisplay: 'none',
        })
     }

     //write the comment into the text box
     writeComment(event) {
         if (event.target.value.length >= 1000) {
             alert('Reach maximum character limits');
             return;
         }
         this.setState({
             addComment: event.target.value,
         })
     }

    //submit the comment, axios post should be added here 
    submit() {
        let commentList = this.state.comments;
        commentList.push(this.state.addComment);
        if (this.state.addComment === '') {
            alert('Please add comments');
            return;
        }
        this.setState ({
             commentBoxDisplay: 'none',
             buttonDisplay: 'none',
             addComment: '',
             comments: commentList,
             commentClickDisplay: 'block',
         })
        axios.put('api/game/comment/' + this.props.appid, {
            comment: this.state.addComment,
            user_name: "test_name",
            user_id: "test_id",
        })
     }

     //cancel the comment
     cancel() {
         this.setState({
             commentBoxDisplay: 'none',
             buttonDisplay: 'none',
             addComment: '',
             commentClickDisplay: 'block',
         })
     }

     render() {
        //Add a comment is invisible when a comment box is visible
        let commentClickStyle = {
            display: this.state.commentClickDisplay
        }
         //comment box is visible when add a comment is clicked
        let commentBoxStyle = {
            display: this.state.commentBoxDisplay
        }
        //button is visible when add a comment is clicked
        let buttonDisplayStyle = {
            display: this.state.buttonDisplay
        }
        let commentLists = this.state.comments.map(currComment => {
            return (
                <Label>{currComment.user_name}:{currComment.comment}</Label>
            );
        })

        return(
            <Card>
                <span className = {commentTitle}>Comments</span>
                <Card.Content className = {commentsCss}>
                    <Card.Header className = {commentClickCss} onClick = {this.addComment} style = {commentClickStyle}>
                        <FontAwesomeIcon icon="comment-alt"/> Add a comment
                    </Card.Header>
                    {commentLists}
                    <textarea name="commentBox" maxlength = '1000' onChange = {this.writeComment} 
                    value = {this.state.addComment} style = {commentBoxStyle}></textarea>
                    <Button onClick = {this.submit} style = {buttonDisplayStyle}>Submit</Button>  
                    <Button onClick = {this.cancel} style = {buttonDisplayStyle}>Cancel</Button>
                </Card.Content>
            </Card>
        )
     }
}

export default Comments;