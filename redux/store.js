import { configureStore } from "@reduxjs/toolkit";
import storesSlice from "./storesSlice";
const store = configureStore({
  reducer: {
    stores: storesSlice,
  },
});
export default store;
