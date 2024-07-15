import axios from 'axios';
import { toast } from 'react-toastify';

// Tạo một instance của Axios
const api = axios.create({
    baseURL: 'http://localhost:3000', // Thay đổi URL này thành URL của server của bạn
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 1000, // Thời gian chờ mặc định cho các request (10 giây)
});
// Interceptor để thêm token vào header của mỗi yêu cầu
api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        toast.error('Unauthorized! Please login again.');
        // Có thể điều hướng người dùng đến trang đăng nhập
        window.location.href = '/login';
      } else {
        toast.error(error.response.data.message || 'Something went wrong!');
      }
      return Promise.reject(error);
    }
  );

export default api;