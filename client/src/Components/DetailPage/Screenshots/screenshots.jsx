// import React, { Component } from 'react';
// import AliceCarousel from 'react-alice-carousel';
// import "react-alice-carousel/lib/alice-carousel.css";
// import {carousel, screenshotsCss, screenshotTitle} from './screenshots.module.scss';

// class Screenshots extends Component {
//     render() {
//         let screenshots = this.props.game[this.props.appid].data.screenshots;
//         screenshots = screenshots.map(image => {
//             return <a href = {image.path_full}><img className = {screenshotsCss} 
//             src = {image.path_full} alt = 'screenshot'/></a>;
//         })
//         //responsive for carousel
//         let responsive = {
//             0: {items: 1},
//             350: {items: 1},
//             700: {items: 2}, 
//             1024: {items: 3}
//         }
//         return(
//             <div className = {carousel}>
//                 <h3 className = {screenshotTitle}>Screen Shots</h3>
//                 <AliceCarousel mouseDragEnabled responsive = {responsive} 
//                 autoPlayInterval={5000} autoPlayDirection="ltr" autoPlay={true}>
//                     {screenshots}
//                 </AliceCarousel>
//             </div>       
//         )
//     }
// }

// export default Screenshots;


import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import {carousel, screenshotsCss, screenshotTitle, centerText} from './screenshots.module.scss';

class Screenshots extends Component {
    render() {
        let screenshots = this.props.game[this.props.appid].data.screenshots;
        if(screenshots == null){
            screenshots = "Undefined"
        } else{
            screenshots = screenshots.map(image => {
                return <a href = {image.path_full}><img className = {screenshotsCss} 
                src = {image.path_full} alt = 'screenshot'/></a>;
            })
        }
        
        //responsive for carousel
        let responsive = {
            0: {items: 1},
            350: {items: 1},
            700: {items: 2}, 
            1024: {items: 3}
        }

        let carouselFound = ()=>{
            if(screenshots == "Undefined"){
                return <h3 className = {centerText}>No Screen shots available for this game</h3>
            } else{
                return(
                    <AliceCarousel mouseDragEnabled responsive = {responsive} 
                autoPlayInterval={5000} autoPlayDirection="ltr" autoPlay={true}>
                    {screenshots}
                    </AliceCarousel>
                )
            }
        }

        return(
            <div className = {carousel}>
                <h3 className = {screenshotTitle}>Screen Shots</h3>
                {carouselFound()}
            </div>       
        )
    }
}

export default Screenshots;