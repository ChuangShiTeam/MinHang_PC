import React, {Component} from 'react';
import {Pagination} from 'antd';
import {connect} from 'dva';
import {Modal} from 'antd';
import {Player, ControlBar} from 'video-react';

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

    handleChange(page) {

    }

    render() {
        return (
            <div className="index-5-bg">
                <div className="index-5-main">
                    <div className="index-5-title">课堂视频列表</div>
                    <ul className="video-li">
                        <li onClick={this.handleClick.bind(this)}>
                            <img src={require('../../image/index_02_video.png')} alt=""/>
                            <div className="index-5-main-text">党课学习视频二</div>
                        </li>
                        <li onClick={this.handleClick.bind(this)}>
                            <img src={require('../../image/index_02_video.png')} alt=""/>
                            <div className="index-5-main-text">党课学习视频二</div>
                        </li>
                        <li onClick={this.handleClick.bind(this)}>
                            <img src={require('../../image/index_02_video.png')} alt=""/>
                            <div className="index-5-main-text">党课学习视频二</div>
                        </li>
                        <li onClick={this.handleClick.bind(this)}>
                            <img src={require('../../image/index_02_video.png')} alt=""/>
                            <div className="index-5-main-text">党课学习视频二</div>
                        </li>
                        <li onClick={this.handleClick.bind(this)}>
                            <img src={require('../../image/index_02_video.png')} alt=""/>
                            <div className="index-5-main-text">党课学习视频二</div>
                        </li>
                    </ul>
                    <div className="index-5-page">
                        <Pagination  defaultCurrent={2} total={500} onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
                <Modal
                    title="Basic Modal"
                    width={1000}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div className="modal-main">
                        <div>
                            <Player ref="player" playsInline={true}>
                                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                                <ControlBar autoHide={true} disableDefaultControls={true}>
                                </ControlBar>
                            </Player>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
