// app/Bookmark.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Bookmark() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const getBookmarks = async () => {
      const data = await AsyncStorage.getItem('bookmarks');
      if (data) setBookmarks(JSON.parse(data));
    };
    getBookmarks();
  }, []);

  return (
    <LinearGradient colors={['#6FB1FC', '#4364F7']} style={styles.container}>
      <Text style={styles.title}>Bookmark Ayat</Text>
      <ScrollView>
        {bookmarks.length === 0 ? (
          <Text style={styles.empty}>Belum ada bookmark.</Text>
        ) : (
          bookmarks.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.surah}>{item.surah} - Ayat {item.ayahNumber}</Text>
              <Text style={styles.arabic}>{item.arabic}</Text>
              <Text style={styles.translation}>{item.text}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  card: {
    backgroundColor: '#ffffff22',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  surah: { color: '#fff', fontWeight: 'bold' },
  arabic: { fontSize: 20, color: '#fff', textAlign: 'right', marginTop: 8 },
  translation: { color: '#fff', marginTop: 5 },
  empty: { color: '#fff', textAlign: 'center', marginTop: 30 },
});
