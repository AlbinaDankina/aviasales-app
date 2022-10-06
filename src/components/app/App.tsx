import React from "react";

import TicketsList from "../tickets-list/tickets-list";
import Filter from "../filter/filter";
import ShowMore from "../show-more/show-more";
import "./app.modules.scss";

function App() {
  return (
    <div className="app_wrapper">
      <div className="logo" />
      <Filter />
      <TicketsList />
      <ShowMore />
    </div>
  );
}

export default App;
