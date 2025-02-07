import axios from "axios";

const API_URL = "http://localhost:4002/api"; // Changed from 5000 to 4002

export const createReques = user => axios.post(`${API_URL}/createPasajeros`, user);

export const fetchReservas = () => axios.get(`${API_URL}/getReservas`);

export const createReserva = reserva => axios.post(`${API_URL}/createReservas`, reserva);

export const updateReserva = (id, reserva) => axios.put(`${API_URL}/updateReserva/${id}`, reserva);

export const deleteReserva = id => axios.delete(`${API_URL}/deleteReserva/${id}`);
