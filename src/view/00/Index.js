import React, {Component } from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Modal} from 'antd';
import Slider from 'react-slick';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        }
    }

    componentDidMount() {
        window.socket.on('event', function (data) {

        });
    }

    componentWillUnmount() {
        window.socket.removeAllListeners(['event']);
    }

    handleNext() {
        this.slider.slickNext();
    }
    handlePrevious() {
        this.slider.slickPrev();
    }

    handleOk() {
        this.setState({
            visible: false,
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <div className="index-00-bg">
                <div className="index-00-carousel">
                    <Slider ref={c => this.slider = c } {...{
                        infinite: true,
                        speed: 500,
                        slidesToScroll: 4,
                        slidesToShow: 4,
                        arrows: false
                    }}>
                        <div className="index-00-carousel-item"><img src={require('../../image/index_00_but01.png')} /></div>
                        <div className="index-00-carousel-item"><img src={require('../../image/index_00_but01.png')} /></div>
                        <div className="index-00-carousel-item"><img src={require('../../image/index_00_but01.png')} /></div>
                        <div className="index-00-carousel-item"><img src={require('../../image/index_00_but01.png')} /></div>
                    </Slider>

                </div>
                <div>
                        <span className='index-00-carousel-previous' onClick={this.handlePrevious.bind(this)}>
                            <img src={require('../../image/index_00_pre.png')} />
                        </span>
                        <span className='index-00-carousel-next' onClick={this.handleNext.bind(this)}>
                            <img src={require('../../image/index_00_next.png')} />
                        </span>
                </div>

                <div className="side">
                    <div className="public_signal">
                        <img src={require('../../image/code_img_00.png')} />
                        <p>扫二维码关注公众号</p>
                    </div>
                    <div className="member">
                        <p>登陆成功的党员</p>
                        <ul>
                            <li>
                                <img className="member-image" src={require('../../image/index_00_uimg01.png')} alt="" />
                                <span>微信名字</span>
                            </li>
                            <li>
                                <img className="member-image" src={require('../../image/index_00_uimg01.png')} alt="" />
                                <span>微信名字</span>
                            </li>
                            <li>
                                <img className="member-image" src={require('../../image/index_00_uimg01.png')} alt="" />
                                <span>微信名字</span>
                            </li>
                            <li>
                                <img className="member-image" src={require('../../image/index_00_uimg01.png')} alt="" />
                                <span>微信名字</span>
                            </li>
                            <li>
                                <img className="member-image" src={require('../../image/index_00_uimg01.png')} alt="" />
                                <span>微信名字</span>
                            </li>
                            <li>
                                <img className="member-image" src={require('../../image/index_00_uimg01.png')} alt="" />
                                <span>微信名字</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <Modal
                    title="Basic Modal"
                    width = {1000}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
