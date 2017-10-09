import React, {Component } from 'react';
import {connect} from 'dva';
import {Modal} from 'antd';
import Slider from 'react-slick';
import notification from '../../util/notification';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        notification.on('event', this, function (data) {
            this.setState({
                is_show: true,
                action: 'save'
            });
        });
    }

    componentWillUnmount() {
        notification.remove('event', this);
    }

    handleNext() {
        this.slider.slickNext();
    }
    handlePrevious() {
        this.slider.slickPrev();
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
            <div className="index-0-bg">
                <div className="index-0-carousel">
                    <Slider ref={c => this.slider = c } {...{
                        infinite: true,
                        speed: 500,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        arrows: false
                    }}>
                        <div className="index-0-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_00_but01.png')} alt=""/></div>
                        <div className="index-0-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_00_but01.png')} alt="" /></div>
                        <div className="index-0-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_00_but01.png')}  alt=""/></div>
                        <div className="index-0-carousel-item" onClick={this.handleClick.bind(this)}><img src={require('../../image/index_00_but01.png')}  alt=""/></div>
                    </Slider>

                </div>
                <div>
                        <span className='index-0-carousel-previous' onClick={this.handlePrevious.bind(this)}>
                            <img src={require('../../image/index_00_pre.png')}  alt=""/>
                        </span>
                        <span className='index-0-carousel-next' onClick={this.handleNext.bind(this)}>
                            <img src={require('../../image/index_00_next.png')}  alt=""/>
                        </span>
                </div>

                <div className="side">
                    <div className="public_signal">
                        <img src={require('../../image/code_img_00.png')}  alt=""/>
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
