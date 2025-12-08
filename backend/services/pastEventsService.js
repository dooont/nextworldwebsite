import { savePastEventWithArtists, deletePastEventById, findAllPastEvents, editPastEventById } from "../repositories/pastEventsRepository.js";

export async function createPastEvent(flyerUrl, title, date, description, place, artists) {
  return await savePastEventWithArtists(flyerUrl, title, date, description, place, artists);
}

export async function removePastEvent(id) {
  return await deletePastEventById(id);
}

export async function getAllPastEvents() {
  return await findAllPastEvents();
}

export async function editPastEvent(id, flyerUrl, title, date, description, place, artists) {
  return await editPastEventById(id, flyerUrl, title, date, description, place, artists);
}