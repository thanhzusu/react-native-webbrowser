'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    TextInput,
    View,
} from 'react-native';
import Utils from './Utils'
import styles from './styles'

const TEXT_INPUT_REF = 'urlInput';

class AddressBar extends Component {

    constructor(props) {
        super(props);

        this.inputText = '';

        this.state = {
            url: this.props.url
        };

        this._bind(
            'handleTextInputChange',
            'onSubmitEditing'
        );
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            url: nextProps.url
        });
    }

    handleTextInputChange(event) {
        const url = Utils.sanitizeUrl(event.nativeEvent.text);
        this.inputText = url;
    }

    onSubmitEditing(event) {
        this.load();
    }

    load() {
        const url = this.inputText;
        if (url === this.props.url) {
            this.props.onReload();
        } else {
            this.props.onLoad(url)
        }
        // dismiss keyboard
        this.refs[TEXT_INPUT_REF].blur();
    }

    render() {
        return (
            <View style={[styles.addressBarRow]}>
                <TextInput
                    ref={TEXT_INPUT_REF}
                    autoCapitalize="none"
                    defaultValue={this.state.url}
                    onSubmitEditing={this.onSubmitEditing}
                    onChange={this.handleTextInputChange}
                    clearButtonMode="while-editing"
                    style={[styles.addressBarTextInput, this.props.foregroundColor && { color: this.props.foregroundColor }]}
                />
            </View>
        );
    }
}

AddressBar.propTypes = {
    url: PropTypes.string,
    onLoad: PropTypes.func,
    onReload: PropTypes.func,
    foregroundColor: PropTypes.string
};

AddressBar.defaultProps = {
    url: '',
    onLoad: (url) => { },
    onReload: () => { }
};

module.exports = AddressBar;

