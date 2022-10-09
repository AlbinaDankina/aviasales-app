/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async function getId(searchId: any) {
    const url = `https://front-test.dev.aviasales.ru/tickets?searchId=${searchId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        "service is unavailable. Please try again reloading your web-page!",
      );
    }
    const data = await response.json();
    return data.tickets.slice(0, 5);
  },
);

// вытягиваем билеты по айди:
// export const fetchTickets = async (searchId: any, func: any) => {
//   try {
//     const url = `https://front-test.dev.aviasales.ru/tickets?searchId=${searchId}`;
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(
//         "service is unavailable. Please try again reloading your web-page!",
//       );
//     }
//     const data = await response.json();
//     console.log(data.tickets);
//     func(data.tickets);
//   } catch (error) {
//     console.error(error);
//   }
// };

type FilterState = {
  transbordingFilters: Array<boolean>;
  optionNames: string[];
  tickets: any[];
  stop: boolean;
  status: null | string;
  error: null | string;
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
  tickets: [],
  stop: false,
  status: null,
  error: null,
};

const transbordingSlice = createSlice({
  name: "tickets",
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
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state: FilterState) => {
      state.status = "loading";
      state.error = null;
      state.stop = false;
    });
    builder.addCase(
      fetchTickets.fulfilled,
      (state: FilterState, action: any) => {
        state.status = "resolved";
        state.tickets = action.payload;
        state.stop = true;
      },
    );
    builder.addCase(fetchTickets.rejected, (state: FilterState) => {
      state.error = "error";
    });
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
