import React from 'react';
import ReactDOM from 'react-dom';
import {Appbar, Form, Container, Panel, Input, Button} from 'muicss/react';
import 'babel-polyfill';

import Anime from '../store/Store.js';

import Search from './Search.jsx';
import AnimeView from './AnimeView.jsx';

import '../less/App.less';

import {lcs} from '../util/util.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children : [],
            year : 1970,
            month : 1,
            info : [],
            desc : [],
            current : 0
        };
        Anime.connect(this);
    }
    render() {
        let info = this.state.info[this.state.current];
        if (!info)
            info = [];
        if (this.state.alux.search.pinyin != '')
        {
            info = info.map(item => {
                item.lcs = lcs(item.pinyin, this.state.alux.search.pinyin);
                return item;
            });
            info = info.sort((a, b) => (b.lcs - a.lcs));
        }
        let components = info.map(item => {
            return <AnimeView info={item} key={item.title} />;
        });
        return (
            <Container>
                <Panel>
                    <Search />
                </Panel>
                <Panel className='nav'>
                    {this.state.desc}
                </Panel>
                <Panel>
                    {components}
                </Panel>
                <Panel className='footer'>
                    <a href='http://www.dosk.win/'>SpringHack</a>
                </Panel>
            </Container>
        );
    }
    componentDidMount() {
        fetch('/dilidili')
            .then(res => res.json())
            .then(this.updateChildren.bind(this));
    }
    updateChildren(json) {
        let btns;
        if (json == null)
        {
            btns = <Button>此刻无数据,应该是我春在喝咖啡－。－</Button>;
            json = {
                year : 1970,
                month : 1,
                info : []
            };
        } else {
            btns = json.desc.map((item, index) => {
                return <Button key={index} onClick={() => this.setState({current : index})}>{item}</Button>;
            });
        }
        this.setState({
            year : json.year,
            month : json.month,
            info : json.info,
            desc : btns
        });
    }
}
