import { AppError } from "../errors/AppError.js";
import { saveMember } from "../repositories/membersRepository.js";

export async function createMember(firstName, lastName, role, photo, description, funFact, type){
  const allowedTypes = ['exec', 'other'];
  if(!allowedTypes.includes(type)){
    throw new AppError('Role must be "exec" or "other"', 400);
  }
  return await saveMember(firstName, lastName, role, photo, description, funFact, type);
}

