import React, { Component } from 'react';
import axios from 'axios';
import Introduction from './Introduction/intro.jsx';
import Screenshots from './Screenshots/screenshots.jsx';
import Comments from './Comments/comments.jsx';
import Rating from './Rating/rating.jsx';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'

import {centerText} from './Screenshots/screenshots.module.scss'
library.add(faCommentAlt)

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {},              
            appid: props.match.params.game_id,
            name: ""
        }
    }

    componentDidMount() {
        axios.get('api/steam/gameInfo/' + this.state.appid)
        .then(response => {
            this.setState({
                game: response.data,
            })

            this.setState({
                name: response.data[this.state.appid].data.name
            })
        }).catch(err => {
            //alert(err);
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
                <h1 className = {centerText}>{this.state.name}</h1>
                    <Introduction game = {this.state.game} appid = {this.state.appid} name = {this.state.name}/>
                    <Screenshots game = {this.state.game} appid = {this.state.appid} name = {this.state.name}/>
                    <Comments appid = {this.state.appid} name = {this.state.name}/>
                </div>
        )
    }
}

export default Detail;