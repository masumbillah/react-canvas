import { combineReducers } from "redux";
import mediaItemsReducer from "./mediaItemsReducer";
import canvasItemsReducer from "./canvasItemsReducer";
import modalReducer from "./modalRedecur";

export default combineReducers({
    mediaItemsReducer,
    canvasItemsReducer,
    modalReducer,
});