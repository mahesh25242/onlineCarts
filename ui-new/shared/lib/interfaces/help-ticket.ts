import { Pagination } from "./pagination";

export interface HelpTicketType {
  id?: number;
  name?: string;
  status?: number;
  help_ticket?: HelpTicket[];
}

export interface HelpTicket {
  id?: number;
  help_ticket_type_id?: number;
  parent?: number;
  subject?: string;
  content?: string;
  attachment?: string;
  status_text?: string;
  help_ticket_type?: HelpTicketType;
  all_children_replies?: HelpTicket[];
}

export interface HelpTicketWithPagination extends Pagination {
  data?: HelpTicket[]
}
