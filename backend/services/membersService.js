import { AppError } from "../errors/AppError.js";
import { saveMember, updateMember, deleteMemberById, findMembersByType, findAllMembers } from "../repositories/membersRepository.js";

function isValidMemberType(type) {
  const allowedTypes = ['exec', 'other'];
  if (!allowedTypes.includes(type)) {
    throw new AppError('Member type must be "exec" or "other', 400);
  }
}

export async function createMember(firstName, lastName, role, photoUrl, description, funFact, type) {
  isValidMemberType(type);
  return await saveMember(firstName, lastName, role, photoUrl, description, funFact, type);
}

export async function editMember(id, firstName, lastName, role, photoUrl, description, funFact, type) {
  isValidMemberType(type);
  return await updateMember(id, firstName, lastName, role, photoUrl, description, funFact, type);
}

export async function removeMember(id) {
  return await deleteMemberById(id);
}

export async function getAllMembers() {
  return await findAllMembers();
}

export async function getMembersByType(type) {
  isValidMemberType(type);
  return await findMembersByType(type);
}