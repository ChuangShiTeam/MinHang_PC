import React, {Component } from 'react';
import {connect} from 'dva';
import {Spin} from 'antd';
import Slider from 'react-slick';

import constant from '../../util/constant';
import http from '../../util/http';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeline_list: [],
            is_load: false
        }
    }

    componentDidMount() {
        this.handleLoadTimeline();
    }

    componentWillUnmount() {

    }

    handleLoadTimeline() {
        this.setState({
            is_load: true
        });
        http.request({
            url: '/mobile/minhang/timeline/list',
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].is_level_0 = false;
                }

                this.setState({
                    timeline_list: data
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: false
                });
            }.bind(this)
        });
    }

    handleClick(timeline_id) {
        var data = this.state.timeline_list;

        for (var i = 0; i < data.length; i++) {
            if (data[i].timeline_id == timeline_id) {
                data[i].is_level_0 = !data[i].is_level_0;
            } else {
                data[i].is_level_0 = false;
            }
        }

        this.setState({
            timeline_list: data
        });
    }

    handleNext() {
        this.slider.slickNext();
    }
    handlePrevious() {
        this.slider.slickPrev();
    }

    render() {
        return (
            <Spin spinning={this.state.is_load}>
                <div className="index-4-bg">
                    <div className="index-4-carousel">
                        {
                            this.state.timeline_list.length > 0 ?
                                <Slider ref={c => this.slider = c } {...{
                                    infinite: true,
                                    variableWidth: true,
                                    speed: 500,
                                    slidesToShow: 7,
                                    slidesToScroll: 1,
                                    arrows: false
                                }}>
                                    {
                                        this.state.timeline_list.map((timeline, index) => {
                                            return (
                                                <div key={index} style={{width: timeline.is_level_0 ? 820 : 400 + "px"}}>
                                                    <div className="timeline-item" onClick={this.handleClick.bind(this, timeline.timeline_id)}>
                                                        <div className="timeline-item-date">2017</div>
                                                        <div className="timeline-item-name">title</div>
                                                        <img src={constant.host + timeline.timeline_image_file.file_path} alt=""/>
                                                    </div>
                                                    <div className="timeline-event" style={{visibility: timeline.is_level_0 ? "visible" : "hidden"}}>
                                                        <li className="active">ddd</li>
                                                        <li className="active">ddd</li>
                                                        <li className="active">ddd</li>
                                                        <li className="active">ddd</li>
                                                        <li className="active">ddd</li>
                                                        <li className="active">ddd</li>
                                                        <li className="active">ddd</li>
                                                        <li className="">ddd</li>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>:null
                        }
                    </div>
                    <div className="index-4-previous" onClick={this.handlePrevious.bind(this)}></div>
                    <div className="index-4-next" onClick={this.handleNext.bind(this)}></div>
                </div>
            </Spin>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
