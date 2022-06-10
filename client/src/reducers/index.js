import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import claimReducer from "./claimReducer";
import attachmentReducer from "./attachmentReducer";

const rootReducer = combineReducers({
    user: userReducer,
    claim: claimReducer,
    attachment: attachmentReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
