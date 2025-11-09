import { saveUpcomingEvent, updateUpcomingEvent } from "../repositories/upcomingEventsRepository.js";

export async function createUpcomingEvent(title, subtitle, url, image){
  await saveUpcomingEvent(title, subtitle, url, image);
}

export async function editUpcomingEvent(id, title, subtitle, url, image){
  return await updateUpcomingEvent(id, title, subtitle, url, image);
}