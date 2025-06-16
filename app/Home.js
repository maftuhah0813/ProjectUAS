// app/Home.js
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Home() {
  const [surahs, setSurahs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://equran.id/api/v2/surat')
      .then(res => res.json())
      .then(json => {
        setSurahs(json.data);
        setFiltered(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const keyword = text.toLowerCase();
    const result = surahs.filter(surah =>
      surah.namaLatin.toLowerCase().includes(keyword)
    );
    setFiltered(result);
  };

  if (loading) {
    return (
      <LinearGradient colors={['#6FB1FC', '#4364F7']} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#6FB1FC', '#4364F7']} style={styles.container}>
      <Text style={styles.title}>Daftar Surah</Text>
      <TextInput
        style={styles.input}
        placeholder="Cari surah..."
        placeholderTextColor="#ddd"
        value={search}
        onChangeText={handleSearch}
      />

      <ScrollView>
        {filtered.map((surah) => (
          <TouchableOpacity
            key={surah.nomor}
            onPress={() => navigation.navigate('DetailSurah', { id: surah.nomor })}
            style={styles.card}
          >
            <Text style={styles.surahTitle}>
              {surah.nomor}. {surah.namaLatin}
            </Text>
            <Text style={styles.sub}>{surah.arti} • {surah.jumlahAyat} ayat</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff33',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#ffffff22',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  surahTitle: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  sub: { color: '#eee' },
});
