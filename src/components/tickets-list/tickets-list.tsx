/* eslint-disable no-plusplus */
import { Alert } from "antd";
import "antd/dist/antd.css";
import { useEffect } from "react";
import uniqid from "uniqid";
import Ticket from "../ticket/ticket";
import ticketList from "./tickets-list.module.scss";
import { useAppSelector, useAppDispatch } from "../../hooks";
import filter from "../../logic/filter-tickets";
import { TicketType } from "../types";
import { showMore, showInitial } from "../../store/tickets-slice";

function TicketsList() {
  const ticket = useAppSelector((state) => state.transbordingFilter.tickets);
  const visItems = useAppSelector((state) => state.transbordingFilter.visItems);
  const dispatch = useAppDispatch();

  // далее - status & error - для условного рендеринга, checkboxState & stopslength - для useEffect с билетами
  const status = useAppSelector(
    (state) => state.transbordingFilter.transbordingFilters,
  );
  const error = useAppSelector((state) => state.transbordingFilter.error);
  const checkboxState = useAppSelector(
    (state) => state.transbordingFilter.transbordingFilters,
  );
  const stopslength = useAppSelector(
    (state) => state.transbordingFilter.stopslength,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let filteredTickets = useAppSelector(
    (state) => state.transbordingFilter.filteredTickets,
  );

  // вытягиваем отсортированные билеты + делаем вывод на экран первой партии билетов
  useEffect(() => {
    filteredTickets = filter(ticket, stopslength, checkboxState);
    dispatch(showInitial());
  }, [checkboxState]);

  const tickets = visItems.map((data: TicketType) => {
    return <Ticket data={data} key={uniqid()} />;
  });

  return (
    <div>
      <ul className={ticketList["tickets-list"]}>
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
            message="Произошла ошибка сети. Пожалуйста, обновите страницу."
            type="error"
          />
        ) : null}

        {visItems.length !== 0 && (
          <button
            id="show-more"
            type="button"
            className={ticketList["show-more"]}
            onClick={() => dispatch(showMore())}
          >
            <span className={ticketList["show-more-text"]}>
              ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
            </span>
          </button>
        )}
      </ul>
    </div>
  );
}

export default TicketsList;
