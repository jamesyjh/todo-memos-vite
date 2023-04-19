import { combineReducers } from "redux";
import { getPersistConfig } from "redux-deep-persist";
import storage from "redux-persist/lib/storage";

// slices
import appReducer from "./slices/app";
import boardsReducer from "./slices/boards";
import cardsReducer from "./slices/boards/cards";
import listsReducer from "./slices/boards/lists";
import memosReducer from "./slices/memos";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
	app: appReducer,
	boards: boardsReducer,
	lists: listsReducer,
	cards: cardsReducer,
	memos: memosReducer,
});

const rootPersistConfig = getPersistConfig({
	key: "root",
	storage,
	keyPrefix: "redux-",
	// blacklist: [],
	// whitelist: [],
	rootReducer,
});

export { rootPersistConfig, rootReducer };
