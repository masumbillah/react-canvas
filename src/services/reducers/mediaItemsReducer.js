// Redux types
import { mediaItemsRequest, getMediaItemsSuccess, getMediaItemsFailed } from "../../types/services";

// Redux initial state
const initialState = {
    loading: false,
    mediaItems: [],
    error: ''
};

export default function (state = initialState, action) {
    switch(action.type) {
        case mediaItemsRequest: 
            return {
                ...state,
                loading: true
            }
        case getMediaItemsSuccess: 
            return {
                ...state,
                loading: false,
                mediaItems: action.payload
            }
        case getMediaItemsFailed: 
            return {
                ...state,
                loading: false,
                mediaItems: [],
                error: action.payload
            }
        default:
            return state    
    }
};