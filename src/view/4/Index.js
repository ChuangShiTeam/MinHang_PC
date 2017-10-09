import React, {Component } from 'react';
import {connect} from 'dva';
import Slider from 'react-slick';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    handleClick() {

    }

    handleNext() {
        this.slider.slickNext();
    }
    handlePrevious() {
        this.slider.slickPrev();
    }

    render() {
        return (
            <div className="index-4-bg">
                <div className="index-4-carousel">
                    <Slider ref={c => this.slider = c } {...{
                        infinite: true,
                        speed: 500,
                        slidesToShow: 7,
                        slidesToScroll: 1,
                        arrows: false
                    }}>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                        <div className="index-4-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_4_carousel.png')} alt=""/></div>
                    </Slider>

                </div>
                <div className="index-4-previous" onClick={this.handlePrevious.bind(this)}></div>
                <div className="index-4-next" onClick={this.handleNext.bind(this)}></div>
            </div>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
