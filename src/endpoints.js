import {HttpService} from './HttpService.js';

export const endpoints = {
  getLeaves: () => HttpService.get('/api/leaves/'),
  addPerson: (person) => HttpService.post('/api/person/', person),
  removePerson: (personId) => HttpService.delete(`/api/person/${personId}`),
  connect: (parentId, childId) => HttpService.put(`/api/person/${parentId}/${childId}`),
  removeConnection: (parentId, childId) => HttpService.delete(`/api/person/${parentId}/${childId}`),
  updatePerson: (person) => HttpService.put('/api/person/', person),
};
