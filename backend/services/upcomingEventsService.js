import { saveUpcomingEvent, updateUpcomingEvent, deleteUpcomingEventById, findAllUpcomingEvents } from "../repositories/upcomingEventsRepository.js";

export async function createUpcomingEvent(title, date, ticketLink, flyerUrl) {
  await saveUpcomingEvent(title, date, ticketLink, flyerUrl);
}

export async function editUpcomingEvent(id, title, date, ticketLink, flyerUrl) {
  return await updateUpcomingEvent(id, title, date, ticketLink, flyerUrl);
}

export async function removeUpcomingEvent(id) {
  await deleteUpcomingEventById(id);
}

export async function getAllUpcomingEvents() {
  return await findAllUpcomingEvents();
}