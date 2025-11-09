import { saveUpcomingEvent } from "../repositories/upcomingEventsRepository.js";

export async function createUpcomingEvent(title, subtitle, url, image){
  await saveUpcomingEvent(title, subtitle, url, image);
}