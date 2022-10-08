import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-named-as-default
import transbordingSlice from "./transbording-slice";
import sortSlice from "./sort-slice";

// configureStore возвращает хранилище, в котором есть объект редьюсер, выполняющий перечисленные в нем операции
const store = configureStore({
  /*
  редьюсер с ключом transbordingFilter будет выполнять логиуку из импортированного файла с именем transbordingslice
  */
  reducer: {
    transbordingFilter: transbordingSlice,
    sortFilter: sortSlice,
  },
});

export default store;

// эти два элемента нужны для работы с хуками:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
