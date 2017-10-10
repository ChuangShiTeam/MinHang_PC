import React, {Component} from 'react';
import {Pagination} from 'antd';
import {connect} from 'dva';
import {Modal} from 'antd';
import {Player, ControlBar} from 'video-react';
import http from '../../util/http';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            video_list: [],
            total: 0,
            page_index: 1,
            page_size: 15,
            video: {}
        }
    }

    componentDidMount() {
        let page_index = this.state.page_index;
        this.handleLoadVideo(page_index);
    }

    componentWillUnmount() {

    }

    handleLoadVideo(page_index) {
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

            }
        });
    }

    handleClick(video) {
        this.setState({
            video: video,
            visible: true
        });
    }

    handleOk() {
        this.setState({
            video: {},
            visible: false
        });
    }

    handleCancel() {
        this.setState({
            video: {},
            visible: false
        });
    }

    handleChange(page) {
        this.handleLoadVideo(page);
    }

    render() {
        return (
            <div className="index-5-bg">
                <div className="index-5-main">
                    <div className="index-5-title">课堂视频列表</div>
                    <ul className="video-li">
                        {
                            this.state.video_list.map((video, index) => {
                                return (
                                    <li onClick={this.handleClick.bind(this, video)}>
                                        <img src={require('../../image/index_02_video.png')} alt=""/>
                                        <div className="index-5-main-text">{video.video_title}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="index-5-page">
                        <Pagination  current={this.state.page_index}  pageSize={this.state.page_size} total={this.state.total} onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
                <Modal
                    title={this.state.video.video_title}
                    width={1000}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div className="modal-main">
                        <div>
                            <Player ref="player" playsInline={true}>
                                <source src={this.state.video.video_url}/>
                                <ControlBar autoHide={true} disableDefaultControls={true}>
                                </ControlBar>
                            </Player>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
