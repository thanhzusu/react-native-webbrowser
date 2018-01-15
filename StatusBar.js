'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    TextInput,
    View,
} from 'react-native';
import styles from './styles'

class StatusBar extends Component {

    constructor(props) {
        super(props);

        this.inputText = '';
        this.state = {
            status: this.props.status
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            status: nextProps.status
        });
    }

    render() {
        return (
            <View style={styles.statusBar}>
                <TextInput
                    value={this.state.status}
                    style={[styles.statusBarText, this.props.foregroundColor && { color: this.props.foregroundColor }]}
                    editable={false}
                    numberOfLines={1}
                />

            </View>
        );
    }
}

StatusBar.propTypes = {
    status: PropTypes.string,
    foregroundColor: PropTypes.string
};

StatusBar.defaultProps = {
    status: '',
};

module.exports = StatusBar;

