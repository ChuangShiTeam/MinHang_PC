import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Popover} from 'antd';

import http from '../../util/http';
import validate from '../../util/validate';

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='building-popover' dangerouslySetInnerHTML={{__html: this.props.content?validate.unescapeHtml(this.props.content):null}}>
            </div>
        );
    }
}

Item.propTypes = {
    index: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
};

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlay: false,
            title: '',
            content: '',
            company_list: [],
            index: -1
        }
    }

    componentDidMount() {
        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/mobile/minhang/company/list',
            data: {},
            success: function (data) {
                this.setState({
                    company_list: data
                });
            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    }

    handleMouseDown() {
        this.setState({
            isPlay: true
        });
    }

    handleMouseUp() {
        this.setState({
            isPlay: false
        });
    }

    handleCancel(index) {
        this.setState({
            isVisible: false
        });
    }

    handleVisibleChange(index) {
        let title = '';
        let content = '';

        let company = this.state.company_list[index];
        if (company) {
            title = company.company_name;
            content = company.compnay_description;
        }

        let result = this.state.index === index ? -1 : index;
        this.setState({
            title: title,
            content: content,
            index: result
        });
    }

    render() {
        return (
            <div className="index-4-div">
                <div className={'index-4-bg ' + (this.state.isPlay ? 'animation-play' : '')}>
                    <ul>
                        <li>
                            {
                                this.state.company_list.map((company, index) => {
                                    return (
                                        <Popover
                                            key={index}
                                            placement="right"
                                            content={
                                                <Item index={this.state.index} content={this.state.content}></Item>
                                            }
                                            title={this.state.title}
                                            trigger="click"
                                            visible={this.state.index === index}
                                            onVisibleChange={this.handleVisibleChange.bind(this, index)}
                                        >
                                            <div className="building" style={{left: `${company.company_view_width}px`}}></div>
                                        </Popover>
                                    )
                                })

                            }
                            <img src={require('../../image/animation-backgroud.png')} alt=''/>
                        </li>
                        <li>
                            <img src={require('../../image/animation-backgroud.png')} alt=''/>
                        </li>
                    </ul>
                </div>
                <img className="index-4-car" src={require('../../image/animation-car.png')} alt=''
                     onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}/>
            </div>
        );
    }
}


Index.propTypes = {};

export default connect(() => ({}))(Index);
