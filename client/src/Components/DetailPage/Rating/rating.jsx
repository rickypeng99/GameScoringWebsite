import React, {Component} from 'react';
import axios from 'axios';
import {Button} from 'semantic-ui-react'
import StarRatingComponent from 'react-star-rating-component';
import {ratingCss, ratingTitle} from './rating.module.scss';

class Rating extends Component {
    constructor() {
        super();
        this.state = {
            rating: 0,
            buttonStyle: 'none'
        }
        this.clickStar = this.clickStar.bind(this);
        this.submitRating = this.submitRating.bind(this);
        this.cancelRating = this.cancelRating.bind(this);
    }
  
    clickStar(nextValue) {
        this.setState({
            rating: nextValue,
            buttonStyle: 'inline',
        });
    }

    submitRating() {
        axios.put('api/game/score/' + this.props.appid, {
            score: 'score_'+this.state.rating,
        })
        this.setState({
            rating: 0,
            buttonStyle: 'none',
        })
    }

    cancelRating() {
        this.setState({
            rating: 0,
            buttonStyle: 'none',
        })
    }

    render() {  
        let style = {
            display: this.state.buttonStyle,
        }
        return (                
          <div>
            <div className = {ratingCss}>
            <h3 className = {ratingTitle}>Rating the game</h3>
                <StarRatingComponent 
                name="editable rating" 
                starCount={5}
                emptyStarColor={'rgba(100, 100, 100, 0.5)'}
                value={this.state.rating}
                onStarClick={this.clickStar}
                editing = {true}
                />
                <Button  style = {style} onClick = {this.submitRating}>Submit</Button>
                <Button style = {style} onClick = {this.cancelRating}>Cancel</Button>
            </div>
          </div>
        );
    }
}

export default Rating;