import React, {Component} from 'react';
import {connect} from 'dva';
import {Spin} from 'antd';

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
                for (let i = 0; i < data.length; i++) {
                    data[i].is_show_qrcode = false;
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
        let data = this.state.timeline_list;

        for (let i = 0; i < data.length; i++) {
            if (data[i].timeline_id === timeline_id) {
                data[i].is_show_qrcode = !data[i].is_show_qrcode;
            } else {
                data[i].is_show_qrcode = false;
            }
        }

        this.setState({
            timeline_list: data
        });
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
                                        index % 2 === 0 ?
                                            <div key={index} className="timeline-up-item" onClick={this.handleClickTimeline.bind(this, timeline.timeline_id)}>
                                                <div className="timeline-up-item-title">{timeline.timeline_year}</div>
                                                {
                                                    timeline.is_show_qrcode && timeline.timeline_event_list[0] && timeline.timeline_event_list[0].task_qrcode_url ?
                                                        <img className="timeline-up-item-qrcode" src={constant.host + timeline.timeline_event_list[0].task_qrcode_url} alt="" />
                                                        :
                                                        <div className="timeline-up-item-content" dangerouslySetInnerHTML={{__html: timeline.timeline_description?timeline.timeline_description:null}}>
                                                        </div>
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
                                        index % 2 === 1 ?
                                            <div key={index} className="timeline-up-item" onClick={this.handleClickTimeline.bind(this, timeline.timeline_id)}>
                                                <div className="timeline-up-item-title">{timeline.timeline_year}</div>
                                                {
                                                    timeline.is_show_qrcode && timeline.timeline_event_list[0] && timeline.timeline_event_list[0].task_qrcode_url ?
                                                        <img className="timeline-up-item-qrcode" src={constant.host + timeline.timeline_event_list[0].task_qrcode_url} alt="" />
                                                        :
                                                        <div className="timeline-up-item-content" dangerouslySetInnerHTML={{__html: timeline.timeline_description?timeline.timeline_description:null}}>
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


Index.propTypes = {};

export default connect(() => ({}))(Index);
