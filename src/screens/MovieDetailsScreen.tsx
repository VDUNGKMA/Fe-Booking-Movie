// MovieDetailsScreen.js
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
  BORDERRADIUS,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import { fetchMovieDetails } from '../api/api';
import Video from 'react-native-video';
import RenderHTML from 'react-native-render-html';  // Import RenderHTML

const { width, height } = Dimensions.get('window');

const MovieDetailsScreen = ({ navigation, route }: any) => {
  const [movieData, setMovieData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await fetchMovieDetails(route.params.movieId);
      setMovieData(tempMovieData);
    })();
  }, []);

  if (!movieData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={COLORS.Orange} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar hidden />

      {/* Hình nền với hiệu ứng Gradient Overlay */}
      <View style={styles.headerContainer}>
        <ImageBackground
          source={{ uri: movieData.poster_url }}
          style={styles.imageBG}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.0)']}
            style={styles.linearGradient}
          >
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="arrow-left"
                header=""
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        {/* Poster phim */}
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: movieData.poster_url }}
            style={styles.posterImage}
          />
        </View>
      </View>

      {/* Thông tin phim */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movieData.title}</Text>

        {/* Thông tin bổ sung */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <CustomIcon name="clock" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {Math.floor(movieData?.duration / 60)}h{' '}
              {Math.floor(movieData?.duration % 60)}m
            </Text>
          </View>
          <View style={styles.infoItem}>
            <CustomIcon name="radio" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {new Date(movieData?.release_date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <CustomIcon name="star" style={styles.infoIcon} />
            <Text style={styles.infoText}>{movieData?.rating}</Text>
          </View>
        </View>

        {/* Thể loại */}
        <View style={styles.genreContainer}>
          {movieData?.genres.map((item: any) => (
            <View style={styles.genreBox} key={item.id}>
              <Text style={styles.genreText}>{item.genre_name}</Text>
            </View>
          ))}
        </View>

        {movieData?.description ? (
          <RenderHTML
            contentWidth={width}
            source={{ html: movieData.description }}
            baseStyle={{
              fontFamily: FONTFAMILY.poppins_light,
              fontSize: FONTSIZE.size_14,
              color: COLORS.WhiteRGBA75,
              textAlign: 'justify',
              marginVertical: SPACING.space_16,
            }}
          />
        ) : (
          <Text style={styles.descriptionText}>Không có mô tả</Text>
        )}

        {/* Trailer */}
        {movieData?.trailer_url && (
          <View style={styles.trailerContainer}>
            <Text style={styles.sectionTitle}>Trailer</Text>
            <Video
              source={{ uri: movieData.trailer_url }}
              style={styles.video}
              controls={true}
              resizeMode="contain"
              paused={true}
            />
          </View>
        )}

        {/* Nút đặt vé */}
        <TouchableOpacity
          style={styles.buttonBG}
          onPress={() => {
            navigation.push('CinemaSelection', {
              movieId: route.params.movieId,
            });
          }}
        >
          <Text style={styles.buttonText}>Đặt vé ngay</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: COLORS.Black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'relative',
  },
  imageBG: {
    width: '100%',
    height: height * 0.5,
  },
  linearGradient: {
    flex: 1,
  },
  appHeaderContainer: {
    marginTop: SPACING.space_36,
    marginLeft: SPACING.space_16,
  },
  posterContainer: {
    position: 'absolute',
    bottom: -80,
    alignSelf: 'center',
    shadowColor: COLORS.Black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  posterImage: {
    width: 160,
    height: 240,
    borderRadius: 12,
  },
  infoContainer: {
    marginTop: 100,
    paddingHorizontal: SPACING.space_24,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: 'center',
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: SPACING.space_16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    marginRight: SPACING.space_8,
  },
  infoText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: SPACING.space_8,
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
    margin: SPACING.space_4,
  },
  genreText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA75,
    textAlign: 'justify',
    marginVertical: SPACING.space_16,
  },
  trailerContainer: {
    marginVertical: SPACING.space_16,
  },
  sectionTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
    marginBottom: SPACING.space_8,
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  buttonBG: {
    backgroundColor: COLORS.Orange,
    paddingVertical: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
});

export default MovieDetailsScreen;
