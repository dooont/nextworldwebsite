import { createUpcomingEvent, editUpcomingEvent } from "../services/upcomingEventsService.js";

export async function addUpcomingEvent(req, res){
  console.log(req.body);
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