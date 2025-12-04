import { createMember, editMember, removeMember, getMembersByType, getAllMembers } from "../services/membersService.js";

export async function addMember(req, res) {
  const { firstName, lastName, role, photoUrl, description, funFact, type } = req.body;

  await createMember(firstName, lastName, role, photoUrl, description, funFact, type);
  res.status(200).send();
}

export async function updateMember(req, res) {
  const { id } = req.params;
  const { firstName, lastName, role, photoUrl, description, funFact, type } = req.body;

  await editMember(id, firstName, lastName, role, photoUrl, description, funFact, type);
  res.status(200).send();
}

export async function deleteMember(req, res) {
  const { id } = req.params;

  await removeMember(id);
  res.status(200).send();
}

export async function getMembers(req, res) {
  const { type } = req.params;

  const members = await getMembersByType(type);

  res.status(200).json(members);
}

export async function getAllMembersController(req, res) {
  setTimeout(async () => {
    const members = await getAllMembers();
    res.status(200).json(members);
  }, 2000);

}
