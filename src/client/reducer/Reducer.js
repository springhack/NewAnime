import Alux from 'alux';

import Event from '../event/Event.js';

export default Alux.combineReducers({
    search(action, state = {pinyin : ''}) {
        switch (action.type)
        {
            case Event.DO_SEARCH:
                return {
                    pinyin : action.pinyin
                }
            break;
            default:
                return state;
            break;
        }
    }
});
