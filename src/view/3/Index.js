import React, {Component } from 'react';
import {connect} from 'dva';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    handleClick() {

    }

    render() {
        return (
            <div className="index-3-bg">
                <div className="index-3-button"></div>
            </div>
        );
    }
}

Index.propTypes = {};

export default connect(() => ({}))(Index);
