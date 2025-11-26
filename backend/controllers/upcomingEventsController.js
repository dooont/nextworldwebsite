import { createUpcomingEvent, editUpcomingEvent, removeUpcomingEvent, getAllUpcomingEvents } from "../services/upcomingEventsService.js";

export async function addUpcomingEvent(req, res) {
  const { flyerUrl, title, date, ticketLink } = req.body;
  await createUpcomingEvent(title, date, ticketLink, flyerUrl);
  res.status(200).send();
}

export async function updateUpcomingEvent(req, res) {
  const { id } = req.params;
  const { flyerUrl, title, date, ticketLink } = req.body;

  await editUpcomingEvent(id, title, date, ticketLink, flyerUrl);
  res.status(200).send();
}

export async function deleteUpcomingEvent(req, res) {
  const { id } = req.params;

  await removeUpcomingEvent(id);
  res.status(200).send();
}

export async function getUpcomingEvents(req, res) {
  const upcomingEvents = await getAllUpcomingEvents();
  res.status(200).json(upcomingEvents);
}