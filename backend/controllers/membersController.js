import { createMember, editMember } from "../services/membersService.js";

export async function addMember(req, res){
  const {firstName, lastName, role, photo, description, funFact, type} = req.body;
  
  await createMember(firstName, lastName, role, photo, description, funFact, type);
  res.status(200).send();
}

export async function updateMember(req, res){
  const { id } = req.params;
  const {firstName, lastName, role, photo, description, funFact, type} = req.body;
  
  await editMember(id, firstName, lastName, role, photo, description, funFact, type);
  res.status(200).send();
}

