import React, { Component } from 'react'
import axios from 'axios';
import {Form, Input, Label, Segment, Button, Image, List } from 'semantic-ui-react'
import logo from './steam.jpg';
require('./main.css');


class MainPage extends Component {
    constructor() {
        super();
        this.state = {
          showList: [],
           value: '',
           gameList: [],
        };

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }  
    
    componentDidMount() {
        axios.get('api/steam/gameList')
        .then(response => {
            this.setState({
                gameList: response.data.applist.apps,
            })
        }).catch(err => {
            alert(err);
        })
    }

     inputChangeHandler(event) {
        let input = event.target.value;
        this.setState({ value: input });
        if (input === ''){
            this.setState({ showList: [] });
            return;
        }
        let list = this.state.gameList;
        let arr = [];
        for (var i=0; i<list.length; i++)
        {
            if (arr.length <= 15){
                if (list[i].name.toUpperCase().indexOf(input) === 0||list[i].name.toLowerCase().indexOf(input) === 0){
                    arr.push(list[i]);
            }
            }
        }
        this.setState({ showList: arr });
      }

    render() {
        let list = this.state.showList.map(game => {
            let url = "#/detail/"+game.appid+"#/";
            return(
                <List.Item className = "list_item_set">
                      <List.Icon size='large' verticalAlign='middle' />
                      <List.Content >
                        <List.Header as='a'><a href= {url}>{game.name}</a></List.Header>
                      </List.Content>
                    </List.Item>
            )});
        return(
            <div>
                  <Segment inverted>
                    <Input size='huge' icon='search' inverted placeholder='Search...'
                      onChange={this.inputChangeHandler}
                       label='Enter a Game Name'
                       value={this.state.value}/>
                  </Segment>

                <div className="logo-image">
                     <List divided relaxed>
                        {list}
                  </List>
                </div>
            </div>
        )
    }
}
export default MainPage;
