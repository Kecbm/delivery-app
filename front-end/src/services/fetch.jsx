import axios from 'axios';

const getAPI = async (url, useToken = false) => {
  if (useToken) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    return axios.get(
      `http://localhost:3001/${url}`,
      { headers: { authorization: token } },
    );
  }
  return axios.get(`http://localhost:3001/${url}`);
};

const postAPI = async (url, body, useToken = false) => {
  if (useToken) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    return axios.post(
      `http://localhost:3001/${url}`,
      { ...body },
      { headers: { authorization: token } },
    );
  }
  return axios.post(`http://localhost:3001/${url}`, { ...body });
};

const putAPI = async (url, body, useToken = false) => {
  if (useToken) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    return axios.put(
      `http://localhost:3001/${url}`,
      { ...body },
      { headers: { authorization: token } },
    );
  }
  return axios.put(`http://localhost:3001/${url}`, { ...body });
};

const deleteAPI = async (url, useToken = false) => {
  if (useToken) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    return axios.delete(
      `http://localhost:3001/${url}`,
      { headers: { authorization: token } },
    );
  }
  return axios.delete(`http://localhost:3001/${url}`);
};

const patchAPI = async (url, body, useToken = false) => {
  if (useToken) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    return axios.patch(
      `http://localhost:3001/${url}`,
      { ...body },
      { headers: { authorization: token } },
    );
  }
  return axios.patch(`http://localhost:3001/${url}`, { ...body });
};

export {
  getAPI,
  postAPI,
  putAPI,
  deleteAPI,
  patchAPI,
};
