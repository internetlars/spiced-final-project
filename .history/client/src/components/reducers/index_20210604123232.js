import { combineReducers } from "redux";
import courts from "./courts";

export const rootReducer = combineReducers({
    courts: courts,
});
