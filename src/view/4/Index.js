import React, {Component } from 'react';
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
            timeline_list: [],
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
        this.handleLoadTimeline();
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

                for (var j = 0; j < data[i].timeline_event_list.length; j++) {
                    if (data[i].timeline_event_list[j].is_active) {
                        this.setState({
                            timeline_event: data[i].timeline_event_list[j]
                        }, function() {
                            this.handleReloadUser(this.state.timeline_event.task_id);
                        }.bind(this));
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

    handleClickEvent(timeline_id, timeline_event_id) {
        var data = this.state.timeline_list;

        for (var i = 0; i < data.length; i++) {
            if (data[i].timeline_id == timeline_id) {
                for (var j = 0; j < data[i].timeline_event_list.length; j++) {
                    if (data[i].timeline_event_list[j].timeline_event_id == timeline_event_id) {
                        data[i].timeline_event_list[j].is_active = true;

                        this.setState({
                            timeline_event: data[i].timeline_event_list[j]
                        });
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
                                                        <div className="timeline-item-date">{timeline.timeline_year}</div>
                                                        <div className="timeline-item-name">{timeline.timeline_description}</div>
                                                        <img src={constant.host + timeline.timeline_image_file.file_path} alt=""/>
                                                    </div>
                                                    <div className="timeline-event" style={{visibility: timeline.is_active ? "visible" : "hidden"}}>
                                                        {
                                                            timeline.timeline_event_list.map((timeline_event) => {
                                                                return (
                                                                    <li className={timeline_event.is_active ? "active" : ""} onClick={this.handleClickEvent.bind(this, timeline.timeline_id, timeline_event.timeline_event_id)}>{timeline_event.timeline_event_title}</li>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="timeline-event-item" style={{visibility: timeline.is_active ? "visible" : "hidden"}}>
                                                        <div className="timeline-event-item-main"
                                                             dangerouslySetInnerHTML={{__html: this.state.timeline_event.timeline_event_content?validate.unescapeHtml(this.state.timeline_event.timeline_event_content):null}}>

                                                        </div>
                                                        <div>
                                                                {
                                                                    this.state.timeline_event.task_qrcode_url?
                                                                        <img className="task-qrcode" src={constant.host + this.state.timeline_event.task_qrcode_url} alt="" />
                                                                        :
                                                                        null
                                                                }

                                                                {
                                                                    this.state.user_list.map((user, index) => {
                                                                        return (
                                                                        <div className="task-member" key={index}>
                                                                        <div className="member-avatar">
                                                                        <img src={user.user_avatar} alt=""/>
                                                                        </div>
                                                                        <div className="member-name">{user.user_name}</div>
                                                                        </div>)
                                                                    })
                                                                }
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
