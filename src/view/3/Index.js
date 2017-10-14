import React, {Component } from 'react';
import {connect} from 'dva';
import {Modal, Spin} from 'antd';

import http from '../../util/http';
import constant from '../../util/constant';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            is_load: false,
            task: false
        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    handleClick() {
        this.setState({
            visible: true
        }, function() {
            this.handleHandprintTask();
        }.bind(this));
    }

    handleHandprintTask() {
        this.setState({
            is_load: true
        });
        http.request({
            url: '/mobile/minhang/task/handprint/save',
            data: {},
            success: function (data) {
                if (data) {
                    this.setState({
                        task: data
                    });
                }
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: false
                });
            }.bind(this)
        });
    }

    handleOk() {
        this.setState({
            task: {},
            visible: false
        });
    }

    handleCancel() {
        this.setState({
            task: {},
            visible: false
        });
    }

    render() {
        return (
            <div className="index-3-bg" onClick={this.handleClick.bind(this)}>
                <div className="index-3-button"></div>
                <Modal
                    centered modal dialog
                    title='手印'
                    width = {1000}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <Spin spinning={this.state.is_load}>
                        <div className="modal-main">
                            {
                                this.state.task.task_qrcode_url?
                                    <div>
                                        {
                                            Math.random() > 0.5?
                                                <img className="hand-print" src={require('../../image/handprint1.jpg')} alt=""/>
                                                :
                                                <img className="hand-print" src={require('../../image/handprint2.jpg')} alt=""/>

                                        }
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="modal-footer">
                            <img className="task-qrcode" src={this.state.task.task_qrcode_url?constant.host + this.state.task.task_qrcode_url:null} alt=""/>
                        </div>
                    </Spin>
                </Modal>
            </div>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
