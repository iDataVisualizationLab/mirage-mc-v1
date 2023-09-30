// project imports
import config from '../config/config';

// action - state management
import * as actionTypes from './actions/setting';
import {INCREASE_FONT_SIZE} from "./actions/setting";

const persistKey = 'theme'
const fontSizeKey = `${persistKey}:fontSize`
const initsize = +localStorage.getItem(fontSizeKey);
const persistFontSize = (!initsize||isNaN(initsize))?1:Math.max(0.5,+localStorage.getItem(fontSizeKey));

export const initialState = {
    isOpen: [], // for active default menu
    fontSize:  persistFontSize,
    opened: true,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id]
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case actionTypes.SET_FONT_SIZE:
            localStorage.setItem(fontSizeKey, action.fontSize)
            return {
                ...state,
                fontSize: action.fontSize
            };
        case actionTypes.DECREASE_FONT_SIZE:
            const _newfontSize = Math.max(0.5, (state.fontSize??1)-0.1 );
            localStorage.setItem(fontSizeKey, _newfontSize)
            return {
                ...state,
                fontSize: _newfontSize
            };
        case actionTypes.INCREASE_FONT_SIZE:
            const newfontSize = (state.fontSize??1)+0.1;
            localStorage.setItem(fontSizeKey, newfontSize)
            return {
                ...state,
                fontSize: newfontSize
            };
        case actionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
        default:
            return state;
    }
};

export default customizationReducer;
