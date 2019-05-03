import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {Card} from 'semantic-ui-react';
import HorizontalBar from './Bar/bar.jsx';
import {imageSection, text, score, image, intro, introOverall, cardCss,
    introTitle, introContent, introClick} from './intro.module.scss';


class Introduction extends Component {
    constructor() {
        super();
        this.state = {
            game: {},
            detailIntro: '',                                   //detail intro of a game
            briefIntro: '',                                     //brief intro of a game
            displayIntro: '',                                   //display detail or bried intro, depending on show more or less link, by default is brief intro of a game
            clickLink: 'show more',                             //whether to show detail description or brief description
            appid: '',
        }
        this.showContent = this.showContent.bind(this);         //click handler of show more/less link
    }

    componentDidMount(){
        let htmlContent = this.props.game[this.props.appid].data.detailed_description;
        let content = ReactHtmlParser(htmlContent);
        let shortContent = this.props.game[this.props.appid].data.short_description;
        this.setState({
            game: this.props.game,
            detailIntro: content,
            briefIntro: shortContent, 
            displayIntro: shortContent,
            appid: this.props.appid,
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

    render() {
        let imageUrl = this.props.game[this.props.appid].data.header_image;
        let publishers = this.props.game[this.props.appid].data.publishers;
        let isReleased = this.props.game[this.props.appid].data.release_date.coming_soon;
        let categories = this.props.game[this.props.appid].data.categories;
        let genres = this.props.game[this.props.appid].data.genres;
        if (categories.length > 3) {                
            categories = categories.slice(0, 3);
        }
        categories = categories.map(category => {
            return <li>{category.description}</li>
        })
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
            releaseDate = this.props.game[this.props.appid].data.release_date.date;
        }
        let linkStyle = {
            display: 'block'
        }
        if (this.state.detailIntro === this.state.briefIntro) {
            linkStyle = {
                display: 'none'
            }
        }
        if (this.state.appid === '') {
            return <div></div>
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
                        <HorizontalBar appid = {this.state.appid}/>
                    </div>
                </div>
                <div className={introOverall}>
                    <Card className={cardCss}>
                        <Card.Content className = {intro}>
                            <Card.Header className = {introTitle}>
                                Introduction
                            </Card.Header>
                            <div className = {introContent}>
                                {this.state.displayIntro}
                            </div>
                            <span className = {introClick} onClick = {this.showContent} 
                            style = {linkStyle}>{this.state.clickLink}</span>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Introduction;