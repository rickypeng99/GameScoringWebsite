import React, { Component } from 'react'
import axios from 'axios';
import MainDetail from './mainDetail.jsx';

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            gameList: [],
            idList: [],
        }
    }  
    
    componentDidMount() {
        axios.get('http://localhost:4000/steam/gameList')
        .then(response => {
            this.setState({
                gameList: response.data.applist.apps.slice(43000, 43050),
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
                <MainDetail gameList = {this.state.gameList} idList = {this.state.idList}/>
            </div>
        )
    }
}
export default MainPage;
