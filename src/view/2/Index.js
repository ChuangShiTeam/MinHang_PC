import React, {Component } from 'react';
import {connect} from 'dva';
import {Modal, Spin, Button} from 'antd';
import Slider from 'react-slick';

import http from '../../util/http';
import validate from '../../util/validate';
import constant from '../../util/constant';
import notification from '../../util/notification';
import BasicSoundPlayer from '../sound_player/BasicSoundPlayer';

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
            user_list: [],
            affiantVisible: false,
            is_affiant_load: false,
            affiantList: [],
            affiant:{},
            affiantSong: ''
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

        this.handleLoadAffiant();
    }

    componentWillUnmount() {

    }

    handleChange(index) {
        this.slider.slickGoTo(index);
    }

    handleLoadAffiant() {
        http.request({
            url: '/mobile/minhang/affiant/list',
            data: {},
            success: function (data) {
                this.setState({
                    affiantList: data
                });
            }.bind(this),
            complete: function () {

            }.bind(this)
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

    handleClickAffiant() {
        this.slider.slickGoTo(3);
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

    handlePlayAffiantMusic(url) {
        let result = url === this.state.affiantSong;
        if (result) {
            this.refs.basicSoundPlayer2.soundCloudAudio.pause();
        }
        this.setState({
            affiantSong: result ? '' : url
        }, function () {
            setTimeout(function () {

                if (result) {

                } else {
                    this.refs.basicSoundPlayer2.soundCloudAudio.play();
                }
            }.bind(this), 0);
        }.bind(this));
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
            is_history_load: true
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

    handleViewAffiant(affiant_id) {
        this.setState({
            is_affiant_load: true
        });
        http.request({
            url: '/mobile/minhang/affiant/find',
            data: {
                affiant_id: affiant_id
            },
            success: function (data) {
                this.setState({
                    affiant: data,
                    affiantVisible: true
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_affiant_load: false
                });
            }.bind(this)
        });
    }

    handleCloseViewAffiant() {
        this.setState({
            affiantVisible: false,
            affiant: {},
            is_affiant_load: false
        })
    }

    render() {

        return (
            <div className="index-2-bg">
                <div style={{
                        position: 'absolute',
                        width: '100%',
                        top: '620px'
                    }}>
                    {
                        this.state.affiantSong ?
                            <BasicSoundPlayer
                                ref="basicSoundPlayer2"
                                trackTitle="红色歌曲"
                                prevIndex={function () {
                                    
                                }}
                                nextIndex={function () {
                                    
                                }}
                                streamUrl={this.state.affiantSong}
                            />
                            :
                            ''

                    }
                </div>
                <div className="con_but">
                    <buttom className="con_but_00" onClick={this.handleClickAffiant.bind(this)}></buttom>
                    <buttom className="con_but_02" onClick={this.handleClickPartySong.bind(this)}></buttom>
                    <buttom className="con_but_01" onClick={this.handleClickPartyHistory.bind(this)}></buttom>
                </div>
                <div className="slef-slick-dots">
                    <Slider ref={c => this.slider = c } {...{
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                        afterChange: this.handleChange.bind(this)
                    }}>
                        <div key={4} className="index-2-carousel-item" >
                            <div className="index-2-affiant">
                                <div className="index-2-affiant-title">
                                    <Button style={{marginRight: '20px'}} onClick={this.handlePlayAffiantMusic.bind(this, require('../../video/1.mp3'))}>播放国际歌</Button>
                                    闵行区党建服务中心领誓人队伍
                                    <Button style={{marginLeft: '20px'}} onClick={this.handlePlayAffiantMusic.bind(this, require('../../video/2.mp3'))}>播放国歌</Button>
                                </div>
                                <div className="index-2-affiant-list">
                                    <ul>
                                        {
                                            this.state.affiantList.map((affiant, index) =>
                                                <li className="index-2-affiant-item" onClick={this.handleViewAffiant.bind(this, affiant.affiant_id)} key={index}>
                                                    <img className="index-2-affiant-user-avatar" src={affiant.affiant_avatar_file ? (constant.host + affiant.affiant_avatar_file.file_original_path) : require('../../image/index-01_userAvatar.png')} alt=""/>
                                                    <div className="index-2-affiant-user-name">{affiant.affiant_name}</div>
                                                </li>
                                            )
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div key={0} className="index-2-carousel-item" >
                            <div style={{
                                width: '1080px',
                                height: '1920px',
                                backgroundImage: 'url(' + require('../../image/index_01_bg-1.png') + ')'
                            }}></div>
                        </div>
                        <div key={3} className="index-2-carousel-item">
                            <div style={{
                                width: '1080px',
                                height: '1920px',
                                backgroundImage: 'url(' + require('../../image/index_01_bg-4.png') + ')'
                            }}></div>
                        </div>
                        <div key={1} className="index-2-carousel-item">
                            <div style={{
                                width: '1080px',
                                height: '1920px',
                                backgroundImage: 'url(' + require('../../image/index_01_bg-2.png') + ')'
                            }}></div>
                        </div>
                    </Slider>
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
                    title='领誓人'
                    width = {500}
                    visible={this.state.affiantVisible}
                    onOk={this.handleCloseViewAffiant.bind(this)}
                    onCancel={this.handleCloseViewAffiant.bind(this)}
                >
                    <Spin spinning={this.state.is_affiant_load}>
                        <div className="index-2-affiant-info">
                            <div className="index-2-affiant-info-avatar">
                                <img src={(this.state.affiant && this.state.affiant.affiant_avatar_file) ? (constant.host + this.state.affiant.affiant_avatar_file.file_original_path) : require('../../image/index-01_userAvatar.png')} alt=""/>
                            </div>
                            <div className="index-2-affiant-info-name">
                                <span>{this.state.affiant.affiant_name}</span>
                                <span style={{marginLeft: '10px',marginRight: '10px'}}>{this.state.affiant.affiant_sex}</span>
                                <span>{this.state.affiant.affiant_birthday}</span>
                            </div>
                            <div className="index-2-affiant-info-summary">{this.state.affiant.affiant_summary}</div>
                        </div>
                        <div className="index-2-affiant-decription" dangerouslySetInnerHTML={{__html: this.state.affiant.affiant_description}}>

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
