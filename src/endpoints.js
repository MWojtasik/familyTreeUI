import {HttpService} from './HttpService.js';

const apiUrl = process.env.API_URL || '';
console.log('apiUrl',apiUrl);

export const endpoints = {
  getLeaves: () => HttpService.get(`${apiUrl}/api/leaves/`),
  addPerson: (person) => HttpService.post(`${apiUrl}/api/person/`, person),
  removePerson: (personId) => HttpService.delete(`${apiUrl}/api/person/${personId}`),
  connect: (parentId, childId) => HttpService.put(`${apiUrl}/api/person/${parentId}/${childId}`),
  removeConnection: (parentId, childId) => HttpService.delete(`${apiUrl}/api/person/${parentId}/${childId}`),
  updatePerson: (person) => HttpService.put(`${apiUrl}/api/person/`, person),
};
