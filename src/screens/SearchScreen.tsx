// import React, {useState} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   Dimensions,
//   StatusBar,
//   FlatList,
// } from 'react-native';
// import {COLORS, SPACING} from '../theme/theme';
// import {baseImagePath, searchMovies} from '../api/apicalls';
// import InputHeader from '../components/InputHeader';
// import SubMovieCard from '../components/SubMovieCard';

// const {width, height} = Dimensions.get('screen');

// const SearchScreen = ({navigation}: any) => {
//   const [searchList, setSearchList] = useState([]);

//   const searchMoviesFunction = async (name: string) => {
//     try {
//       let response = await fetch(searchMovies(name));
//       let json = await response.json();
//       setSearchList(json.results);
//     } catch (error) {
//       console.error('Something went wrong in searchMoviesFunction ', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar hidden />

//       <View>
//         <FlatList
//           data={searchList}
//           keyExtractor={(item: any) => item.id}
//           bounces={false}
//           numColumns={2}
//           showsVerticalScrollIndicator={false}
//           ListHeaderComponent={
//             <View style={styles.InputHeaderContainer}>
//               <InputHeader searchFunction={searchMoviesFunction} />
//             </View>
//           }
//           contentContainerStyle={styles.centerContainer}
//           renderItem={({item, index}) => (
//             <SubMovieCard
//               shoudlMarginatedAtEnd={false}
//               shouldMarginatedAround={true}
//               cardFunction={() => {
//                 navigation.push('MovieDetails', {movieid: item.id});
//               }}
//               cardWidth={width / 2 - SPACING.space_12 * 2}
//               title={item.original_title}
//               imagePath={baseImagePath('w342', item.poster_path)}
//             />
//           )}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flex: 1,
//     width,
//     alignItems: 'center',
//     backgroundColor: COLORS.Black,
//   },
//   InputHeaderContainer: {
//     display: 'flex',
//     marginHorizontal: SPACING.space_36,
//     marginTop: SPACING.space_28,
//     marginBottom: SPACING.space_28 - SPACING.space_12,
//   },
//   centerContainer: {
//     alignItems: 'center',
//   },
// });

// export default SearchScreen;

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

} from 'react-native';

import { COLORS, SPACING } from '../theme/theme';
import { searchMovies } from '../api/api';
import InputHeader from '../components/InputHeader';
const { width } = Dimensions.get('screen');
const SearchScreen = ({ navigation }: any) => {

  const [searchList, setSearchList] = useState([]);

  const [searchTerm, setSearchTerm] = useState(''); // Thêm state cho từ khóa tìm kiếm

  const [noResults, setNoResults] = useState(false); // Thêm state để kiểm tra không có kết quả

  const searchMoviesFunction = async (name: string) => {

    if (!name) {
      return; // Nếu không có từ khóa, không làm gì cả
    }
    try {

      const response = await searchMovies(name);
      if (response.data.length === 0) {
        setNoResults(true); // Nếu không có phim, đặt state không có kết quả là true

      } else {

        setNoResults(false); // Reset state nếu có phim
        setSearchList(response.data);
      }

    } catch (error) {
      console.error('Something went wrong in searchMoviesFunction: ', error);
      setNoResults(true); // Nếu có lỗi, cũng đặt state không có kết quả là true
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
        ListEmptyComponent={noResults ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có thông tin phim bạn tìm kiếm.</Text>
          </View>
        ) : null} // Chỉ hiển thị thông báo khi không có kết quả
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