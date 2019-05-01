import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

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
                    data: ['40', '30', '20', '8', '2'],
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <ReactApexChart options={this.state.options} series={this.state.series} type='bar' />
            </div>
        )
    }
}

export default HorizontalBar;