import { createSlice } from "@reduxjs/toolkit";

type SortState = {
  sortNames: [string, string];
};
const initialState: SortState = {
  sortNames: ["Самый быстрый", "Самый дешевый"],
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    sortFilter(state: SortState, action) {
      if (action.payload === state.sortNames[0]) {
        console.log("cheapest!");
      }
      if (action.payload === state.sortNames[1]) {
        console.log("fastest!");
      }
      // console.log("default!");
      // switch (action.payload.value) {
      //   case "Самый быстрый":
      //     console.log("cheapest!");
      //     return;
      //   case "Самый дешевый":
      //     console.log("fastest!");
      //     return;
      //   default:
      //     console.log("default!");
      // }
    },
  },
});

export const { sortFilter } = sortSlice.actions;

export default sortSlice.reducer;
