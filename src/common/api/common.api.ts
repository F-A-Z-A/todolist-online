import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "f0b9fe99-d8f6-4e01-8639-245bf86c46b3",
  },
};
export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});
