export type TicketType = {
  price: number;
  carrier: string;
  segments: {
    date: string;
    destination: string;
    duration: number;
    origin: string;
    stops: string[];
  }[];
};

export type FilterState = {
  transbordingFilters: Array<boolean>;
  optionNames: string[];
  allchecked: boolean;
  sortNames: [string, string];
  tickets: TicketType[];
  filteredTickets: TicketType[] | any;
  userId: string | number;
  stopslength: number[];
  stop: boolean;
  status: null | string;
  error: unknown;
};
