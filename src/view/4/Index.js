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
            event: {

            },
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
                    data[i].event_list = [{
                        event_id: '0',
                        event_name: '0',
                        event_content: '000',
                        is_active: true
                    }, {
                        event_id: '1',
                        event_name: '1',
                        event_content: '111',
                        is_active: false
                    }, {
                        event_id: '2',
                        event_name: '2',
                        event_content: '222',
                        is_active: false
                    }, {
                        event_id: '3',
                        event_name: '3',
                        event_content: '333',
                        is_active: false
                    }, {
                        event_id: '4',
                        event_name: '4',
                        event_content: '444',
                        is_active: false
                    }]
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

    handleClickTimeline(timeline_id) {
        var data = this.state.timeline_list;

        for (var i = 0; i < data.length; i++) {
            if (data[i].timeline_id == timeline_id) {
                data[i].is_active = !data[i].is_active;

                if (data[i].is_active) {
                    data[i].width = 1820;
                } else {
                    data[i].width = 400;
                }

                for (var j = 0; j < data[i].event_list.length; j++) {
                    if (data[i].event_list[j].is_active) {
                        this.setState({
                            event: data[i].event_list[j]
                        });
                    }
                }
            } else {
                data[i].is_active = false;
                data[i].width = 400;
            }
        }

        this.setState({
            timeline_list: data
        });
    }

    handleClickEvent(timeline_id, event_id) {
        var data = this.state.timeline_list;

        for (var i = 0; i < data.length; i++) {
            if (data[i].timeline_id == timeline_id) {
                for (var j = 0; j < data[i].event_list.length; j++) {
                    if (data[i].event_list[j].event_id == event_id) {
                        data[i].event_list[j].is_active = true;

                        this.setState({
                            event: data[i].event_list[j]
                        });
                    } else {
                        data[i].event_list[j].is_active = false;
                    }
                }
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
                                        this.state.timeline_list.map((timeline) => {
                                            return (
                                                <div key={timeline.timeline_id} style={{width: timeline.width + "px"}}>
                                                    <div className="timeline-item" onClick={this.handleClickTimeline.bind(this, timeline.timeline_id)}>
                                                        <div className="timeline-item-date">2017</div>
                                                        <div className="timeline-item-name">title</div>
                                                        <img src={constant.host + timeline.timeline_image_file.file_path} alt=""/>
                                                    </div>
                                                    <div className="timeline-event" style={{visibility: timeline.is_active ? "visible" : "hidden"}}>
                                                        {
                                                            timeline.event_list.map((event) => {
                                                                return (
                                                                    <li className={event.is_active ? "active" : ""} onClick={this.handleClickEvent.bind(this, timeline.timeline_id, event.event_id)}>ddd</li>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="timeline-event-item" style={{visibility: timeline.is_active ? "visible" : "hidden"}}>
                                                        <div className="timeline-event-item-main">
                                                            {this.state.event.event_content}
                                                        </div>
                                                        <div>
                                                            <img className="task-qrcode" src="" alt="" />
                                                            <div className="task-member">
                                                                <div className="member-avatar"></div>
                                                                <div className="member-name">user name</div>
                                                            </div>
                                                            <div className="task-member">
                                                                <div className="member-avatar"></div>
                                                                <div className="member-name">user name</div>
                                                            </div>
                                                            <div className="task-member">
                                                                <div className="member-avatar"></div>
                                                                <div className="member-name">user name</div>
                                                            </div>
                                                            <div className="task-member">
                                                                <div className="member-avatar"></div>
                                                                <div className="member-name">user name</div>
                                                            </div>
                                                            <div className="task-member">
                                                                <div className="member-avatar"></div>
                                                                <div className="member-name">user name</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                                :
                                ''
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
