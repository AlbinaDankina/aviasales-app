/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TicketType, FilterState } from "../components/types";
import filter from "../logic/filter-tickets";

// fetchTickets = экшен, который передаем в диспатч в Арр
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async function getTickets(_, { rejectWithValue }) {
    try {
      const res = await fetch("https://front-test.dev.aviasales.ru/search");
      const dataId = await res.json();
      const searchId = await dataId.searchId;
      const response = await fetch(
        `https://front-test.dev.aviasales.ru/tickets?searchId=${searchId}`,
      );
      if (!response.ok) {
        throw new Error(
          "service is unavailable. Please try again reloading your web-page!",
        );
      }
      const data = await response.json();
      return data.tickets as TicketType[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
const initialState: FilterState = {
  transbordingFilters: [false, false, false, false, false],
  optionNames: [
    "Показать все",
    "Без пересадок",
    "1 пересадка",
    "2 пересадки",
    "3 пересадки",
  ],
  allchecked: false,
  sortNames: ["Самый быстрый", "Самый дешевый"],
  tickets: [],
  filteredTickets: [],
  visItems: [],
  firstCard: 5,
  lastCard: 10,
  userId: "",
  stopslength: [-1, 0, 1, 2, 3],
  stop: false,
  status: null,
  error: null,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    handleFilter(
      state: FilterState,
      action: PayloadAction<{ option: string; checked: boolean[]; i: number }>,
    ) {
      // для отчекания all, когда клац не по нему
      const numChecked = state.transbordingFilters.reduce((prev, cur) => {
        return Number(prev) + Number(cur);
      }, 0);
      // клац по all
      if (action.payload.option === state.optionNames[0]) {
        const changedState = Object.keys(state.transbordingFilters).reduce(
          (acc: boolean[], curr: string | number) => {
            acc[+curr] = !state.allchecked;
            return acc;
          },
          [],
        );
        state.transbordingFilters = changedState;
        state.allchecked = !state.allchecked;
      } else if (
        action.payload.option !== state.optionNames[0] &&
        numChecked === 5
      ) {
        // клац по не-all, когда были все true
        state.transbordingFilters[action.payload.i] =
          !state.transbordingFilters[action.payload.i];
        state.transbordingFilters[0] = !state.allchecked;
      } else if (
        action.payload.option !== state.optionNames[0] &&
        numChecked === 3
      ) {
        // клац по не-all, когда были три true
        state.transbordingFilters[action.payload.i] =
          !state.transbordingFilters[action.payload.i];
        state.transbordingFilters[0] = !state.allchecked;
        state.allchecked = !state.allchecked;
      } else {
        // клац по не-all
        state.transbordingFilters[action.payload.i] =
          !state.transbordingFilters[action.payload.i];
      }
      // тут вызов фильтрации билетов с трушным чекбоксом
      state.filteredTickets = filter(
        state.tickets,
        state.stopslength,
        state.transbordingFilters,
      );
    },
    showMore(state: FilterState) {
      state.visItems = [
        ...state.visItems,
        ...state.filteredTickets.slice(state.firstCard, state.lastCard),
      ];
      state.firstCard += 5;
      state.lastCard += 5;
    },
    showInitial(state: FilterState) {
      state.visItems = state.filteredTickets.slice(0, 5);
    },
    sortFilter(state: FilterState, action: PayloadAction<string>) {
      if (action.payload === state.sortNames[0]) {
        state.visItems.sort(
          (prev: TicketType, cur: TicketType) =>
            prev.segments[0].duration - cur.segments[0].duration,
        );
      }
      if (action.payload === state.sortNames[1]) {
        state.visItems.sort(
          (prev: TicketType, cur: TicketType) => prev.price - cur.price,
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.status = "loading";
      state.error = null;
      state.stop = false;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.status = "resolved";
      state.tickets = action.payload;
      state.stop = true;
      state.error = null;
    });
    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      state.stop = false;
      console.log(state.error);
    });
  },
});

/*
// вот тут в export мы автоматически (!) вытащили actions. 
Соответствующий экшен будет говорить главному reducer, 
какое событие произошло. И событие (оно перечислено в reducerS выше - сработает).
Вручную никакие Actions создавать НЕ НУЖНО, достаточно просто вытащить их через деструктуризацию
*/
export const { handleFilter, sortFilter, showMore, showInitial } =
  ticketsSlice.actions;

export default ticketsSlice.reducer; // тут в ед.числе reducer , формируется из набора reducers. И уже его подключаем в store
