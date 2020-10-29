import axios from "axios";

import {apiUrl} from "./config.json";

async function post(endpoint, model) {
  return axios.post(`${apiUrl}${endpoint}`, model);
}

async function postCustom(endpoint) {
  return axios.post(`${apiUrl}${endpoint}`);
}

export default post;
export { postCustom };
