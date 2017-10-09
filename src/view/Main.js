import React, {Component} from 'react';
import {connect} from 'dva';
import io from 'socket.io-client';
import constant from '../util/constant';
import notification from '../util/notification';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        window.socket = io(constant.socket);

        window.socket.on('connect', function () {
            window.socket.emit('login', {
                id: constant.id
            }, function (response) {
                if (response.code === 200) {
                    window.socket.on('receiveMessage', function (data) {
                        console.log(data);
                        notification.emit('event', {});
                    });
                }
            });
        });
    }

    componentWillUnmount() {
        window.socket.removeAllListeners(['sendMessage']);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

Main.propTypes = {};

export default connect(() => ({}))(Main);
