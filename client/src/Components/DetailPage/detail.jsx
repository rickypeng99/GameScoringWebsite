import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { Card, Button } from 'semantic-ui-react';
import HorizontalBar from './bar.jsx';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    imageSection, text, score, image, intro,
    introTitle, introContent, introClick, screenshotsCss, carousel,
    comments, commentList, commentClickCss
} from './detail.module.scss';

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            game: {},
            detailIntro: {},                                    //detail intro of a game
            briefIntro: {},                                     //brief intro of a game
            displayIntro: {},                                   //display detail or bried intro, depending on show more or less link, by default is brief intro of a game
            clickLink: 'show more',                             //whether to show detail description or brief description
            comments: [],                                       //all comments of the game
            addComment: '',                                     //the comment added by user
            commentClickDisplay: 'block',                       //add comment link, not visible when a comment box appears
            commentBoxDisplay: 'none',                          //comment box, visible when add comment link is clicked
            buttonDisplay: 'none',                              //submit and cancel button, visible when add comment link is clicked
        }
        this.showContent = this.showContent.bind(this);         //click handler of show more/less link
        this.addComment = this.addComment.bind(this);           //click to add a comment box
        this.writeComment = this.writeComment.bind(this);       //input change handler of the comment box
        this.submit = this.submit.bind(this);                   //submit comment handler
        this.cancel = this.cancel.bind(this);                   //cancel commenting handler
    }

    componentDidMount() {
        axios.get('api/steam/gameInfo/' + 413420)
            .then(response => {
                let htmlContent = response.data[413420].data.detailed_description;
                let content = ReactHtmlParser(htmlContent);
                let shortContent = response.data[413420].data.short_description;
                this.setState({
                    game: response.data,
                    detailIntro: content,
                    briefIntro: shortContent,
                    displayIntro: shortContent,
                })
            }).catch(err => {
                alert(err);
            })
    }
    //click show more or show less to show detail or brief content
    showContent() {
        if (this.state.clickLink === 'show more') {
            let content = this.state.detailIntro;
            this.setState({
                displayIntro: content,
                clickLink: 'show less',
            })
        } else {
            let content = this.state.briefIntro;
            this.setState({
                displayIntro: content,
                clickLink: 'show more',
            })
        }
    }
    //click comment tag to show the text box
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
        axios.put('api/game/comment/' + 413420, {
            comment: this.state.addComment,
            user_name: "test_name",
            user_id: "test_id"
        })
        let commentList = this.state.comments;
        commentList.push(this.state.addComment);
        if (this.state.addComment === '') {
            alert('Please add comments');
            return;
        }
        this.setState({
            commentBoxDisplay: 'none',
            buttonDisplay: 'none',
            addComment: '',
            comments: commentList,
            commentClickDisplay: 'block',
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
        let appid = 413420;
        if (this.state.game[appid] === undefined) {
            return (
                <div></div>
            )
        }
        let imageUrl = this.state.game[appid].data.header_image;
        let publishers = this.state.game[appid].data.publishers;
        let isReleased = this.state.game[appid].data.release_date.coming_soon;
        let categories = this.state.game[appid].data.categories;
        let screenshots = this.state.game[appid].data.screenshots;
        screenshots = screenshots.map(image => {
            return <a href={image.path_full}><img className={screenshotsCss}
                src={image.path_full} alt='screenshot' /></a>;
        })
        // only select the first 3 categories if more than categories provided
        if (categories.length > 3) {
            categories = categories.slice(0, 3);
        }
        categories = categories.map(category => {
            return <li>{category.description}</li>
        })
        let genres = this.state.game[appid].data.genres;
        // only select the first 3 genres if more than 3 genres provided
        if (genres.length > 3) {
            genres = genres.slice(0, 3);
        }
        genres = genres.map(genre => {
            return <li>{genre.description}</li>
        })
        var releaseDate;
        if (isReleased) {
            releaseDate = 'Coming Soon';
        } else {
            releaseDate = this.state.game[appid].data.release_date.date;
        }
        // if brief and detail description are the same, then no need to show the show more/less link
        let linkStyle = {
            display: 'block'
        }
        if (this.state.detailIntro === this.state.briefIntro) {
            linkStyle = {
                display: 'none'
            }
        }
        //responsive for carousel
        let responsive = {
            0: { items: 1 },
            350: { items: 1 },
            700: { items: 2 },
            1024: { items: 3 }
        }
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
        let commentLists = this.state.comments.map(comment => {
            return (
                <Card>
                    <Card.Content>
                        {comment}
                    </Card.Content>
                </Card>
            );
        })
        return (
            <div>
                <div className={imageSection}>
                    <img className={image} src={imageUrl} alt='game scene' />
                    <div className={text}>
                        Publishers: {publishers} <br />
                        Release Date: {releaseDate}<br />
                        Categories: {categories}
                        Genres: {genres}
                    </div>
                    <div className={score}>
                        Average Score: 8.8
                        <HorizontalBar />
                    </div>
                </div>
                <Card>
                    <Card.Content className={intro}>
                        <Card.Header className={introTitle}>
                            Introduction
                        </Card.Header>
                        <div className={introContent}>
                            {this.state.displayIntro}
                        </div>
                        <span className={introClick} onClick={this.showContent}
                            style={linkStyle}>{this.state.clickLink}</span>
                    </Card.Content>
                </Card>
                <h3 className={introTitle}>Screen Shots</h3>
                <div className={carousel}>
                    <AliceCarousel mouseDragEnabled responsive={responsive}
                        autoPlayInterval={5000} autoPlayDirection="ltr" autoPlay={true}>
                        {screenshots}
                    </AliceCarousel>
                </div>
                <Card>
                    <Card.Header className={introTitle}>Comments</Card.Header>
                    <Card.Content className={commentList}>
                        {commentLists}
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content className={comments}>
                        <Card.Header className={commentClickCss} onClick={this.addComment} style={commentClickStyle}>
                            <FontAwesomeIcon icon="comment-alt" /> Add a comment
                        </Card.Header>
                        <textarea name="commentBox" maxlength='1000' onChange={this.writeComment}
                            value={this.state.addComment} style={commentBoxStyle}></textarea>
                        <Button onClick={this.submit} style={buttonDisplayStyle}>Submit</Button>
                        <Button onClick={this.cancel} style={buttonDisplayStyle}>Cancel</Button>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default Detail;