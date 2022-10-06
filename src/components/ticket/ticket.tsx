import "./ticket.modules.scss";

function Ticket() {
  return (
    <>
      <li key="#" className="ticket">
        <div className="ticket_price">price</div>
        <img className="ticket_logo" src="#" alt="logo" />
        <table className="ticket_details">
          <tbody>
            <tr className="ticket_details-title">
              <td>АЭРОПОРТЫ</td>
              <td> В ПУТИ </td>
              <td>ПЕРЕСАДКИ</td>
            </tr>
            <tr className="ticket_details-data">
              <td>00 : 00 - 00 : 00</td>
              <td>2Ч 00 МИН</td>
              <td>АЭРОПОРТЫ</td>
            </tr>
            <tr className="ticket_details-title">
              <td>АЭРОПОРТЫ</td>
              <td> В ПУТИ </td>
              <td>ПЕРЕСАДКИ</td>
            </tr>
            <tr className="ticket_details-data">
              <td>00 : 00 - 00 : 00</td>
              <td>2Ч 00 МИН</td>
              <td>АЭРОПОРТЫ</td>
            </tr>
          </tbody>
        </table>
      </li>
      <li key="#" className="ticket">
        <div className="ticket_price">price</div>
        <img className="ticket_logo" src="#" alt="logo" />
        <table className="ticket_details">
          <tbody>
            <tr className="ticket_details-title">
              <td>АЭРОПОРТЫ</td>
              <td> В ПУТИ </td>
              <td>ПЕРЕСАДКИ</td>
            </tr>
            <tr className="ticket_details-data">
              <td>00 : 00 - 00 : 00</td>
              <td>2Ч 00 МИН</td>
              <td>АЭРОПОРТЫ</td>
            </tr>
            <tr className="ticket_details-title">
              <td>АЭРОПОРТЫ</td>
              <td> В ПУТИ </td>
              <td>ПЕРЕСАДКИ</td>
            </tr>
            <tr className="ticket_details-data">
              <td>00 : 00 - 00 : 00</td>
              <td>2Ч 00 МИН</td>
              <td>АЭРОПОРТЫ</td>
            </tr>
          </tbody>
        </table>
      </li>
    </>
  );
}

export default Ticket;
