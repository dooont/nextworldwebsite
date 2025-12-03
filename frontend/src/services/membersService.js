import { api } from '../api/axios.js';

export async function getMembersByType(type) {
  if (type !== "exec" || type !== "other") {
    throw new Error("Type must be exec or other");
  }

  const response = await api.get(`/members/${type}`);
  return response.data;
}

export async function getAllMembers() {
  const response = await api.get('/members');
  return response.data;
}

export async function deleteMemberById(id) {
  return await api.delete(`/members/${id}`);
}

export async function updateMemberById(id, updatedMember) {
  return await api.put(`/members/${id}`, updatedMember);
}