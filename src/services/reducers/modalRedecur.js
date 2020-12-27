//Redux types
import { openModalType } from "../../types/services";

//Redux initial state
const initialState = {
    isOpenModal: false,
    mediaItem: {}
};

export default function (state = initialState, action) {
    switch(action.type) {
        case openModalType: 
            return {
                ...state,
                isOpenModal: action.isOpen,
                component: !!(action && action.isOpen)?action.component:<></>,
                mediaItem: action.payload
            }
        default:
            return state    
    }
};