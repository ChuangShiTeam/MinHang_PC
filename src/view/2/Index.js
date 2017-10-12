import React, {Component } from 'react';
import {connect} from 'dva';
import {Modal,Spin} from 'antd';
import {Player, ControlBar} from 'video-react';

import http from '../../util/http';
import validate from '../../util/validate';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            historyVisible: false,
            is_history_load: false,
            party_history: {},
            songVisible: false,
            is_song_load:false,
            party_song: {}

        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
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
                });
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
                });
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
            historyVisible: false
        });
    }

    handleHistoryCancel() {
        this.setState({
            party_history: {},
            historyVisible: false
        });
    }

    handleSongOk() {
        this.setState({
            party_song: {},
            songVisible: false
        });
    }

    handleSongCancel() {
        this.setState({
            party_song: {},
            songVisible: false
        });
    }

    render() {
        console.log('party_song', this.state.party_song);
        return (
            <div className="index-2-bg">
                <div className="con_but">
                    <buttom className="con_but_01" onClick={this.handleClickPartyHistory.bind(this)}>
                        <img src={require('../../image/index_01_but01.png')} alt=""/>
                    </buttom>
                    <buttom className="con_but_02" onClick={this.handleClickPartySong.bind(this)}>
                        <img src={require('../../image/index_01_but02.png')} alt=""/>
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
                        <div className="modal-main" dangerouslySetInnerHTML={{__html: this.state.party_history.party_history_content?validate.unescapeHtml(this.state.party_history.party_history_content):null}}>

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
                        <div className="modal-main">
                            <div dangerouslySetInnerHTML={{__html: this.state.party_song.party_song_content?validate.unescapeHtml(this.state.party_song.party_song_content):null}}>
                            </div>
                            {
                                this.state.party_song.party_song_url?
                                    <audio src={this.state.party_song.party_song_url}controls="controls">
                                    </audio>:null
                            }
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
                    </Spin>
                </Modal>
            </div>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
