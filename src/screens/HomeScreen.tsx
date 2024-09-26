//HomeScreen.tsx
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
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
} from '../api/api';

import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>([]);
  const [popularMoviesList, setPopularMoviesList] = useState<any>([]);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const nowPlaying = await fetchNowPlayingMovies();
        const popular = await fetchPopularMovies();
        const upcoming = await fetchUpcomingMovies();

        // console.log("data", nowPlaying);

        setNowPlayingMoviesList(nowPlaying || []);
        setPopularMoviesList(popular || []);
        setUpcomingMoviesList(upcoming || []);
      } catch (error) {
        console.error('Error fetching movies: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

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

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />
      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      <CategoryHeader title={'Now Playing'} />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id.toString()}
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
            imagePath={item.poster_url}
            // imagePath={baseImagePath('w780', item.poster_url)}
            genres={item.genres}
            // vote_average={item.vote_average}
            // vote_count={item.vote_count}
          />
        )}
      />

      <CategoryHeader title={'Popular'} />
      <FlatList
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => (
          <SubMovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => navigation.push('MovieDetails', { movieid: item.id })}
            cardWidth={width / 3}
            isFirst={index === 0}
            isLast={index === popularMoviesList.length - 1}
            title={item.title}
            imagePath={item.poster_url}
          />
        )}
      />

      <CategoryHeader title={'Upcoming'} />
      <FlatList
        data={upcomingMoviesList}
        keyExtractor={(item: any) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => (
          <SubMovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => navigation.push('MovieDetails', { movieid: item.id })}
            cardWidth={width / 3}
            isFirst={index === 0}
            isLast={index === upcomingMoviesList.length - 1}
            title={item.title}
            imagePath={item.poster_url}
            // imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default HomeScreen;