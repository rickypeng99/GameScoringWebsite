import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import {Card} from 'semantic-ui-react';
import HorizontalBar from './bar.jsx';
import {imageSection, text, score, image, intro, introTitle, introContent, introClick} from './detail.module.scss';

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
        let imageUrl = this.state.game[appid].data['header_image'];
        let publishers = this.state.game[appid].data.publishers;
        let isReleased = this.state.game[appid].data.release_date.coming_soon;
        let categories = this.state.game[appid].data.categories;
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
        if (isReleased) {
            var releaseDate = 'Coming Soon';
        } else {
            var releaseDate = this.state.game[appid].data.release_date.date;
        }
        let linkStyle = {
            visibility: 'visible'
        }
        if (this.state.detailIntro === this.state.briefIntro) {
            linkStyle = {
                visibility: 'none'
            }
        }
        return(
            <div>
                <div className = {imageSection}>
                    <img className = {image} src = {imageUrl}/>
                    <div className = {text}>
                        Publishers: {publishers} <br/>
                        Release Date: {releaseDate}<br/>
                        Categories:
                        {categories}
                        Genres:
                        {genres}
                    </div>
                    <div className = {score}>
                        Average Score: 8.8
                        <HorizontalBar/>
                    </div>
                </div>
                <Card>
                    <Card.Content className = {intro}>
                        <Card.Header className = {introTitle}>
                            Introduction:
                        </Card.Header>
                        <div className = {introContent}>
                            {this.state.displayIntro}
                        </div>
                        <span className = {introClick} onClick = {this.showContent} style = {linkStyle}>{this.state.clickLink}</span>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default Detail;