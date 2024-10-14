
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator, // Thêm ActivityIndicator để hiển thị loading
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { searchMovies } from '../api/api';
import InputHeader from '../components/InputHeader';

const { width } = Dimensions.get('screen');

const SearchScreen = ({ navigation }: any) => {
  const [searchList, setSearchList] = useState([]); // Danh sách phim
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
  const [noResults, setNoResults] = useState(false); // Kiểm tra không có kết quả
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const searchMoviesFunction = async (name: string) => {
    if (!name) {
      return; // Nếu không có từ khóa, không tìm kiếm
    }

    setLoading(true); // Bắt đầu loading
    setSearchList([]); // Reset danh sách phim trước khi tìm kiếm
    setNoResults(false); // Reset trạng thái không có kết quả

    try {
      const response = await searchMovies(name);
      if (response.data.length === 0) {
        setNoResults(true); // Không tìm thấy phim, đặt trạng thái không có kết quả
      } else {
        setSearchList(response.data); // Cập nhật danh sách phim
      }
    } catch (error) {
      console.error('Something went wrong in searchMoviesFunction: ', error);
      setNoResults(true); // Xử lý lỗi, không có kết quả
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <FlatList
        data={searchList}
        keyExtractor={(item: any) => item.id.toString()}
        bounces={false}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.inputHeaderContainer}>
            <InputHeader
              searchFunction={searchMoviesFunction}
              setSearchTerm={setSearchTerm} // Cập nhật từ khóa tìm kiếm
            />
          </View>
        }
        contentContainerStyle={styles.centerContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.push('MovieDetails', { movieId: item.id })}
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <Image source={{ uri: item.poster_url }} style={styles.image} />
              <View style={styles.movieInfo}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.genre}>{item.genre}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingStar}>⭐</Text>
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={loading ? (
          <ActivityIndicator size="large" color={COLORS.White} /> // Hiển thị biểu tượng loading khi đang tải
        ) : noResults ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có thông tin phim bạn tìm kiếm.</Text>
          </View>
        ) : null} // Hiển thị thông báo khi không có kết quả
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_16,
  },
  centerContainer: {
    alignItems: 'center',
  },
  card: {
    margin: SPACING.space_12,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    overflow: 'hidden',
    width: width - SPACING.space_24,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_8,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: SPACING.space_12,
  },
  movieInfo: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  genre: {
    color: '#b0b0b0',
    fontSize: 14,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingStar: {
    color: '#FFD700',
    marginRight: 4,
  },
  rating: {
    color: '#fff',
    marginRight: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default SearchScreen;