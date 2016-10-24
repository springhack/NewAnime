import Alux from 'alux';

import Event from '../event/Event.js';
import Store from '../store/Store.js';

export default Alux.combineActions({
    doSearch(pinyin) {
        return {
            type : Event.DO_SEARCH,
            pinyin : pinyin
        };
    }
}, Store);
