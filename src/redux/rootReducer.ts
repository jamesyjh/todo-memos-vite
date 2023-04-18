import { combineReducers } from "redux";
import { getPersistConfig } from "redux-deep-persist";
import storage from "redux-persist/lib/storage";

// slices
import appReducer from "./slices/app";
import boardsReducer from "./slices/boards";
import memosReducer from "./slices/memos";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  app: appReducer,
  boards: boardsReducer,
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
