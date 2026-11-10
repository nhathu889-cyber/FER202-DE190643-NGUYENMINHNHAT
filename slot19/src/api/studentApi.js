import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:9999',
  timeout: 10000,
});

export const studentApi = {
  getAll: () => http.get('/students').then((response) => response.data),
  create: (data) => http.post('/students', data).then((response) => response.data),
  update: (id, data) =>
    http.put(`/students/${id}`, data).then((response) => response.data),
  remove: (id) => http.delete(`/students/${id}`).then(() => id),
};
