import React, { Component } from 'react';
import axios from 'axios';
import Introduction from './Introduction/intro.jsx';
import Screenshots from './Screenshots/screenshots.jsx';
import Comments from './Comments/comments.jsx';
import Rating from './Rating/rating.jsx';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faCommentAlt)

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {},              
            appid: props.match.params.game_id,
        }
    }

    componentDidMount() {
        axios.get('api/steam/gameInfo/' + this.state.appid)
        .then(response => {
            this.setState({
                game: response.data,
            })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.game[this.state.appid] === undefined) {
            return(
                <div></div>
            )
        }
        return(
            <div>
               <Introduction game = {this.state.game} appid = {this.state.appid}/>
                <Screenshots game = {this.state.game} appid = {this.state.appid}/>
                <Rating appid = {this.state.appid}/>
                <Comments appid = {this.state.appid}/>
            </div>
        )
    }
}

export default Detail;