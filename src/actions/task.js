import * as taskContants from '../constants/task';
import {STATUSES}  from '../constants/index';

export const fetchListTask = (params = {}) => {
  return {
    type: taskContants.FETCH_TASK,
    payload: {params,}
  };
};

export const fetchListTaskSuccess = (data) => {
  return {
    type: taskContants.FETCH_TASK_SUCCESS,
    payload: { data },
  };
};

export const fetchListTaskFail = (error) => {
  return {
    type: taskContants.FETCH_TASK_FAIL,
    payload: { error },
  };
};
export const addListTask = (title, description) => {
  return {
    type: taskContants.ADD_TASK,
    payload: {
      title,
      description,
    },
  };
};

export const addListTaskSuccess = (data) => {
  return {
    type: taskContants.ADD_TASK_SUCCESS,
    payload: { data },
  };
};

export const addListTaskFail = (error) => {
  return {
    type: taskContants.ADD_TASK_FAIL,
    payload: { error },
  };
};


export const updateTask = (title, description, status = STATUSES[0].value) => {
  return {
    type: taskContants.UPDATE_TASK,
    payload: {
      title,
      description,
      status
    },
  };
};

export const updateTaskSuccess = (data) => {
  return {
    type: taskContants.UPDATE_TASK_SUCCESS,
    payload: { data },
  };
};

export const updateTaskFail = (error) => {
  return {
    type: taskContants.UPDATE_TASK_FAIL,
    payload: { error },
  };
};
export const deleteTask = (id) => {
  return {
    type: taskContants.DELETE_TASK,
    payload: {
      id,
    },
  };
};

export const deleteTaskSuccess = (id) => {
  return {
    type: taskContants.DELETE_TASK_SUCCESS,
    payload: { id },
  };
};

export const deleteTaskFail = (error) => {
  return {
    type: taskContants.DELETE_TASK_FAIL,
    payload: { error },
  };
};

export const filterTask = (keyword) => ({
  type: taskContants.FILTER_TASK,
  payload: {
    keyword,
  },
});

export const filterTaskSuccess = (data) => ({
  type: taskContants.FILTER_TASK_SUCCESS,
  payload: {
    data,
  },
});
export const setTaskEditing = (task) => ({
  type: taskContants.SET_TASK_EDITING,
  payload: {
    task,
  },
});
