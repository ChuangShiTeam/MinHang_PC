import React, {Component } from 'react';
import {connect} from 'dva';
import {Modal} from 'antd';

import http from '../../util/http';
import validate from '../../util/validate';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            historyVisible: false,
            party_history: {},
            songVisible: false,
            party_song: {}

        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    handleClickPartyHistory() {
        http.request({
            url: '/mobile/minhang/party/history/random/find',
            data: {},
            success: function (data) {
                this.setState({
                    party_history: data,
                    historyVisible: true
                });
            }.bind(this),
            complete: function () {

            }
        });
    }

    handleClickPartySong() {
        http.request({
            url: '/mobile/minhang/party/song/random/find',
            data: {},
            success: function (data) {
                this.setState({
                    party_song: data,
                    songVisible: true
                });
            }.bind(this),
            complete: function () {

            }
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
                    title='朗读党史'
                    width = {800}
                    visible={this.state.historyVisible}
                    onOk={this.handleHistoryOk.bind(this)}
                    onCancel={this.handleHistoryCancel.bind(this)}
                >
                    <div className="modal-main" dangerouslySetInnerHTML={{__html: this.state.party_history.party_history_content?validate.unescapeHtml(this.state.party_history.party_history_content):null}}>

                    </div>
                </Modal>
                <Modal
                    title='跟唱党歌'
                    width = {800}
                    visible={this.state.songVisible}
                    onOk={this.handleSongOk.bind(this)}
                    onCancel={this.handleSongCancel.bind(this)}
                >
                    <div className="modal-main" dangerouslySetInnerHTML={{__html: this.state.party_song.party_song_content?validate.unescapeHtml(this.state.party_song.party_song_content):null}}>

                    </div>
                </Modal>
            </div>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
