import { combineReducers } from "redux";
const appReducers = combineReducers({});

export const reducers = (state: any, action: any) => {
	if (action.type === "RESET") state = undefined;
	return appReducers(state, action);
};
