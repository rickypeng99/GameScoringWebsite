import React, { Component } from 'react'
import axios from 'axios';

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            popularGames: [],
            allGames: [],
        }
    }  
    
    componentDidMount() {
        axios({
            url: 'https://api-v3.igdb.com/games',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': '3bf50a500dd2bfee6bd301627a95107b'
            },
            data: 'fields *;',
            withCredentials: true,
            crossDomain: true,
        }).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                this.state.allGames.push(response.data[i]);
            }
            alert(response.data[0]._id);
        }).catch(err => {
            alert(err);
        });
    }
    
    render() {
        return(
            <div>
                {this.state.allGames[0]}
            </div>    
        )
    }
}

export default MainPage;
