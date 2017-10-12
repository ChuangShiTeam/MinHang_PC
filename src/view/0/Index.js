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
            poster_list: []
        }
    }

    componentDidMount() {
        notification.on('event', this, function (data) {
            this.setState({
                is_show: true,
                action: 'save'
            });
        });
        this.handleLoadPoster();
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
        });
    }

    handleOk() {
        this.setState({
            poster: {},
            visible: false
        });
    }

    handleCancel() {
        this.setState({
            poster: {},
            visible: false
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
                            <img src={require('../../image/code_img_00.png')} alt=""/>
                            <p>扫二维码关注公众号</p>
                        </div>
                        <div className="member">
                            <p>登陆成功的党员</p>
                            <ul>
                                <li>
                                    <img className="member-image" src={require('../../image/index_00_uimg01.png')}
                                         alt=""/>
                                    <span>微信名字</span>
                                </li>
                                <li>
                                    <img className="member-image" src={require('../../image/index_00_uimg01.png')}
                                         alt=""/>
                                    <span>微信名字</span>
                                </li>
                                <li>
                                    <img className="member-image" src={require('../../image/index_00_uimg01.png')}
                                         alt=""/>
                                    <span>微信名字</span>
                                </li>
                                <li>
                                    <img className="member-image" src={require('../../image/index_00_uimg01.png')}
                                         alt=""/>
                                    <span>微信名字</span>
                                </li>
                                <li>
                                    <img className="member-image" src={require('../../image/index_00_uimg01.png')}
                                         alt=""/>
                                    <span>微信名字</span>
                                </li>
                                <li>
                                    <img className="member-image" src={require('../../image/index_00_uimg01.png')}
                                         alt=""/>
                                    <span>微信名字</span>
                                </li>
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
                            <img className="task-qrcode" src="" alt=""/>
                            <div className="task-member">
                                <div className="member-avatar"></div>
                                <div className="member-name">user name</div>
                            </div>
                            <div className="task-member">
                                <div className="member-avatar"></div>
                                <div className="member-name">user name</div>
                            </div>
                            <div className="task-member">
                                <div className="member-avatar"></div>
                                <div className="member-name">user name</div>
                            </div>
                            <div className="task-member">
                                <div className="member-avatar"></div>
                                <div className="member-name">user name</div>
                            </div>
                            <div className="task-member">
                                <div className="member-avatar"></div>
                                <div className="member-name">user name</div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </Spin>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
