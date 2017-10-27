import React, {Component } from 'react';
import {connect} from 'dva';
import {Modal,Spin} from 'antd';

import http from '../../util/http';
import validate from '../../util/validate';
import constant from '../../util/constant';
import notification from '../../util/notification';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            historyVisible: false,
            is_history_load: false,
            party_history: {},
            songVisible: false,
            is_song_load:false,
            party_song: {},
            user_list: []
        }
    }

    componentDidMount() {

        notification.on('loadPartyHistory', this, function (data) {
            if (this.state.party_history && this.state.party_history.task_id) {
                this.handleReloadUser(this.state.party_history.task_id);
            }
        });
        notification.on('loadPartySong', this, function (data) {
            if (this.state.party_song && this.state.party_song.task_id) {
                this.handleReloadUser(this.state.party_song.task_id);
            }
        });
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

    handleClickPartyHistory() {
        this.setState({
            is_history_load: true,
            historyVisible: true
        });
        http.request({
            url: '/mobile/minhang/party/history/random/find',
            data: {},
            success: function (data) {
                this.setState({
                    party_history: data
                }, function() {
                    this.handleReloadUser(data.task_id);
                }.bind(this));
            }.bind(this),
            complete: function () {
                this.setState({
                    is_history_load: false
                });
            }.bind(this)
        });
    }

    handleClickPartySong() {
        this.setState({
            is_song_load: true,
            songVisible: true
        });
        http.request({
            url: '/mobile/minhang/party/song/random/find',
            data: {},
            success: function (data) {
                this.setState({
                    party_song: data
                }, function() {
                    this.handleReloadUser(data.task_id);
                }.bind(this));
            }.bind(this),
            complete: function () {
                this.setState({
                    is_song_load: false
                });
            }.bind(this)
        });
    }

    handleHistoryOk() {
        this.setState({
            party_history: {},
            historyVisible: false,
            user_list: []
        });
    }

    handleHistoryCancel() {
        this.setState({
            party_history: {},
            historyVisible: false,
            user_list: []
        });
    }

    handleSongOk() {
        this.setState({
            party_song: {},
            songVisible: false,
            user_list: []
        });
    }

    handleSongCancel() {
        this.setState({
            party_song: {},
            songVisible: false,
            user_list: []
        });
    }

    render() {
        return (
            <div className="index-2-bg">
                <div className="con_but">
                    <buttom className="con_but_01" onClick={this.handleClickPartyHistory.bind(this)}>
                    </buttom>
                    <buttom className="con_but_02" onClick={this.handleClickPartySong.bind(this)}>
                    </buttom>
                </div>
                <Modal
                    centered modal dialog
                    title='朗读党史'
                    width = {1000}
                    visible={this.state.historyVisible}
                    onOk={this.handleHistoryOk.bind(this)}
                    onCancel={this.handleHistoryCancel.bind(this)}
                >
                    <Spin spinning={this.state.is_history_load}>
                        <div className="modal-2-main" dangerouslySetInnerHTML={{__html: this.state.party_history.party_history_content?validate.unescapeHtml(this.state.party_history.party_history_content):null}}>

                        </div>
                        <div className="modal-footer">
                            <img className="task-qrcode" src={constant.host + this.state.party_history.task_qrcode_url} alt=""/>
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
                    </Spin>
                </Modal>
                <Modal
                    centered modal dialog
                    title='跟唱党歌'
                    width = {1000}
                    visible={this.state.songVisible}
                    onOk={this.handleSongOk.bind(this)}
                    onCancel={this.handleSongCancel.bind(this)}
                >
                    <Spin spinning={this.state.is_song_load}>
                        <div className="modal-2-main">
                            <div dangerouslySetInnerHTML={{__html: this.state.party_song.party_song_content?validate.unescapeHtml(this.state.party_song.party_song_content):null}}>
                            </div>
                            {
                                this.state.party_song.party_song_url?
                                    <audio src={this.state.party_song.party_song_url} controls="controls">
                                    </audio>:null
                            }
                        </div>
                        <div className="modal-footer">
                            <img className="task-qrcode" src={constant.host + this.state.party_song.task_qrcode_url} alt=""/>
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
                    </Spin>
                </Modal>
            </div>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
