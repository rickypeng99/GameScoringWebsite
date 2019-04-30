import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import {Card} from 'semantic-ui-react';
import HorizontalBar from './bar.jsx';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import {imageSection, text, score, image, intro, introTitle, introContent, introClick, screenshotsCss, carousel} from './detail.module.scss';

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            game: {},
            detailIntro: {},
            briefIntro: {},
            displayIntro: {},
            clickLink: 'show more', 
        }
        this.showContent = this.showContent.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/steam/gameInfo/' + 413420)
        .then(response => {
            let htmlContent = response.data[413420].data.detailed_description;
            let content = ReactHtmlParser(htmlContent);
            let shortContent = response.data[413420].data.short_description;
            this.setState({
                game: response.data,
                detailIntro: content,
                briefIntro:  shortContent, 
                displayIntro: shortContent,
            })
        }).catch(err => {
            alert(err);
        })
    }

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

    render() {
        let appid = 413420;
        if (this.state.game[appid] === undefined) {
            return(
                <div></div>
            )
        }
        let imageUrl = this.state.game[appid].data.header_image;
        let publishers = this.state.game[appid].data.publishers;
        let isReleased = this.state.game[appid].data.release_date.coming_soon;
        let categories = this.state.game[appid].data.categories;
        let screenshots = this.state.game[appid].data.screenshots;
        screenshots = screenshots.map(image => {
            return <a href = {image.path_full}><img className = {screenshotsCss} src = {image.path_full} alt = 'screenshot'/></a>;
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
            visibility: 'visible'
        }
        if (this.state.detailIntro === this.state.briefIntro) {
            linkStyle = {
                visibility: 'none'
            }
        }
        //responsive for carousel
        let responsive = {
            0: {items: 1},
            350: {items: 1},
            700: {items: 2}, 
            1024: {items: 3}
        }
        return(
            <div>
                <div className = {imageSection}>
                    <img className = {image} src = {imageUrl} alt = 'game scene'/>
                    <div className = {text}>
                        Publishers: {publishers} <br/>
                        Release Date: {releaseDate}<br/>
                        Categories: {categories}
                        Genres: {genres}
                    </div>
                    <div className = {score}>
                        Average Score: 8.8
                        <HorizontalBar/>
                    </div>
                </div>
                <Card>
                    <Card.Content className = {intro}>
                        <Card.Header className = {introTitle}>
                            Introduction
                        </Card.Header>
                        <div className = {introContent}>
                            {this.state.displayIntro}
                        </div>
                        <span className = {introClick} onClick = {this.showContent} style = {linkStyle}>{this.state.clickLink}</span>
                    </Card.Content>
                </Card>
                <h3 className = {introTitle}>Screen Shots</h3>
                <div className = {carousel}>
                <AliceCarousel mouseDragEnabled responsive = {responsive} autoPlayInterval={5000} autoPlayDirection="ltr" autoPlay={true}>
                    {screenshots}
                </AliceCarousel>
                </div>
            </div>
        )
    }
}

export default Detail;