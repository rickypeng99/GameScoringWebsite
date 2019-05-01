import React, { Component } from 'react'
import axios from 'axios';

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            gameList: [],
            idList: [],
        }
    }  
    
    componentDidMount() {
        axios.get('api/steam/gameList')
        .then(response => {
            this.setState({
                gameList: response.data.applist.apps.slice(0, 200),
            })
        }).catch(err => {
            alert(err);
        })
    }
    
    render() {
        if (this.state.gameList.length === 0 || this.state.length === 0) {
            return(
                <div></div>
            )
        }
        let list = this.state.gameList.map(game => {
            return <li> Name: {game.name}, APPID: {game.appid}</li>
        });
        return(
            <div>
                {list}
            </div>
        )
    }
}
export default MainPage;
