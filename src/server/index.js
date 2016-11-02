import express from 'express';
import child_process from 'child_process';
import path from 'path';

let app = express();
let dilidili = null;

let Log = info => {
    console.log(`[${new Date()}] => ${info}`);
};

let updater = () => {
    Log('采集开始');
    let chd = child_process.fork(path.join(__dirname, 'children.js'));
    chd.on('message', obj => {
        dilidili = obj
        Log('采集结束');
    });
}

updater();
setInterval(updater, 60*60*1000);

app.use(express.static('public'));

app.get('/dilidili', (req, res) => res.end(JSON.stringify(dilidili)));

app.listen(3010);
