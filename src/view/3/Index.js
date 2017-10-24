import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal, Spin, Progress} from 'antd';

import http from '../../util/http';
import constant from '../../util/constant';
import notification from '../../util/notification';

var isTouch = false;

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            is_load: false,
            is_show_task: false,
            is_show_progress: false,
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
            if (this.state.task && this.state.task.task_id) {
                this.handleReloadUser(this.state.task.task_id);
            }
        });

        document.body.addEventListener('touchstart', this.handleTouch.bind(this), false);
        document.body.addEventListener('touchmove', this.handleTouch.bind(this), false);
    }

    handleTouch(event) {
        if (event.touches.length > 1 && this.state.visible && !isTouch) {
            isTouch = true;
            this.handleShowTask();
        }

    }


    handleReloadUser() {
        http.request({
            url: '/mobile/minhang/task/user/complete/list',
            data: {
                task_id: this.state.task.task_id,
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

    componentWillUnmount() {

    }

    handleClick() {
        this.setState({
            visible: true
        });
    }

    handleOk() {
        isTouch = false;

        this.setState({
            visible: false,
            is_show_task: false
        });
    }

    handleCancel() {
        isTouch = false;

        this.setState({
            visible: false,
            is_show_task: false
        });
    }

    handleShowTask() {
        if (!this.state.is_show_task) {

            this.setState({
                is_show_progress: true,
                handleImageIndex: this.handleGetRandomNum(0, 4)
            });
            this.handleReloadUser();
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
                                this.state.is_show_task ?
                                <img className="hand-print" src={require('../../image/handprint' + this.state.handleImageIndex + '.jpg')} alt=""/>
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
                        {
                            this.state.is_show_task ?
                                <div className="modal-footer">
                                    <img className="task-qrcode"
                                         src={constant.host + this.state.task.task_qrcode_url} alt=""/>
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
                                :
                                <div style={{height: '120px'}}>
                                </div>
                        }
                    </Spin>
                </Modal>
            </div>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
