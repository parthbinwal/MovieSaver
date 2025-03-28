import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

export default function MovieDetailScreen({ route }) {
  const [movie, setMovie] = useState(null);
  const API_KEY ='your api key' ;
  const { imdbID } = route.params;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (!movie) return null;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <View style={styles.details}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
        <Text style={styles.genre}>{movie.Genre}</Text>
        <Text style={styles.rating}>IMDb Rating: {movie.imdbRating}</Text>
        <Text style={styles.plot}>{movie.Plot}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  poster: { width: '100%', height: 400 },
  details: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  year: { fontSize: 18, color: 'gray', marginBottom: 8 },
  genre: { fontSize: 16, marginBottom: 8 },
  rating: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
  plot: { fontSize: 16, lineHeight: 24 },
});