import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal, Spin, Progress, Button} from 'antd';

import http from '../../util/http';
import constant from '../../util/constant';
import notification from '../../util/notification';
import storage from '../../util/storage';

var isTouch = false;

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            is_load: false,
            is_scan_qrcode: false,
            is_show_task: false,
            is_show_progress: false,
            is_complete_task: false,
            task: {
                task_id: '001f46fc946647efa4bccaa9735f94e6',
                task_qrcode_url: '/upload/8acc2d49ad014f418878d1a16336c16b/001f46fc946647efa4bccaa9735f94e6.png'
            },
            user_list: [],
            percent: 0,
            handleImageIndex: 0
        }
    }

    componentDidMount() {
        notification.on('loadHandlePrint', this, function (data) {
            if (this.state.task && this.state.task.task_id && this.state.visible) {
                isTouch = false;
                storage.setToken('');
                this.setState({
                    is_scan_qrcode: false,
                    is_show_task: false,
                    is_show_progress: false,
                    is_complete_task: false,
                    user_list: [],
                    percent: 0,
                    handleImageIndex: 0
                });
                this.handleReloadUser(data.content);
            }
        });

        document.body.addEventListener('touchstart', this.handleTouch.bind(this), false);
        document.body.addEventListener('touchmove', this.handleTouch.bind(this), false);
    }

    handleTouch(event) {
        if (event.touches.length > 1 && this.state.visible && this.state.is_scan_qrcode && !isTouch) {
            isTouch = true;
            this.handleShowTask();
        }

    }


    handleReloadUser(token) {
        this.setState({
            is_load: true
        });
        if (token) {
            storage.setToken(token);
            http.request({
                url: '/mobile/minhang/task/user/find',
                data: {},
                success: function (data) {
                    let user_list = [];
                    user_list.push(data);
                    this.setState({
                        user_list: user_list,
                        is_scan_qrcode: true
                    });
                }.bind(this),
                complete: function () {
                    this.setState({
                        is_load: false
                    });
                }.bind(this)
            });
        }
    }

    componentWillUnmount() {

    }

    handleClick() {
        this.setState({
            visible: true
        });
    }

    handleOk() {
        isTouch = false;
        storage.setToken('');

        this.setState({
            visible: false,
            is_scan_qrcode: false,
            is_show_task: false,
            is_show_progress: false,
            is_complete_task: false,
            user_list: [],
            percent: 0,
            handleImageIndex: 0
        });
    }

    handleCancel() {
        isTouch = false;
        storage.setToken('');
        this.setState({
            visible: false,
            is_scan_qrcode: false,
            is_show_task: false,
            is_show_progress: false,
            is_complete_task: false,
            user_list: [],
            percent: 0,
            handleImageIndex: 0
        });
    }

    handleShowTask() {
        if (!this.state.is_show_task) {

            this.setState({
                is_show_progress: true,
                handleImageIndex: this.handleGetRandomNum(0, 4)
            });
            for (let i = 1; i <= 10; i++) {
                setTimeout(function () {
                    this.increase();
                }.bind(this), 200 * i);
            }
            setTimeout(function () {
                this.setState({
                    is_show_task: true,
                    percent: 0,
                    is_show_progress: false
                });
            }.bind(this), 2100);
        }
    }

    increase = () => {
        let percent = this.state.percent + 10;
        if (percent > 100) {
            percent = 100;
        }
        this.setState({percent});
    }

    handleGetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    handleUploadHandPrint() {
        this.setState({
            is_load: true
        });
        let file_id = '';
        if (this.state.handleImageIndex === 0) {
            file_id = '88d51dde1b7e461f9dbd3852a9399d8b';
        } else if (this.state.handleImageIndex === 1) {
            file_id = '72eadb2e4a224e6187a09e71fe6d423f';
        } else if (this.state.handleImageIndex === 2) {
            file_id = '214c5331b9e847c887a5c6af22d7c90a';
        } else if (this.state.handleImageIndex === 3) {
            file_id = '811e74875187456d902acac09f4d9f78';
        } else if (this.state.handleImageIndex === 4) {
            file_id = '00377686aeea42c1be19415fca9182bc';
        }
        http.request({
            url: '/mobile/minhang/task/member/complete',
            data: {
                task_id: this.state.task.task_id,
                member_picture: {
                    picture_file: file_id
                },
                key_activated_step: 2,
                member_task_type: 'HAND_PRINT_PICTURE'
            },
            success: function (data) {
                notification.emit('sendMessage', {
                    targetId: storage.getToken(),
                    action: 'loadKey',
                    content: ''
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: false
                });
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="index-3-bg" onClick={this.handleClick.bind(this)}>
                <Modal
                    centered modal dialog
                    title='按手印'
                    width={1000}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <Spin spinning={this.state.is_load}>
                        <div className="modal-main">
                            {
                                this.state.is_scan_qrcode ?
                                    <div>
                                        {
                                            this.state.is_show_task ?
                                                <div>
                                                    <img className="hand-print" src={require('../../image/handprint' + this.state.handleImageIndex + '.jpg')} alt=""/>
                                                    {
                                                        this.state.is_complete_task ?
                                                            <div className="hand-print-upload">
                                                                上传手印成功
                                                            </div>
                                                            :
                                                            <Button type="danger"
                                                                    icon="uplaod"
                                                                    size="large"
                                                                    onClick={this.handleUploadHandPrint.bind(this)}
                                                                    className="hand-print-upload">
                                                                上传手印
                                                            </Button>
                                                    }
                                                </div>
                                                :
                                                <div>
                                                    {
                                                        this.state.is_show_progress ?
                                                            <div className="modal-progress">
                                                                <Progress percent={this.state.percent}/>
                                                            </div>
                                                            :
                                                            <span className="hand-print-tip">
                                                                请按手印
                                                            </span>
                                                    }
                                                </div>
                                        }
                                    </div>
                                    :
                                    <div>
                                        <span className="hand-print-tip">
                                            扫描二维码
                                            <span className="hand-print-min-tip">
                                            (请打开手机进入党建中心点击信念之钥在按手印处点击扫描)
                                            </span>
                                        </span>
                                    </div>
                            }
                        </div>
                        <div className="modal-footer">
                            <img className="task-qrcode"
                                 src={'http://api.chuangshi.nowui.com' + this.state.task.task_qrcode_url} alt=""/>
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
