import { createPastEvent } from "../services/pastEventsService.js";

export async function addPastEvent(req, res){
  const {flyer, title, subtitle, description, artists, place} = req.body;
  
  await createPastEvent(flyer, title, subtitle, description, place, artists);
  res.status(200).send();
}