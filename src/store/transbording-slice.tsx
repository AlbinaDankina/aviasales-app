/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

type FilterState = {
  transbordingFilters: Array<boolean>;
  optionNames: string[];
};

const initialState: FilterState = {
  transbordingFilters: [false, false, false, false, false],
  optionNames: [
    "Показать все",
    "Без пересадок",
    "1 пересадка",
    "2 пересадки",
    "3 пересадки",
  ],
};

const transbordingSlice = createSlice({
  name: "transbordingQuantity",
  initialState,
  reducers: {
    handleFilter(state: FilterState, action) {
      const { option, checked, i } = action.payload;
      const numberOfChecked = state.transbordingFilters.reduce((prev, cur) => {
        return Number(prev) + Number(cur);
      }, 0);

      if (option === "Показать все" && !checked[i]) {
        state.transbordingFilters = new Array(state.optionNames.length).fill(
          true,
        );
      } else if (option === "Показать все" && checked[i]) {
        state.transbordingFilters = new Array(state.optionNames.length).fill(
          false,
        );
      } else if (
        numberOfChecked === 3 &&
        option !== "Показать все" &&
        !checked[i]
      ) {
        state.transbordingFilters = new Array(state.optionNames.length).fill(
          true,
        );
      } else if (
        numberOfChecked === 5 &&
        option !== "Показать все" &&
        checked[i]
      ) {
        const indexOffFilterAll = state.optionNames.indexOf("Показать все");
        const updatedCheckedState = state.transbordingFilters.map(
          (item, index) => (index === i ? !item : item),
        );
        state.transbordingFilters = updatedCheckedState.map((item, index) =>
          index === indexOffFilterAll ? !item : item,
        );
      } else {
        const updatedCheckedState = state.transbordingFilters.map(
          (item, index) => (index === i ? !item : item),
        );
        state.transbordingFilters = updatedCheckedState;
      }
    },
  },
});

/*
// вот тут в export мы автоматически (!) вытащили actions. 
Соответствующий экшен будет говорить моему главному reducer, 
какое событие произошло. И событие (оно перечислено в reducerS выше - сработает).
Вручную никакие Actions создавать НЕ НУЖНО, достаточно просто вытащить их через деструктуризацию
*/
export const { handleFilter } = transbordingSlice.actions;

export default transbordingSlice.reducer; // тут в ед.числе reducer , формируется из набора reducers. И уже его подключаем в store
