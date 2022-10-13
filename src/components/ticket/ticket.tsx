/* eslint-disable no-param-reassign */
import ticketCss from "./ticket.module.scss";

function Ticket({ data }: any) {
  const durationH = Math.trunc(data.segments[0].duration / 60);
  const durationMin =
    data.segments[0].duration - Math.trunc(data.segments[0].duration / 60) * 60;
  const durationHReturn = Math.trunc(data.segments[1].duration / 60);
  const durationMinReturn =
    data.segments[1].duration - Math.trunc(data.segments[1].duration / 60) * 60;
  const time1 = new Date(data.segments[0].date).getHours();
  const time2 = new Date(data.segments[0].date).getMinutes();
  const destinationH = (h1: number, time: number) => {
    if (time >= 24) {
      const returnTime = h1 + (time - 24);
      if (returnTime >= 24) return returnTime - 24;
      return returnTime;
    }
    const returnTime = h1 + time;
    if (returnTime >= 24) return returnTime - 24;
    return returnTime;
  };
  const time3 = destinationH(time1, Math.trunc(data.segments[0].duration / 60));
  const time4 =
    time2 +
    (data.segments[0].duration -
      60 * Math.trunc(data.segments[0].duration / 60));
  const time5 = new Date(data.segments[1].date).getHours();
  const time6 = new Date(data.segments[1].date).getMinutes();
  const time7 = destinationH(time5, Math.trunc(data.segments[1].duration / 60));
  const time8 =
    time6 +
    (data.segments[1].duration -
      60 * Math.trunc(data.segments[1].duration / 60));
  const recalculateTime = (h: number, min: number) => {
    if (min >= 60) {
      min -= 60;
      h += 1;
      if (h >= 24) {
        h -= 24;
      }
    }
    if (h === 0 && min < 10) return `00:0${min}`;
    if (h === 0 && min >= 10) return `00:${min}`;
    if (h < 10 && min < 10) return `0${h}:0${min}`;
    if (h >= 10 && min < 10) return `${h}:0${min}`;
    if (h < 10 && min >= 10) return `0${h}:${min}`;
    return `${h}:${min}`;
  };
  const timeTo = recalculateTime(time3, time4);
  const timeBack = recalculateTime(time7, time8);
  const transbordings = (qty: number) => {
    if (qty === 0) return `НЕТ ПЕРЕСАДОК`;
    if (qty === 1) return `${qty} ПЕРЕСАДКА`;
    if (qty >= 2) return `${qty} ПЕРЕСАДКИ`;
    return null;
  };
  const transbordingsTo = transbordings(data.segments[0].stops.length);
  const transbordingsBack = transbordings(data.segments[1].stops.length);

  return (
    <li key="#" className={ticketCss.ticket}>
      <div className={ticketCss["ticket-price"]}>{data.price} Р</div>
      <img
        className={ticketCss["ticket-logo"]}
        src={`//pics.avs.io/99/36/${data.carrier}.png`}
        alt="logo"
      />
      <table className={ticketCss["ticket-details"]}>
        <tbody>
          <tr className={ticketCss["ticket-details-title"]}>
            <td>
              {data.segments[0].origin} - {data.segments[0].destination}
            </td>
            <td>В ПУТИ</td>
            <td>{transbordingsTo}</td>
          </tr>
          <tr className={ticketCss["ticket-details-data"]}>
            <td>
              {time1 > 9 ? time1 : `0${time1}`}:
              {time2 > 9 ? time2 : `0${time2}`} - {timeTo}
            </td>
            <td>
              {durationH > 9 ? durationH : `0${durationH}`} ч{" "}
              {durationMin > 9 ? durationMin : `0${durationMin}`} мин
            </td>
            <td>{data.segments[0].stops.join(" - ")}</td>
          </tr>
          <tr className={ticketCss["ticket-details-title"]}>
            <td>
              {data.segments[1].origin} - {data.segments[1].destination}
            </td>
            <td> В ПУТИ </td>
            <td>{transbordingsBack}</td>
          </tr>
          <tr className={ticketCss["ticket-details-data"]}>
            <td>
              {time5 > 9 ? time5 : `0${time5}`}:
              {time6 > 9 ? time6 : `0${time6}`} - {timeBack}
            </td>
            <td>
              {durationHReturn > 9 ? durationHReturn : `0${durationHReturn}`} ч{" "}
              {durationMinReturn > 9
                ? durationMinReturn
                : `0${durationMinReturn}`}{" "}
              мин
            </td>
            <td>{data.segments[1].stops.join(" - ")}</td>
          </tr>
        </tbody>
      </table>
    </li>
  );
}

export default Ticket;
