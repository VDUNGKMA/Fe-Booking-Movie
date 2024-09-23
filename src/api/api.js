// src/services/api.js
import axios from 'axios';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: 'http://192.168.1.119:5000', // Thay thế bằng URL của BE
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm gọi API để lấy danh sách phim đang chiếu
export const fetchNowPlayingMovies = async () => {
  try {
    const response = await api.get(`/api/customer/movies`);
    if (response.data.status === 'success') {
      // console.log("check fetchMovies", response.data.data.movies)
      return response.data.data.movies; // Trả về danh sách phim
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// Hàm gọi API để lấy danh sách phim sắp chiếu
export const fetchUpcomingMovies = async () => {
  try {
    const response = await api.get(`/api/customer/movies`);
    if (response.data.status === 'success') {
      // console.log("check fetchMovies", response.data.data.movies)
      return response.data.data.movies; // Trả về danh sách phim
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// Hàm gọi API để lấy danh sách phim phổ biến
export const fetchPopularMovies = async () => {
  try {
    const response = await api.get(`/api/customer/movies`);
    if (response.data.status === 'success') {
      // console.log("check fetchMovies", response.data.data.movies)
      return response.data.data.movies; // Trả về danh sách phim
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
export const fetchMovieDetails = async (id) => {
  try {
    const response = await api.get(`/api/customer/movies/${id}`);
    if (response.data.status === 'success') {
      console.log("check fetchMovies", response.data.data)
      return response.data.data; // Trả về danh sách phim
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};


// Hàm gọi API để lấy thông tin người dùng
export const fetchUserInfo = async (userId) => {
  try {
    const response = await api.get(`/api/user/${userId}`); // Đổi đường dẫn nếu cần
    return response.data;
  } catch (error) {
    console.error('Something went wrong in fetchUserInfo:', error);
    throw error; // Đảm bảo ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

// Hàm gọi API để thay đổi mật khẩu người dùng
export const changePassword = async (userId, currentPassword, newPassword) => {
  console.log("m", userId);
  try {
    // Truyền userId vào API URL hoặc body nếu BE yêu cầu
    const response = await api.post(`/api/customer/${userId}/change-password`, {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Something went wrong in changePassword:', error);
    throw error; // Đảm bảo ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};
export default api;
