import React, {Component} from 'react';
import {connect} from 'dva';
import {Spin} from 'antd';
import Slider from 'react-slick';

import constant from '../../util/constant';
import http from '../../util/http';
import validate from '../../util/validate';
import notification from '../../util/notification';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeline_list: [{
                timeline_id: '0',
                timeline_name: '0',
                timeline_content: '0',
                is_show_qrcode: true
            }, {
                timeline_id: '1',
                timeline_name: '1',
                timeline_content: '1',
                is_show_qrcode: false
            }, {
                timeline_id: '2',
                timeline_name: '2',
                timeline_content: '2',
                is_show_qrcode: false
            }, {
                timeline_id: '3',
                timeline_name: '3',
                timeline_content: '3',
                is_show_qrcode: false
            }],
            timeline_event: {},
            is_load: false,
            user_list: []
        }
    }

    componentDidMount() {
        notification.on('loadTimelineEvent', this, function (data) {
            if (this.state.timeline_event && this.state.timeline_event.task_id) {
                this.handleReloadUser(this.state.timeline_event.task_id);
            }
        });
        // this.handleLoadTimeline();
    }

    componentWillUnmount() {

    }

    handleReloadUser(task_id) {
        http.request({
            url: '/mobile/minhang/task/user/complete/list',
            data: {
                task_id: task_id,
                page_index: 1,
                page_size: 8
            },
            success: function (data) {
                this.setState({
                    user_list: data
                });
            }.bind(this),
            complete: function () {

            }.bind(this)
        });
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
                    if (data[i].timeline_event_list && data[i].timeline_event_list.length > 0) {
                        data[i].timeline_event_list = data[i].timeline_event_list.map(timeline_event => {
                            timeline_event.is_active = false;
                            return timeline_event;
                        })
                        data[i].timeline_event_list[0].is_active = true;
                    }
                    data[i].is_active = false;
                    data[i].width = 1000;
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
                    data[i].width = 1000;
                } else {
                    data[i].width = 1000;
                }

                for (var j = 0; j < data[i].timeline_event_list.length; j++) {
                    if (data[i].timeline_event_list[j].is_active) {
                        this.setState({
                            timeline_event: data[i].timeline_event_list[j]
                        }, function () {
                            this.handleReloadUser(this.state.timeline_event.task_id);
                        }.bind(this));
                    }
                }
            } else {
                data[i].is_active = false;
                data[i].width = 1000;
            }
        }

        this.setState({
            timeline_list: data
        });
    }

    handleClickEvent(timeline_id, timeline_event_id) {
        var data = this.state.timeline_list;

        for (var i = 0; i < data.length; i++) {
            if (data[i].timeline_id == timeline_id) {
                for (var j = 0; j < data[i].timeline_event_list.length; j++) {
                    if (data[i].timeline_event_list[j].timeline_event_id == timeline_event_id) {
                        data[i].timeline_event_list[j].is_active = true;

                        this.setState({
                            timeline_event: data[i].timeline_event_list[j]
                        }, function () {
                            this.handleReloadUser(this.state.timeline_event.task_id);
                        }.bind(this));
                    } else {
                        data[i].timeline_event_list[j].is_active = false;
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

    handleTimeline(timeline_id) {

    }

    render() {
        return (
            <div className="index-4-div">
                <Spin spinning={this.state.is_load}>
                    <div className="index-4-bg">
                        <div className="timeline-up">
                            {
                                this.state.timeline_list.map((timeline, index) => {
                                    return (
                                        index % 2 == 0 ?
                                            <div key={index} className="timeline-up-item" onClick={this.handleTimeline.bind(this, timeline.timeline_id)}>
                                                <div className="timeline-up-item-title">2017</div>
                                                {
                                                    timeline.is_show_qrcode ?
                                                        <img className="timeline-up-item-qrcode" src="http://api.chuangshi.nowui.com/upload/8acc2d49ad014f418878d1a16336c16b/001f46fc946647efa4bccaa9735f94e6.png" alt="" />
                                                        :
                                                        <div className="timeline-up-item-content">{timeline.timeline_content}</div>
                                                }
                                            </div>
                                            :
                                            ""
                                    )
                                })
                            }
                        </div>
                        <div className="timeline-down">
                            {
                                this.state.timeline_list.map((timeline, index) => {
                                    return (
                                        index % 2 == 1 ?
                                            <div key={index} className="timeline-up-item" onClick={this.handleTimeline.bind(this, timeline.timeline_id)}>
                                                <div className="timeline-up-item-title">2017</div>
                                                {
                                                    timeline.is_show_qrcode ?
                                                        <img className="timeline-up-item-qrcode" src="http://api.chuangshi.nowui.com/upload/8acc2d49ad014f418878d1a16336c16b/001f46fc946647efa4bccaa9735f94e6.png" alt="" />
                                                        :
                                                        <div className="timeline-up-item-content">
                                                            <img src="http://api.chuangshi.nowui.com/upload/8acc2d49ad014f418878d1a16336c16b/001f46fc946647efa4bccaa9735f94e6.png" alt="" />
                                                        </div>
                                                }
                                            </div>
                                            :
                                            ""
                                    )
                                })
                            }
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }
}

;
<div className="timeline-down">
    <div className="timeline-down-item">
        <div className="timeline-down-item-title">2017</div>
        <div className="timeline-down-item-content">2017</div>
    </div>
    <div className="timeline-down-item"></div>
    <div className="timeline-down-item"></div>
</div>

Index.propTypes = {};

export default connect(() => ({}))(Index);
