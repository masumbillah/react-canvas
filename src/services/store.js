//Packages
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//All redux reducers
import rootReducer from "./reducers";

const initialState = {};
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
)
export default store;