import { saveUpcomingEvent, updateUpcomingEvent, deleteUpcomingEventById, findAllUpcomingEvents } from "../repositories/upcomingEventsRepository.js";

export async function createUpcomingEvent(title, subtitle, url, image){
  await saveUpcomingEvent(title, subtitle, url, image);
}

export async function editUpcomingEvent(id, title, subtitle, url, image){
  return await updateUpcomingEvent(id, title, subtitle, url, image);
}

export async function removeUpcomingEvent(id){
  await deleteUpcomingEventById(id);
}

export async function getAllUpcomingEvents(){
  return await findAllUpcomingEvents();
}