import React, {Component } from 'react';
import {connect} from 'dva';
import Slider from 'react-slick';

import constant from '../../util/constant';
import http from '../../util/http';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeline_list: []
        }
    }

    componentDidMount() {
        this.handleLoadTimeline();
    }

    componentWillUnmount() {
        
    }

    handleLoadTimeline() {
        http.request({
            url: '/mobile/minhang/timeline/list',
            data: {},
            success: function (data) {
                this.setState({
                    timeline_list: data
                });
            }.bind(this),
            complete: function () {

            }
        });
    }

    handleClick(timeline_id) {

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
                        {
                            this.state.timeline_list.map((timeline, index) => {
                                return (
                                    <div key={index} className="index-4-carousel-item" onClick={this.handleClick.bind(this, timeline.timeline_id)}>
                                        <img src={constant.host + timeline.timeline_image_file.file_path} alt=""/>
                                    </div>
                                )
                            })
                        }
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
