import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export const getLeads = () => api.get("/leads").then((res) => res.data);

export const createLead = (payload) => api.post("/leads", payload).then((res) => res.data);

export const updateLead = (id, payload) => api.put(`/leads/${id}`, payload).then((res) => res.data);

export const deleteLead = (id) => api.delete(`/leads/${id}`).then((res) => res.data);

export default api;
