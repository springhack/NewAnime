import React from 'react';
import ReactDOM from 'react-dom';
import {Appbar, Form, Container, Panel, Input, Button} from 'muicss/react';
import 'babel-polyfill';

import '../less/AnimeView.less';

export default class AnimeView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Panel className='AnimeView' onClick={this.onClick.bind(this)}>
                <img src={this.props.info.img} />
                <div className='info'>
                    <legend>{this.props.info.title}</legend><br /> 
                    <label>地区: </label>{this.props.info.area}<br />
                    <label>年代: </label>{this.props.info.time}<br />
                    <label>标签: </label>{this.props.info.label}<br />
                    <label>播放: </label>{this.props.info.play}<br />
                    <label>看点: </label>{this.props.info.what}<br />
                    <label>简介: </label>{this.props.info.info}<br />
                    <label className='red'>状态: </label>{this.props.info.state}
                </div>
            </Panel>
        );
    }
    onClick(e) {
        location.href = this.props.info.url;
    }
}
