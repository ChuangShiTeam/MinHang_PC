import React, {Component} from 'react';
import {Pagination} from 'antd';
import {connect} from 'dva';
import {Modal, Spin} from 'antd';
import {DefaultPlayer as Video} from 'react-html5video';
import http from '../../util/http';
import notification from '../../util/notification';
import constant from '../../util/constant';

var taskTimer;

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            is_question: false,
            is_stop_to_answer_the_question: false,
            video_list: [],
            total: 0,
            page_index: 1,
            page_size: 15,
            video: {},
            video_task_list: [],
            video_task: {},
            video_task_list_index: 0,
            user_list: [],
            is_load: false
        }
    }

    componentDidMount() {
        notification.on('loadVideoTask', this, function (data) {
            if (this.state.video_task_list && this.state.video_task.task_id) {
                this.handleReloadUser(this.state.video_task.task_id);
            }
        });
        let page_index = this.state.page_index;
        this.handleLoadVideo(page_index);
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

    handleLoadVideo(page_index) {
        this.setState({
            is_load: true
        });
        http.request({
            url: '/mobile/minhang/video/list',
            data: {
                page_index: page_index,
                page_size: this.state.page_size
            },
            success: function (data) {
                this.setState({
                    page_index: page_index,
                    video_list: data.list,
                    total: data.total
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: false
                });
            }.bind(this)
        });
    }

    handleClickVideo(video) {
        let video_task_list = video.video_task_list;
        if (video_task_list && video_task_list.length > 0) {
            this.setState({
                video: video,
                video_task_list: video_task_list,
                video_task_list_index: 0,
                video_task: video_task_list[0],
                visible: true
            }, function () {
                this.refs.video.videoEl.src = this.state.video.video_url;
                taskTimer = setTimeout(function () {
                    this.refs.video.videoEl.pause();
                    this.setState({
                        is_question: true
                    }, function() {
                        this.handleReloadUser(this.state.video_task.task_id);
                    }.bind(this));
                }.bind(this), video_task_list[0].video_task_time * 1000);
                this.refs.video.videoEl.play();
            }.bind(this));
        }
    }

    handleCancelVideo() {
        this.refs.video.videoEl.pause();
        clearTimeout(taskTimer);
        this.setState({
            video: {},
            video_task_list: [],
            video_task:{},
            video_task_list_index: 0,
            user_list: [],
            visible: false
        });
    }

    handleCanceQuestion() {
        this.refs.video.videoEl.play();
        let {video_task_list, video_task_list_index, video_task} = this.state;
        if ((video_task_list_index + 1) < video_task_list.length) {
            taskTimer = setTimeout(function () {
                this.refs.video.videoEl.pause();
                this.setState({
                    is_question: true,
                    video_task_list_index: this.state.video_task_list_index + 1 ,
                    video_task: this.state.video_task_list[this.state.video_task_list_index + 1]
                }, function() {
                    this.handleReloadUser(this.state.video_task.task_id);
                }.bind(this));
            }.bind(this), (video_task_list[video_task_list_index + 1].video_task_time - video_task.video_task_time) * 1000);

        } else {
            this.setState({
                video_task_list: [],
                video_task:{},
                video_task_list_index: 0,
                user_list: []
            });
        }
        this.setState({
            is_question: false
        });
    }

    handleChangePage(page) {
        this.handleLoadVideo(page);
    }

    handlePayVideo() {

    }

    handlePauseVideo() {


    }

    render() {
        return (
            <Spin spinning={this.state.is_load}>
                <div className="index-5-bg">
                    <div className="index-5-main">
                        <div className="index-5-title">课堂视频列表</div>
                        <ul className="video-li">
                            {
                                this.state.video_list.map((video, index) => {
                                    return (
                                        <li key={index} onClick={this.handleClickVideo.bind(this, video)}>
                                            <img src={require('../../image/index_02_video.png')} alt=""/>
                                            <div className="index-5-main-text">{video.video_title}</div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="index-5-page">
                            <Pagination current={this.state.page_index} pageSize={this.state.page_size}
                                        total={this.state.total} onChange={this.handleChangePage.bind(this)}/>
                        </div>
                    </div>
                    <Modal
                        centered modal dialog
                        title={this.state.video.video_title}
                        width={1050}
                        visible={this.state.visible}
                        onOk={this.handleCancelVideo.bind(this)}
                        onCancel={this.handleCancelVideo.bind(this)}
                    >
                        <div className="modal-main">
                            <div className="video-body">
                                <Video
                                    ref="video"
                                    muted
                                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                    poster=""
                                    onPlay = {this.handlePayVideo.bind(this)}
                                    onPause={this.handlePauseVideo.bind(this)}
                                >
                                    <source type="video/mp4"/>
                                </Video>
                            </div>
                            
                        </div>
                    </Modal>
                    <Modal
                        centered modal dialog
                        title="问题"
                        width={1000}
                        visible={this.state.is_question}
                        onOk={this.handleCanceQuestion.bind(this)}
                        onCancel={this.handleCanceQuestion.bind(this)}
                    >
                        <div className="modal-main">
                            <div>
                                {
                                    this.state.video_task && this.state.video_task.question_list && this.state.video_task.question_list.length > 0?
                                        <div>
                                            {
                                                this.state.video_task.question_list.map(question => {
                                                    return (
                                                        <div>
                                                            {question.question_title}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            {
                                this.state.video_task && this.state.video_task.task_qrcode_url ?
                                    <img className="task-qrcode" src={constant.host + this.state.video_task.task_qrcode_url} alt=""/>
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
                    </Modal>
                </div>
            </Spin>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
