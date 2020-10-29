import axios from "axios";
import {apiUrl} from "./config.json";

async function get(endpoint) {
  return axios.get(`${apiUrl}${endpoint}`);
}

export default get;
