import axiosService from '../commons/axiosService';
import { API_ENDPOINT } from '../constants';
import qs from 'query-string';

//http://localhost:3000/tasks
const url = 'tasks';

export const getList = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/${url}/${queryParams}`);
};

export const addTask = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url}`, data);
};

//http://localhost:3000/tasks/:id METHOD: put

export const updateTask = (data, taskId) => {
  console.log(data, taskId);
  return axiosService.put(`${API_ENDPOINT}/${url}/${taskId}`, data);
};

//@ delete task by id http://localhost:3000/tasks/:id METHOD: delete

export const deleteTask = (taskId) => {
  console.log(taskId);
  return axiosService.delete(`${API_ENDPOINT}/${url}/${taskId}`);
};
