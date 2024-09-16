// src/services/api.js
import axios from 'axios';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Thay thế bằng URL của BE
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
