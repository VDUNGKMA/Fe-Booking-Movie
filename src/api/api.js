// src/services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: 'http://192.168.198.1:5000', // Thay thế bằng URL của BE
  headers: {
    'Content-Type': 'application/json',
  },
});


// Hàm gọi API để lấy danh sách phim đang chiếu

export const fetchNowPlayingMovies = async () => {

  try {

    const response = await api.get(`/api/customer/currentMovies`); // Đảm bảo endpoint đúng

    return response.data; // Trả về dữ liệu

  } catch (error) {

    console.error('Error fetching now playing movies:', error);

    throw error; // Ném lỗi để xử lý ở nơi gọi

  }

};



// Hàm gọi API để lấy danh sách phim sắp chiếu

export const fetchUpcomingMovies = async () => {

  try {

    const response = await api.get(`/api/customer/upComingMovies`); // Đảm bảo endpoint đúng

    return response.data; // Trả về dữ liệu

  } catch (error) {

    console.error('Error fetching upcoming movies:', error);

    throw error; // Ném lỗi để xử lý ở nơi gọi

  }

};



// Gọi API tìm kiếm phim từ BE

export const searchMovies = async (title) => {

  try {

    const response = await api.get(`/api/customer/movie/search`, {

      params: { title }, // Gửi tham số title để tìm kiếm

    });

    return response;

  } catch (error) {

    console.error('Error fetching search results: ', error);

    throw error;

  }

};


// phim
export const fetchMovieDetails = async (id) => {
  try {
    const response = await api.get(`/api/customer/movies/${id}`);
    if (response.data.status === 'success') {
      console.log("check fetchMovies", response.data.data);
      return {
        ...response.data.data,
        trailer_url: response.data.data.trailer_url || null, // Đảm bảo có URL trailer nếu có
      };
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return null; // Trả về null nếu có lỗi
  }
};

// Hàm gọi API để lấy thông tin người dùng
export const fetchUserInfo = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
    console.log('Token in fetchUserInfo:', token); // Thêm dòng này
    if (!token) {
      throw new Error('No token found'); // Xử lý khi không có token
    }

    // Gửi yêu cầu GET đến API với token trong header
    const response = await api.get(`/api/customer/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
      }
    });

    return response.data;
  } catch (error) {
    console.error('Something went wrong in fetchUserInfo:', error);
    throw error; // Đảm bảo ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

// Hàm cập nhật username
export const updateUsername = async (userId, newUsername) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found'); // Xử lý khi không có token
    }
    // Gửi yêu cầu POST đến API để cập nhật username
    const response = await api.post(`/api/customer/changeUsername/${userId}`, {
      newUsername, // Truyền username mới vào body
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
      }
    });

    console.log('Response from server:', response.data); // Log phản hồi từ server

    // Kiểm tra phản hồi từ server
    if (response.data.status === "success") {
      console.log('Username updated successfully:', response.data.data.user);
      return response.data; // Trả về dữ liệu phản hồi từ server
    } else {
      console.error('Failed to update username:', response.data.message);
      return response.data; // Trả về dữ liệu để biết lý do thất bại
    }
  } catch (error) {
    console.error('Error updating username:', error);
    throw error;
  }
};

// Hàm gọi API để thay đổi mật khẩu người dùng
export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found'); // Xử lý khi không có token
    }
    // Truyền userId vào API URL hoặc body nếu BE yêu cầu
    const response = await api.post(`/api/customer/${userId}/change-password`, {
      currentPassword,
      newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
      }
    });
    return response.data;
  } catch (error) {
    console.error('Something went wrong in changePassword:', error);
    throw error; // Đảm bảo ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

export const fetchShowtimesByMovie = async (movieId, date) => {
  try {
    const response = await api.get(`/api/customer/movie/${movieId}/showtimes`, {
      params: {
        date: date,
      },
    });
    console.log("check res ", response)
    return response.data;
  } catch (error) {
    console.error('Error fetching showtimes: ', error);
    throw error;
  }
};
export const fetchSeatsByShowtime = async (showtimeId) => {
  try {
    const response = await api.get(`/api/customer/showtimes/${showtimeId}/seats`);
    // console.log("check response fetchseatbyshowtime", response)
    if (response.data.status === 'success') {
      return response.data.data.seats;
    } else {
      throw new Error('Failed to fetch seats');
    }
  } catch (error) {
    console.error('Error fetching seats:', error);
    throw error;
  }
};
// Tạo ticket
export const createTicket = async (showtimeId, seatIds, paymentMethod, userId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found'); // Xử lý khi không có token
    }
    const response = await api.post(`/api/customer/tickets`, {
      showtimeId,
      seatIds,
      paymentMethod,
      userId,
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
      }
    });
    console.log("check ress", response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Các hàm gọi API
export const createPayment = async (userId, ticketId) => {
  const token = await AsyncStorage.getItem('token') // Lấy token từ AsyncStorage
  if (!token) {
    return Promise.reject(new Error('No token found')); // Xử lý khi không có token
  }
  return await api.post('/api/customer/create-payment', { userId, ticketId }, {
    headers: {
      Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
    }
  });
};

export const executePayment = async (token) => {
  const authToken = await AsyncStorage.getItem('token'); // Lấy token từ localStorage
  console.log("check authToken", authToken)
  if (!authToken) {
    return Promise.reject(new Error('No token found')); // Xử lý khi không có token
  }
  console.log("checkkkee1")
  return api.get(`/api/customer/payment/success?token=${token}`, {
    headers: {
      Authorization: `Bearer ${authToken}` // Đính kèm token vào header Authorization
    }
  });
};
export const cancelPaymentApi = (token) => {
  const authToken = AsyncStorage.getItem('token'); // Lấy token từ localStorage
  if (!authToken) {
    return Promise.reject(new Error('No token found')); // Xử lý khi không có token
  }
  return api.get(`/api/customer/cancel-payment?token=${token}`, {
    headers: {
      Authorization: `Bearer ${authToken}` // Đính kèm token vào header Authorization
    }
  });
};
export const fetchBookingHistoryApi = (userId) => {
  const token = AsyncStorage.getItem('token'); // Lấy token từ localStorage
  if (!token) {
    return Promise.reject(new Error('No token found')); // Xử lý khi không có token
  }
  return api.get(`/api/customer/users/${userId}/booking-history`, {
    headers: {
      Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
    }
  });
};
export default api;
