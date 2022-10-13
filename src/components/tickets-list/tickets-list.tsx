/* eslint-disable no-plusplus */
import { Alert } from "antd";
import "antd/dist/antd.css";
import { useEffect } from "react";
import uniqid from "uniqid";
import Ticket from "../ticket/ticket";
import "./tickets-list.modules.scss";
import { useAppSelector } from "../../hooks";
// import ShowMore from "../show-more/show-more";
import filter from "../../logic/filter-tickets";
import { TicketType } from "../types";
// import { TicketType } from "../types";

function TicketsList() {
  // const [firstCard, setFirstCard] = useState(0);
  // const [lastCard, setLastCard] = useState(5);
  const ticket = useAppSelector((state) => state.transbordingFilter.tickets);
  let filteredTickets = useAppSelector(
    (state) => state.transbordingFilter.filteredTickets,
  );
  // const showTickets = filteredTickets.slice(firstCard, lastCard);
  // const sliceResults = (): void => {
  //   setFirstCard(firstCard + 5);
  //   setLastCard(lastCard + 5);
  // };

  const status = useAppSelector(
    (state) => state.transbordingFilter.transbordingFilters,
  );
  // const loading = useAppSelector((state) => state.transbordingFilter.status);
  const error = useAppSelector((state) => state.transbordingFilter.error);
  const checkboxState = useAppSelector(
    (state) => state.transbordingFilter.transbordingFilters,
  );
  const stopslength = useAppSelector(
    (state) => state.transbordingFilter.stopslength,
  );

  useEffect(() => {
    filteredTickets = filter(ticket, stopslength, checkboxState);
  }, [checkboxState]);

  const tickets = filteredTickets.map((data: TicketType) => {
    return <Ticket data={data} key={uniqid()} />;
  });

  return (
    <div>
      <ul className="tickets_list">
        {status.indexOf(true) === -1 && !error ? (
          <Alert
            message="Рейсов, подходящих под заданные фильтры, не найдено"
            type="info"
          />
        ) : (
          tickets
        )}
        {error ? (
          <Alert
            // style={{ position: "absolute", top: "-40px" }}
            message="Произошла ошибка сети. Пожалуйста, обновите страницу."
            type="error"
          />
        ) : null}
      </ul>
    </div>
  );
}

export default TicketsList;
