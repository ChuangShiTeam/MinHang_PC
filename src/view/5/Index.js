import React, {Component} from 'react';
import {Pagination} from 'antd';
import {connect} from 'dva';
import {Modal, Spin} from 'antd';
import {DefaultPlayer as Video} from 'react-html5video';
import http from '../../util/http';

var taskTimer;
var taskSecond = 3000;
var millisecondTimer;
var millisecond = 0;

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
            is_load: false
        }
    }

    componentDidMount() {
        let page_index = this.state.page_index;
        this.handleLoadVideo(page_index);
    }

    componentWillUnmount() {

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
        this.setState({
            video: video,
            visible: true
        }, function () {
            this.refs.video.videoEl.src = this.state.video.video_url;
            this.refs.video.videoEl.play();
        }.bind(this));
    }

    handleCancelVideo() {
        this.refs.video.videoEl.pause();

        this.setState({
            video: {},
            visible: false
        });
    }

    handleCanceQuestion() {
        this.refs.video.videoEl.play();

        taskTimer = setTimeout(function () {
            this.refs.video.videoEl.pause();

            this.setState({
                is_question: true
            });
        }.bind(this), 2000);

        this.setState({
            is_question: false
        });
    }

    handleChangePage(page) {
        this.handleLoadVideo(page);
    }

    handlePayVideo() {
        taskTimer = setTimeout(function () {
            this.setState({
                is_question: true,
                is_stop_to_answer_the_question: true
            }, function () {
                this.refs.video.videoEl.pause();

                millisecond = 0;
            });
        }.bind(this), taskSecond - millisecond);

        millisecondTimer = setTimeout(function () {
            millisecond++;
        }.bind(this), 1);
        console.log('pay');
    }

    handlePauseVideo() {
        clearTimeout(taskTimer);

        clearTimeout(millisecondTimer);

        console.log(millisecond);
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
                        width={1000}
                        visible={this.state.visible}
                        onOk={this.handleCancelVideo.bind(this)}
                        onCancel={this.handleCancelVideo.bind(this)}
                    >
                        <div className="modal-main">
                            <div>
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
                                123
                            </div>
                        </div>
                        <div className="modal-footer">
                            <img className="task-qrcode" src="" alt=""/>
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
                    </Modal>
                </div>
            </Spin>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
