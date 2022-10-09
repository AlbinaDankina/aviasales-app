import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import generateSearchId from "../../fetch-data";
import { fetchTickets } from "../../store/transbording-slice";
import TicketsList from "../tickets-list/tickets-list";
import Filter from "../filter/filter";
// import ShowMore from "../show-more/show-more";
import "./app.modules.scss";

function App() {
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState("");
  // изначально при первой отрисовке получаем ID для дальнейшей работы
  useEffect(() => {
    generateSearchId(setUserId);
  }, []);

  useEffect(() => {
    dispatch(fetchTickets(userId));
  }, [userId, dispatch]);

  return (
    <div className="app_wrapper">
      <div className="logo" />
      <Filter />
      <TicketsList />
      {/* <ShowMore /> */}
    </div>
  );
}

export default App;
