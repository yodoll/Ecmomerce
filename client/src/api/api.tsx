import axios from 'axios';

// Tạo một instance của Axios
const api = axios.create({
    baseURL: 'http://localhost:3000', // Thay đổi URL này thành URL của server của bạn
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Thời gian chờ mặc định cho các request (10 giây)
});

export default api;