import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, Pressable, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import Constants from 'expo-constants';

export default function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const API_KEY = Constants.manifest.extra.OMDB_API_KEY;

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      const timer = setTimeout(searchMovies, 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <SearchBar value={searchTerm} onChangeText={setSearchTerm} />
      
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <Pressable
            style={styles.movieItem}
            onPress={() => navigation.navigate('MovieDetail', { imdbID: item.imdbID })}
          >
            <Image
              source={{ uri: item.Poster }}
              style={styles.poster}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.Title}</Text>
              <Text style={styles.year}>{item.Year}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  movieItem: { flexDirection: 'row', marginBottom: 16 },
  poster: { width: 100, height: 150, marginRight: 16 },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  year: { fontSize: 16, color: 'gray' },
});