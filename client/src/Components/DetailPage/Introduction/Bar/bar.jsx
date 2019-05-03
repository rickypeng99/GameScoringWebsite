import React, { Component } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import NoneditStarRating from './noneditRating.jsx';

class HorizontalBar extends Component {
    constructor() {
        super();
        this.state = {
            options: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    max: 100,
                    categories: ['5 points', '4 points', '3 points', '2 points', '1 point'],
                }
            },
            series: [
                {
                    name: 'Percentage of User(%)',
                    data: ['0', '0', '0', '0', '0'],
                }
            ],
            scores: [0, 0, 0, 0, 0],
            average: 0.0,
            userNum: 0,
        }
    }

    componentDidMount() {
        axios.get('api/game/' + 413420)
        //this.props.appid)
        .then(response => {
            let average = 0.0;
            let sum = 0.0
            let number = 0;
            let scorelist = [];
            for (let i = 5; i >= 0; i--) {
                scorelist.push(response.data.data.score['score_'+i]);
            }
            for (let i = 0; i < 5; i++) {
                number += scorelist[i];
                sum += scorelist[i] * (5-i);
            }
            average = sum/number;
            let percentage = [];
            for (let i = 0; i < 5; i++) {
                percentage.push((scorelist[i]/number*100).toString());
            }
            this.setState({
                series:[
                    {
                        name: 'Percentage of User(%)',
                        data: percentage,
                    }
                ],
                average: average,
                userNum: number,
            })
        })
    }

    componentDidUpdate() {
        axios.get('api/game/' + 413420)
        //this.props.appid)
        .then(response => {
            let average = 0.0;
            let sum = 0.0
            let number = 0;
            let scorelist = [];
            for (let i = 5; i >= 0; i--) {
                scorelist.push(response.data.data.score['score_'+i]);
            }
            for (let i = 0; i < 5; i++) {
                number += scorelist[i];
                sum += scorelist[i] * (5-i);
            }
            average = sum/number;
            let percentage = [];
            for (let i = 0; i < 5; i++) {
                percentage.push((scorelist[i]/number*100).toString());
            }
            this.setState({
                series:[
                    {
                        name: 'Percentage of User(%)',
                        data: percentage,
                    }
                ],
                average: average,
                userNum: number,
            })
        })
    }

    render() {
        return (
            <div>
                <div>Average Score: {this.state.average.toFixed(1)}</div>
                <div>{this.state.userNum} users scored</div>
                <NoneditStarRating average = {this.state.average}/>
                <ReactApexChart options={this.state.options} series={this.state.series} type = 'bar'/>
            </div>
        )
    }
}

export default HorizontalBar;