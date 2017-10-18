import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal, Spin} from 'antd';
import Slider from 'react-slick';
import notification from '../../util/notification';
import http from '../../util/http';
import constant from '../../util/constant';
import validate from '../../util/validate';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            is_load: false,
            poster: {},
            poster_list: [],
            user_list: [],
            member_list: []
        }
    }

    componentDidMount() {
        notification.on('loadPoster', this, function (data) {
            this.handleReloadUser();
        });
        notification.on('loadMember', this, function (data) {
            this.handleReloadMember();
        });
        this.handleLoadPoster();
        this.handleReloadMember();
    }

    componentWillUnmount() {
        notification.remove('event', this);
    }

    handleLoadPoster() {
        this.setState({
            is_load: true
        });
        http.request({
            url: '/mobile/minhang/poster/list',
            data: {},
            success: function (data) {
                this.setState({
                    poster_list: data
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: false
                });

            }.bind(this)
        });
    }

    handleReloadMember() {
        this.setState({
            is_load: true
        });
        http.request({
            url: '/mobile/minhang/member/list',
            data: {
                page_index: 1,
                page_size: 7
            },
            success: function (data) {
                this.setState({
                    member_list: data
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: false
                });
            }.bind(this)
        });
    }

    handleNext() {
        this.slider.slickNext();
    }

    handlePrevious() {
        this.slider.slickPrev();
    }

    handleClick(poster) {
        this.setState({
            poster: poster,
            visible: true
        }, function() {
            this.handleReloadUser();
        }.bind(this));
    }

    handleReloadUser() {
        http.request({
            url: '/mobile/minhang/task/member/picture/list',
            data: {
                task_id: this.state.poster.task_id,
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

    handleOk() {
        this.setState({
            poster: {},
            visible: false,
            user_list: []
        });
    }

    handleCancel() {
        this.setState({
            poster: {},
            visible: false,
            user_list: []
        });
    }

    render() {
        return (
            <Spin spinning={this.state.is_load}>
                <div className="index-0-bg">
                    <div className="index-0-carousel">
                        {
                            this.state.poster_list.length > 0 ?
                                <Slider ref={c => this.slider = c } {...{
                                    infinite: true,
                                    autoplay: true,
                                    speed: 500,
                                    slidesToShow: 4,
                                    slidesToScroll: 1,
                                    arrows: false
                                }}>
                                    {
                                        this.state.poster_list.map((poster, index) => {
                                            return (
                                                <div key={index} className="index-0-carousel-item"
                                                     onClick={this.handleClick.bind(this, poster)}>
                                                    <img src={constant.host + poster.poster_image_file.file_path}
                                                         alt=""/>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider> : null
                        }

                    </div>
                    <div>
                        <span className='index-0-carousel-previous' onClick={this.handlePrevious.bind(this)}>
                            <img src={require('../../image/index_00_pre.png')} alt=""/>
                        </span>
                        <span className='index-0-carousel-next' onClick={this.handleNext.bind(this)}>
                            <img src={require('../../image/index_00_next.png')} alt=""/>
                        </span>
                    </div>

                    <div className="side">
                        <div className="public_signal">
                            <img src={require('../../image/code_img_00.jpg')} alt=""/>
                            <p>扫二维码关注公众号</p>
                        </div>
                        <div className="member">
                            <p>登陆成功的党员</p>
                            <ul>
                                {
                                    this.state.member_list.map((member, index) => {
                                        return (
                                            <li key={index}>
                                                <img className="member-image" src={member.user_avatar}
                                                     alt=""/>
                                                <span>{member.user_name}</span>
                                            </li>)
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <Modal
                        centered
                        title={this.state.poster.poster_title?this.state.poster.poster_title:null}
                        width={1000}
                        visible={this.state.visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <div className="modal-main"
                             dangerouslySetInnerHTML={{__html: this.state.poster.poster_content?validate.unescapeHtml(this.state.poster.poster_content):null}}>
                        </div>
                        <div className="modal-footer">
                            <img className="task-qrcode" src={constant.host + this.state.poster.task_qrcode_url} alt=""/>
                            {
                                this.state.user_list.map((user, index) => {
                                    return (
                                    <div className="task-member" key={index}>
                                        <div className="member-avatar">
                                            <img src={constant.host + user.user_avatar} alt=""/>
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
