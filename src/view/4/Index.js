import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal} from 'antd';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlay: false,
            isVisible: false,
            left: 0,
            title: '',
            content: ''
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleClick(event) {
        this.setState({
            isVisible: true,
            left: 0,
            title: '',
            content: ''
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

    render() {
        return (
            <div className="index-4-div">
                <Modal
                    title={this.state.title}
                    style={{top: 130, left: this.state.left}}
                    visible={this.state.isVisible}
                    maskClosable={true}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <p>上海电气电站集团公司</p>
                </Modal>
                <div className={'index-4-sky ' + (this.state.isPlay ? 'animation-play' : '')}>
                    <ul>
                        <li>
                            <img src={require('../../image/animation-sky.png')} alt=''/>
                        </li>
                        <li>
                            <img src={require('../../image/animation-sky.png')} alt=''/>
                        </li>
                    </ul>
                </div>
                <div className={'index-4-bg ' + (this.state.isPlay ? 'animation-play' : '')}>
                    <ul>
                        <li>
                            <div className="building-0" onClick={this.handleClick.bind(this)}></div>
                            <div className="building-1" onClick={this.handleClick.bind(this)}></div>
                            <div className="building-2" onClick={this.handleClick.bind(this)}></div>
                            <div className="building-3" onClick={this.handleClick.bind(this)}></div>
                            <div className="building-4" onClick={this.handleClick.bind(this)}></div>
                            <div className="building-5" onClick={this.handleClick.bind(this)}></div>
                            <div className="building-6" onClick={this.handleClick.bind(this)}></div>
                            <div className="building-7" onClick={this.handleClick.bind(this)}></div>
                            <div className="building-8" onClick={this.handleClick.bind(this)}></div>
                            <div className="building-9" onClick={this.handleClick.bind(this)}></div>
                            <img src={require('../../image/animation-backgroud.png')} alt=''/>
                        </li>
                        <li>
                            <div className="building-0" onClick={this.handleClick.bind(this)}></div>
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
