import fetch from 'node-fetch';
import pinyin from 'pinyin';
import 'babel-polyfill';

const URL = 'www.dilidili.wang';

//定义变量
let index = new Map([
    [10, '年十月新番'],
    [7, '年七月新番'],
    [4, '年四曰新番'],
    [1, '年一月新番']
]);

//定义函数
let getMonth = month => month<10?`0${month}`:`${month}`;

let getIndex = async () => {
    let html = await fetch(`http://${URL}/`).then(res => res.text()); 
    let info = /"(http:\/\/www.dilidili.wang\/anime\/(\d{6})\/)".*target="_blank">(.*)<\/a>/.exec(html);
    let urls = [];
    let desc = [];
    let year = Number.parseInt(info[2].substring(0, info[2].length - 2));
    let month = Number.parseInt(info[2].substring(info[2].length - 2));
    for (let i=0;i<=3;++i)
    {
        let t_month = month - i*3;
        let t_year = year;
        if (t_month < 0)
        {
            --t_year;
            t_month += 12;
        }
        urls.push(`http://${URL}/anime/${t_year}${getMonth(t_month)}/`);
        desc[i] = t_year.toString() + index.get(t_month);
    }
    return {urls, year, month, desc};
};

let getJson = async url => {
    let html = await fetch(url).then(res => res.text());
    let arr = html.match(/(<dl>[^]+?<\/dl>)/g);
    arr.shift();
    arr.shift();
    arr.shift();
    arr.shift();
    let regexp = /src="(.*)"[^]+?<h3><a href="(\/anime\/.*\/)">(.*)<\/a><\/h3>[^]+?<b>.*<\/b>([^<]*)[^]+?<b>.*<\/b>([^<]*)[^]+?<b>.*<\/b>([^<]*)[^]+?<b>.*<\/b>([^<]*)[^]+?<b>.*<\/b>([^<]*)[^]+?<b>.*<\/b>([^<]*)[^]+?<b[^>]*>.*<\/b>([^<]*)/;
    return arr.map(item => {
        let tmp = regexp.exec(item);
        let pin = pinyin(tmp[3].trim(), {
            heteronym : true,
            segment : true,
            style : pinyin.STYLE_NORMAL
        }).map(arr => arr.join('')).join('').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        tmp[1] = tmp[1].trim();
        if (tmp[1].indexOf('http') == -1)
        {
            if (tmp[1].indexOf('/') == 0)
                tmp[1] = `http://${URL}${tmp[1]}`;
            else
                tmp[1] = `http://${URL}/${tmp[1]}`;
        }
        return {
            img : tmp[1],
            url : `http://${URL}${tmp[2]}`.trim(),
            title : tmp[3].trim(),
            area : tmp[4].trim(),
            time : tmp[5].trim(),
            label : tmp[6].trim(),
            play : tmp[7].trim(),
            what : tmp[8].trim(),
            info : tmp[9].trim(),
            state : tmp[10].trim(),
            pinyin : pin
        };
    }); 
};

let getInfo = async urls => {
    return Promise.all(urls.map(url => getJson(url)));
    /**
    return new Promise((res, rej) => {
        let count = 0;
        let info = [];
        for (let i in urls)
        {
            let ptr = i;
            getJson(urls[ptr]).then(obj => {
                ++count;
                info[ptr] = obj;
                if (count == urls.length)
                    res(info);
            });
        }
    });
    **/
};

let updateInfo = async () => {
    let {urls, year, month, desc} = await getIndex();
    let info = await getInfo(urls);
    return {desc, year, month, info};
}

//导出接口
export {updateInfo};
