import express from 'express';
import {updateInfo} from './dilidili.js'

let app = express();
let dilidili = null;

let Log = info => {
    console.log(`[${new Date()}] => ${info}`);
};

let updater = async () => {
    Log('采集开始');
    dilidili  = await updateInfo();
    Log('采集结束');
}

updater();
setInterval(updater, 60*60*1000);

app.use(express.static('public'));

app.get('/dilidili', (req, res) => res.end(JSON.stringify(dilidili)));

app.listen(3010);
