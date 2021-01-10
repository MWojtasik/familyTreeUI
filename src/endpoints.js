import {HttpService} from './HttpService.js';

export const endpoints = {
  getLeaves: () => HttpService.get(`${API_URL}/api/leaves/`),
  addPerson: (person) => HttpService.post(`${API_URL}/api/person/`, person),
  removePerson: (personId) => HttpService.delete(`${API_URL}/api/person/${personId}`),
  connect: (parentId, childId) => HttpService.put(`${API_URL}/api/person/${parentId}/${childId}`),
  removeConnection: (parentId, childId) => HttpService.delete(`${API_URL}/api/person/${parentId}/${childId}`),
  updatePerson: (person) => HttpService.put(`${API_URL}/api/person/`, person),
};
