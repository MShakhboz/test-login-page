import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { baseApi } from "@/api/config/baseApi";
import rootPersistConfig from "@/store/persistConfig";

export const appReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === "auth/logout") {
    // Preserve userPreferences on logout
    Array.from({ length: localStorage.length })
      .map((_, i) => localStorage.key(i))
      .forEach((key) => {
        if (!key?.startsWith("persist:userPreferences:")) {
          localStorage.removeItem(key!);
        }
      });

    state = {};
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
