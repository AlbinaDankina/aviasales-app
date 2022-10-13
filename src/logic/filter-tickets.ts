import { TicketType } from "../components/types";

function filter(
  array: TicketType[], // массив с исходными билетами
  filters: number[], // stopslength - число пересадок [-1, 0, 1, 2, 3]
  status: boolean[], // transbordingFilters: false / true в завис-ти от состояния чекбокса
): TicketType[] {
  const updatedTickets: any = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < status.length; i++) {
    if (status[i]) {
      const filteredTicketList = array.filter((ticket) => {
        if (
          ticket.segments[0].stops.length === filters[i] &&
          ticket.segments[1].stops.length === filters[i]
        ) {
          return ticket;
        }
        return null;
      });
      updatedTickets.push(...filteredTicketList);
    }
  }
  return updatedTickets as TicketType[];
}

export default filter;
