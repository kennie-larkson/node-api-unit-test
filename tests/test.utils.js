import axios from "axios";
const API_URL = "http://localhost:7777/api/v1";

async function createUser() {
  const payload = {
    name: "Anas",
    email: "anasone@gmail.com",
    age: 1,
  };

  const response = await axios.post(`${API_URL}/users/new`, payload);
  return response.data;
}

async function getUsers() {
  const response = await axios.get(`${API_URL}/users`);
  return response;
}

async function getUser() {
  const response = await axios.get(`${API_URL}/users/anasone@gmail.com`);
  return response;
}

async function updateUser() {
  const payload = {
    name: "Anass",
  };
  const response = await axios.put(
    `${API_URL}/users/anasone@gmail.com`,
    payload
  );
  return response;
}

async function deleteUser() {
  const response = await axios.put(`${API_URL}/users/kennies@gmail.com`);
  return response;
}

export { API_URL, createUser, getUsers, getUser, updateUser, deleteUser };
