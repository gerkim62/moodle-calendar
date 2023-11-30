export type CalendarErrors = {
  CONTENT_TYPE: string;
  FETCH_ERROR: string;
  INVALID_LINK: string;
  PARSE_ERROR: string;
};

export const CALENDAR_ERRORS: CalendarErrors = {
  CONTENT_TYPE: "Calendar link returns invalid content type",
  FETCH_ERROR: "Error fetching calendar events",
  INVALID_LINK: "Invalid calendar link",
  PARSE_ERROR: "Error parsing calendar events",
};
