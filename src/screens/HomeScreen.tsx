
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
import { fetchPopularMovies, Movie } from '../api/apicalls';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any[]>([]);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any[]>([]);
  const [popularMoviesList, setPopularMoviesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Fetch movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const nowPlaying = await fetchNowPlayingMovies();
        const upcoming = await fetchUpcomingMovies();
        const popular = await fetchPopularMovies();

        setNowPlayingMoviesList(Array.isArray(nowPlaying) ? nowPlaying : []);
        setUpcomingMoviesList(Array.isArray(upcoming) ? upcoming : []);
        setPopularMoviesList(Array.isArray(popular) ? popular : []);
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

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        prevIndex === popularMoviesList.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [popularMoviesList.length]);

  // Scroll to the current slide
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentSlideIndex,
        animated: true,
      });
    }
  }, [currentSlideIndex]);

  const renderSlideImage = ({ item }: { item: Movie }) => (
    <View style={styles.imageWrapper}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.slideImage}
        resizeMode="contain" // Ensures the full image is visible within the smaller frame
      />
    </View>
  );

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

      {/* Slide Carousel with Popular Movies */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={popularMoviesList}
          renderItem={renderSlideImage}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          snapToInterval={width * 0.5} // Adjusted for smaller slide frame
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: SPACING.space_10 }}
          style={{ marginBottom: SPACING.space_20 }}
        />
      </View>

      {/* Now Playing Movies */}
      {nowPlayingMoviesList.length > 0 && (
        <>
          <CategoryHeader title={'Đang khởi chiếu'} />
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
                rating={item.rating}
                genres={Array.isArray(item.genres) ? item.genres : []}
              />
            )}
          />
        </>
      )}

      {/* Upcoming Movies */}
      {upcomingMoviesList.length > 0 && (
        <>
          <CategoryHeader title={'Sắp khởi chiếu'} />
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
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.White,
    borderRadius: 10,
    overflow: 'hidden',
    width: width * 0.5, // Smaller width of carousel container
    alignSelf: 'center',
  },
  imageWrapper: {
    width: width * 0.7, // Smaller width for the image wrapper
    height: 150, // Smaller height for a more compact slide
    overflow: 'hidden',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
