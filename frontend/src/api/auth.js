import axios from "axios";


const API_URL = "http://localhost:5000/api";

export const createReques  = user => axios.post(`${API_URL}/createPasajeros`, user);
 