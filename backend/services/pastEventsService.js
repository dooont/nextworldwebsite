import { savePastEventWithArtists, deletePastEventById } from "../repositories/pastEventsRepository.js";

export async function createPastEvent(flyer, title, subtitle, description, place, artists){
  return await savePastEventWithArtists(flyer, title, subtitle, description, place, artists);
}

export async function removePastEvent(id){
  return await deletePastEventById(id);
}
