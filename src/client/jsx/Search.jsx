import React from 'react';
import ReactDOM from 'react-dom';
import {Appbar, Form, Container, Panel, Input, Button} from 'muicss/react';

import Action from '../action/Action.js';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Input ref='pinyin' label="在这里输入拼音检索..." floatingLabel={true} onChange={this.onChange.bind(this)} />
        );
    }
    onChange(e) {
        let pinyin = ReactDOM.findDOMNode(this.refs.pinyin).getElementsByTagName('input')[0].value;
        Action.doSearch(pinyin);
    }
}
