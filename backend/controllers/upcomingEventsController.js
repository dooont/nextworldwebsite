import { createUpcomingEvent, editUpcomingEvent, removeUpcomingEvent, getAllUpcomingEvents } from "../services/upcomingEventsService.js";

export async function addUpcomingEvent(req, res){
  const {image, title, subtitle, url} = req.body;
  await createUpcomingEvent(title, subtitle, url, image);
  res.status(200).send();
}

export async function updateUpcomingEvent(req, res){
  const { id } = req.params;
  const {image, title, subtitle, url} = req.body;
  
  await editUpcomingEvent(id, title, subtitle, url, image);
  res.status(200).send();
}

export async function deleteUpcomingEvent(req, res){
  const { id } = req.params;
  
  await removeUpcomingEvent(id);
  res.status(200).send();
}

export async function getUpcomingEvents(req, res){
  const upcomingEvents = await getAllUpcomingEvents();
  res.status(200).json(upcomingEvents);
}