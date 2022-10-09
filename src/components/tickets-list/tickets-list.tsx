import uniqid from "uniqid";
import Ticket from "../ticket/ticket";
import "./tickets-list.modules.scss";
import { useAppSelector } from "../../hooks";
import ShowMore from "../show-more/show-more";

// interface TicketType {
//   price: number;
//   carrier: string;
//   segments: [
//     {
//       origin: string;
//       destination: string;
//       date: string;
//       stops: string[];
//       duration: number;
//     },
//     {
//       origin: string;
//       destination: string;
//       date: string;
//       stops: string[];
//       duration: number;
//     },
//   ];
// }

function TicketsList() {
  const tickets = useAppSelector((state) => state.transbordingFilter.tickets);
  const ticket = tickets.map((data) => {
    return <Ticket data={data} key={uniqid()} />;
  });
  return (
    <div>
      <ul className="tickets_list">
        {ticket}
        <ShowMore />
      </ul>
    </div>
  );
}

export default TicketsList;
