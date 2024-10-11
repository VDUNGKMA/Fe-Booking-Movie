

// export default HomeScreen;
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  Alert,
  Image
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { fetchNowPlayingMovies, fetchUpcomingMovies } from '../api/api';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any[]>([]);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null); // Reference for FlatList

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const nowPlaying = await fetchNowPlayingMovies();
        const upcoming = await fetchUpcomingMovies();

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

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        prevIndex === nowPlayingMoviesList.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Auto scroll every 3 seconds

    return () => clearInterval(slideInterval); // Clear interval when component unmounts
  }, [nowPlayingMoviesList.length]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentSlideIndex,
        animated: true,
      });
    }
  }, [currentSlideIndex]);

  const renderSmallMovieAd = ({ item }: any) => {
    return (
      <View style={styles.smallSlide}>
        <Image source={{ uri: item.poster_url }}
         style={styles.smallAdImage} 
          resizeMode="contain" />
         
      </View>
    );
  };

  if (loading) {
    return (
      <ScrollView style={styles.container} bounces={false}>
        <StatusBar hidden />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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

      {/* Khung viền cố định cho slide */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={nowPlayingMoviesList}
          renderItem={renderSmallMovieAd}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          snapToInterval={width * 0.7} // Thay đổi kích thước snapToInterval
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: SPACING.space_20 }}
          style={{ marginBottom: SPACING.space_28 }}
        />
      </View>

     
      {/* Now Playing Movies */}
      {nowPlayingMoviesList.length > 0 && (
        <>
          <CategoryHeader title={'Now Playing'} />
          <FlatList
            data={nowPlayingMoviesList}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.containerGap36}
            renderItem={({ item }) => (
              <MovieCard
                cardFunction={() => navigation.push('MovieDetails', { movieId: item.id })}
                cardWidth={width * 0.7}
                title={item.title}
                imagePath={item.poster_url}
                genres={Array.isArray(item.genres) ? item.genres : []}
              />
            )}
          />
        </>
      )}

      {/* Upcoming Movies */}
      {upcomingMoviesList.length > 0 && (
        <>
          <CategoryHeader title={'Upcoming'} />
          <FlatList
            data={upcomingMoviesList}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.containerGapUpcomming}
            renderItem={({ item, index }) => (
              <SubMovieCard
                shoudlMarginatedAtEnd={true}
                cardFunction={() => navigation.push('MovieDetails', { movieId: item.id })}
                cardWidth={width / 3}
                isFirst={index === 0}
                isLast={index === upcomingMoviesList.length - 1}
                title={item.title}
                imagePath={item.poster_url}
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
  carouselContainer: {
    marginTop: 50, // Adjust this value to move the carousel down
    // marginBottom: SPACING.space_28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.White,
    borderRadius: 12,
    overflow: 'hidden',
    width: width * 0.8,
    alignSelf: 'center',
  },
  smallSlide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.7, // Kích thước nhỏ hơn
  },
  smallAdImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  containerGap36: {
    gap: SPACING.space_55,
    paddingHorizontal: (width - width * 0.7) / 2,
  },
  containerGapUpcomming: {
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
