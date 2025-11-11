import { AppError } from "../errors/AppError.js";
import { saveMember, updateMember, deleteMemberById } from "../repositories/membersRepository.js";

function isValidMemberType(type){
  const allowedTypes = ['exec', 'other'];
  if(!allowedTypes.includes(type)){
    throw new AppError('Member type must be "exec" or "other', 400);
  }
}

export async function createMember(firstName, lastName, role, photo, description, funFact, type){
  isValidMemberType(type);
  return await saveMember(firstName, lastName, role, photo, description, funFact, type);
}

export async function editMember(id, firstName, lastName, role, photo, description, funFact, type){
  isValidMemberType(type);
  return await updateMember(id, firstName, lastName, role, photo, description, funFact, type);
}

export async function removeMember(id){
  return await deleteMemberById(id);
}

