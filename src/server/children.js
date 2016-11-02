import {updateInfo} from './dilidili.js'

(async () => {
    let dilidili  = await updateInfo();
    process.send(dilidili);
})();
