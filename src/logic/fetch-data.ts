// import { TicketType } from "../components/types";

// вытягивание searchId:
const generateSearchId = async (func: any) => {
  const response = await fetch("https://front-test.dev.aviasales.ru/search");
  const data = await response.json();
  const searchId = await data.searchId;
  func(searchId);
  return searchId;
};
export default generateSearchId;
// const tickets: TicketType[] = [];

// const getAllTickets = async () => {
//   const idResponse = await fetch("https://front-test.dev.aviasales.ru/search");
//   const dataResponse = await idResponse.json();
//   const searchId = await dataResponse.searchId;
//   try {
//     const response = await fetch(
//       `https://front-test.dev.aviasales.ru/tickets?searchId=${searchId}`,
//     );
//     if (!response.ok) {
//       throw new Error(
//         "service is unavailable. Please try again reloading your web-page!",
//       );
//     }
//     const data = await response.json();
//     tickets.push(data.tickets);
//     console.log("data.tickets.stop", data.tickets.stop);
//     while (!data.tickets.stop) {
//       getAllTickets();
//       tickets.push(data.tickets);
//     }
//     console.log("data.tickets>", data);
//   } catch (error: any) {
//     console.log("error");
//   }
//   return tickets as TicketType[];
// };

// export default getAllTickets;
