import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const addUser = async (user) => {
  const response = await axios.post(apiUrl, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${apiUrl}${id}/`);
};

export const updateUser = async (id, user) => {
  await axios.put(`${apiUrl}${id}/`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUsers = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};
