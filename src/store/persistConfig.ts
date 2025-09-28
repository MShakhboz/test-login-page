import storage from "redux-persist/lib/storage";

// root persist reducers
const rootPersistConfig = {
  key: "store",
  storage,
  whitelist: ["auth"],
};

export default rootPersistConfig;
