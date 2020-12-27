// Packages
import { combineReducers } from "redux";

// Redux reducer
import mediaItemsReducer from "./mediaItemsReducer";
import canvasItemsReducer from "./canvasItemsReducer";
import modalReducer from "./modalRedecur";

export default combineReducers({
    mediaItemsReducer,
    canvasItemsReducer,
    modalReducer,
});