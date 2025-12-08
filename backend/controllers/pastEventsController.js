import { createPastEvent, removePastEvent, getAllPastEvents, editPastEvent as updatePastEvent } from "../services/pastEventsService.js";

export async function addPastEvent(req, res) {
  const { flyerUrl, title, date, description, artists, place } = req.body;

  await createPastEvent(flyerUrl, title, date, description, place, artists);
  res.status(200).send();
}

export async function deletePastEvent(req, res) {
  const { id } = req.params;

  await removePastEvent(id);
  res.status(200).send();
}

export async function getPastEvents(req, res) {
  const pastEvents = await getAllPastEvents();
  res.status(200).json(pastEvents);
}

export async function editPastEvent(req, res) {
  const { id } = req.params;
  const { flyerUrl, title, date, description, place, artists } = req.body;

  await updatePastEvent(id, flyerUrl, title, date, description, place, artists);
  res.status(200).send();
}