import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-named-as-default
import ticketsSlice from "./tickets-slice";

const store = configureStore({
  reducer: {
    transbordingFilter: ticketsSlice,
  },
});

export default store;

// эти два элемента нужны для работы с хуками:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
