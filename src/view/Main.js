import React, {Component} from 'react';
import {connect} from 'dva';
import io from 'socket.io-client';
import notification from '../util/notification';

window.socket = io('http://121.40.44.121:2999');

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        window.socket.on('sendMessage', function (data) {
            notification.emit('event', {});
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
