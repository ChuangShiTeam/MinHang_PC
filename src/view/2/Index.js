import React, {Component } from 'react';
import {connect} from 'dva';
import {Modal,Spin} from 'antd';

import http from '../../util/http';
import validate from '../../util/validate';
import constant from '../../util/constant';
import notification from '../../util/notification';
import BasicSoundPlayer from '../sound_player/BasicSoundPlayer';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_show: 'history',
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

    handleChange() {
        this.setState({
            is_show: this.state.is_show === 'history'?'song':'history'
        });
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
        this.refs.basicSoundPlayer.soundCloudAudio.pause();
        this.setState({
            party_song: {},
            songVisible: false,
            user_list: []
        });
    }

    handleSongCancel() {
        this.refs.basicSoundPlayer.soundCloudAudio.pause();
        this.setState({
            party_song: {},
            songVisible: false,
            user_list: []
        });
    }

    prevSong() {
        let party_song_id = this.state.party_song.party_song_id;
        this.setState({
            is_song_load: true,
            party_song: {}
        });
        http.request({
            url: '/mobile/minhang/party/song/prev',
            data: {
                party_song_id: party_song_id
            },
            success: function (data) {
                this.setState({
                    party_song: data
                }, function() {
                    this.refs.basicSoundPlayer.soundCloudAudio.play();
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

    nextSong() {
        let party_song_id = this.state.party_song.party_song_id;
        this.setState({
            is_song_load: true,
            party_song: {}
        });
        http.request({
            url: '/mobile/minhang/party/song/next',
            data: {
                party_song_id: party_song_id
            },
            success: function (data) {
                this.setState({
                    party_song: data
                }, function() {
                    this.refs.basicSoundPlayer.soundCloudAudio.play();
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

    handlePrevHistory() {
        this.setState({
            is_history_load: true,
        });
        http.request({
            url: '/mobile/minhang/party/history/prev',
            data: {
                party_history_id: this.state.party_history.party_history_id
            },
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

    handleNextHistory() {
        this.setState({
            is_history_load: true,
        });
        http.request({
            url: '/mobile/minhang/party/history/next',
            data: {
                party_history_id: this.state.party_history.party_history_id
            },
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

    render() {
        
        return (
            <div className={this.state.is_show === 'history' ? 'index-2-bg-1': 'index-2-bg-2'}>
                <div className="con_but">
                    <buttom className="con_but_01" onClick={this.handleClickPartyHistory.bind(this)}>
                    </buttom>
                    <buttom className="con_but_02" onClick={this.handleClickPartySong.bind(this)}>
                    </buttom>
                </div>
                <div className="page_but">
                    <buttom className={this.state.is_show === 'history' ? 'page_but_01': 'page_but_02'} onClick={this.handleChange.bind(this)}>
                    </buttom>
                </div>
                <Modal
                    centered modal dialog
                    title='红色诗词'
                    width = {1000}
                    visible={this.state.historyVisible}
                    onOk={this.handleHistoryOk.bind(this)}
                    onCancel={this.handleHistoryCancel.bind(this)}
                >
                    <Spin spinning={this.state.is_history_load}>
                        <div className="modal-2-main" dangerouslySetInnerHTML={{__html: this.state.party_history.party_history_content?validate.unescapeHtml(this.state.party_history.party_history_content):null}}>

                        </div>
                        <div className="modal-button">
                            <buttom className="pre_but" onClick={this.handlePrevHistory.bind(this)}>
                            </buttom>
                            <buttom className="next_but" onClick={this.handleNextHistory.bind(this)}>
                            </buttom>
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
                    title='红色歌曲'
                    width = {1000}
                    visible={this.state.songVisible}
                    onOk={this.handleSongOk.bind(this)}
                    onCancel={this.handleSongCancel.bind(this)}
                >
                    <Spin spinning={this.state.is_song_load}>
                        <div className="modal-2-main">
                            <div dangerouslySetInnerHTML={{__html: this.state.party_song.party_song_content?validate.unescapeHtml(this.state.party_song.party_song_content):null}}>
                            </div>
                            <div className="modal-audio">
                                {
                                    this.state.party_song.party_song_url?
                                        <BasicSoundPlayer
                                            ref="basicSoundPlayer"
                                            trackTitle="红色歌曲"
                                            prevIndex={this.prevSong.bind(this)}
                                            nextIndex={this.nextSong.bind(this)}
                                            streamUrl={this.state.party_song.party_song_url}
                                        />
                                        :
                                        null

                                }
                            </div>
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
