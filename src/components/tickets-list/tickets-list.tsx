import Ticket from "../ticket/ticket";
import "./tickets-list.modules.scss";

// const tickets = [1, 2, 3, 4, 5];
function TicketsList() {
  // const ticket = tickets.map((tick) => <Ticket />);
  return (
    <div>
      <ul className="tickets_list">
        <Ticket />
      </ul>
    </div>
  );
}

export default TicketsList;
