import React, {Component} from 'react';
import {connect} from 'dva';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

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
