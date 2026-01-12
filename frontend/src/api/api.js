import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getVendors = () => api.get('/vendors/');
export const createVendor = (vendorData) => api.post('/vendors/', vendorData);
export const getAnalytics = () => api.get('/analytics/summary');
export const predictRisk = (data) => api.post('/ml/predict', null, { params: data });