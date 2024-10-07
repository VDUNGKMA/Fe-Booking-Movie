// //HomeScreen.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   ScrollView,
//   StatusBar,
//   FlatList,
// } from 'react-native';
// import { COLORS, SPACING } from '../theme/theme';
// import {
//   fetchNowPlayingMovies,
//   fetchUpcomingMovies,
//   fetchPopularMovies,
// } from '../api/api';

// import InputHeader from '../components/InputHeader';
// import CategoryHeader from '../components/CategoryHeader';
// import SubMovieCard from '../components/SubMovieCard';
// import MovieCard from '../components/MovieCard';

// const { width } = Dimensions.get('window');

// const HomeScreen = ({ navigation }: any) => {
//   const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>([]);
//   const [popularMoviesList, setPopularMoviesList] = useState<any>([]);
//   const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const nowPlaying = await fetchNowPlayingMovies();
//         const popular = await fetchPopularMovies();
//         const upcoming = await fetchUpcomingMovies();

//         // console.log("data", nowPlaying);

//         setNowPlayingMoviesList(nowPlaying || []);
//         setPopularMoviesList(popular || []);
//         setUpcomingMoviesList(upcoming || []);
//       } catch (error) {
//         console.error('Error fetching movies: ', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   const searchMoviesFunction = () => {
//     navigation.navigate('Search');
//   };

//   if (loading) {
//     return (
//       <ScrollView style={styles.container} bounces={false}>
//         <StatusBar hidden />
//         <View style={styles.InputHeaderContainer}>
//           <InputHeader searchFunction={searchMoviesFunction} />
//         </View>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size={'large'} color={COLORS.Orange} />
//         </View>
//       </ScrollView>
//     );
//   }

//   return (
//     <ScrollView style={styles.container} bounces={false}>
//       <StatusBar hidden />
//       <View style={styles.InputHeaderContainer}>
//         <InputHeader searchFunction={searchMoviesFunction} />
//       </View>

//       <CategoryHeader title={'Now Playing'} />
//       <FlatList
//         data={nowPlayingMoviesList}
//         keyExtractor={(item: any) => item.id.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.containerGap36}
//         renderItem={({ item, index }) => (
//           <MovieCard
//             shoudlMarginatedAtEnd={true}
//             cardFunction={() => navigation.push('MovieDetails', { movieId: item.id })}
//             cardWidth={width * 0.7}
//             isFirst={index === 0}
//             isLast={index === nowPlayingMoviesList.length - 1}
//             title={item.title}
//             imagePath={item.poster_url}
//             // imagePath={baseImagePath('w780', item.poster_url)}
//             genres={item.genres}
//             // vote_average={item.vote_average}
//             // vote_count={item.vote_count}
//           />
//         )}
//       />

//       {/* <CategoryHeader title={'Popular'} />
//       <FlatList
//         data={popularMoviesList}
//         keyExtractor={(item: any) => item.id.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.containerGap36}
//         renderItem={({ item, index }) => (
//           <SubMovieCard
//             shoudlMarginatedAtEnd={true}
//             cardFunction={() => navigation.push('MovieDetails', { movieid: item.id })}
//             cardWidth={width / 3}
//             isFirst={index === 0}
//             isLast={index === popularMoviesList.length - 1}
//             title={item.title}
//             imagePath={item.poster_url}
//           />
//         )}
//       /> */}

//       <CategoryHeader title={'Upcoming'} />
//       <FlatList
//         data={upcomingMoviesList}
//         keyExtractor={(item: any) => item.id.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.containerGap36}
//         renderItem={({ item, index }) => (
//           <SubMovieCard
//             shoudlMarginatedAtEnd={true}
//             cardFunction={() => navigation.push('MovieDetails', { movieid: item.id })}
//             cardWidth={width / 3}
//             isFirst={index === 0}
//             isLast={index === upcomingMoviesList.length - 1}
//             title={item.title}
//             imagePath={item.poster_url}
//             // imagePath={baseImagePath('w342', item.poster_path)}
//           />
//         )}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.Black,
//   },
//   loadingContainer: {
//     flex: 1,
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   InputHeaderContainer: {
//     marginHorizontal: SPACING.space_36,
//     marginTop: SPACING.space_28,
//   },
//   containerGap36: {
//     gap: SPACING.space_36,
//   },
// });

// export default HomeScreen;
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  Alert
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { fetchNowPlayingMovies, fetchUpcomingMovies } from '../api/api';

import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any[]>([]);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);  // Reset lỗi khi gọi API mới

        const nowPlaying = await fetchNowPlayingMovies();
        const upcoming = await fetchUpcomingMovies();

        // In ra dữ liệu để kiểm tra
        console.log('Now Playing Movies:', nowPlaying);
        console.log('Upcoming Movies:', upcoming);

        // Kiểm tra và cập nhật danh sách phim
        setNowPlayingMoviesList(Array.isArray(nowPlaying) ? nowPlaying : []);
        setUpcomingMoviesList(Array.isArray(upcoming) ? upcoming : []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies. Please try again later.');
        Alert.alert('Error', 'Failed to load movies. Please check your network.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  // Nếu đang loading thì hiển thị vòng quay loading
  if (loading) {
    return (
      <ScrollView style={styles.container} bounces={false}>
        <StatusBar hidden />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  // Nếu có lỗi xảy ra, hiển thị thông báo lỗi
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Nếu không có phim đang chiếu hoặc sắp chiếu, hiển thị thông báo trống
  if (nowPlayingMoviesList.length === 0 && upcomingMoviesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No movies available at the moment.</Text>
      </View>
    );
  }

  return (
  <ScrollView style={styles.container} bounces={false}>
    <StatusBar hidden />
    {/* <View style={styles.InputHeaderContainer}>
      <InputHeader searchFunction={searchMoviesFunction} />
    </View> */}

    {/* Phim đang chiếu */}
    {nowPlayingMoviesList.length > 0 && (
      <>
        <CategoryHeader title={'Now Playing'} />
        <FlatList
          data={nowPlayingMoviesList}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap36}
          renderItem={({ item, index }) => (
            <MovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => navigation.push('MovieDetails', { movieId: item.id })}
              cardWidth={width * 0.7}
              isFirst={index === 0}
              isLast={index === nowPlayingMoviesList.length - 1}
              title={item.title}
              imagePath={item.poster_url}  // Sử dụng poster_url từ API
              genres={Array.isArray(item.genres) ? item.genres : []}  // Kiểm tra genres là mảng

            />
          )}
        />
      </>
    )}

    {/* Phim sắp chiếu */}
    {upcomingMoviesList.length > 0 && (
      <>
        <CategoryHeader title={'Upcoming'} />
        <FlatList
          data={upcomingMoviesList}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap36}
          renderItem={({ item, index }) => (
            <SubMovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => navigation.push('MovieDetails', { movieId: item.id })}
              cardWidth={width / 3}
              isFirst={index === 0}
              isLast={index === upcomingMoviesList.length - 1}
              title={item.title}
              imagePath={item.poster_url}  // Sử dụng poster_url từ API
            />
          )}
        />
      </>
    )}
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.White,
    fontSize: 16,
  },
});

export default HomeScreen;