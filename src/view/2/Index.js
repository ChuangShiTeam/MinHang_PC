import React, {Component } from 'react';
import {connect} from 'dva';
import {Modal} from 'antd';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    handleClick() {
        this.setState({
            visible: true
        });
    }

    handleOk() {
        this.setState({
            visible: false
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <div className="index-2-bg">
                <div className="con_but">
                    <buttom className="con_but_01" onClick={this.handleClick.bind(this)}>
                        <img src={require('../../image/index_01_but01.png')} alt=""/>
                    </buttom>
                    <buttom className="con_but_02" onClick={this.handleClick.bind(this)}>
                        <img src={require('../../image/index_01_but02.png')} alt=""/>
                    </buttom>
                </div>
                <Modal
                    title="Basic Modal"
                    width = {800}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div className="modal-main">
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </div>
                </Modal>
            </div>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
