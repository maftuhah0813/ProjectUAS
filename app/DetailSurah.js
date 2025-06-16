// app/DetailSurah.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetailSurah() {
  const { params } = useRoute();
  const surahId = params?.id;

  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    fetch(`https://equran.id/api/v2/surat/${surahId}`)
      .then(res => res.json())
      .then(json => {
        setSurah(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  const playAudio = async (surahNumber, ayatNumber) => {
    try {
      if (sound) await sound.unloadAsync();

      const id = `${surahNumber}:${ayatNumber}`;
      const res = await fetch(`https://api.alquran.cloud/v1/ayah/${id}/ar.abdulbasitmurattal`);
      const json = await res.json();
      const audioUrl = json?.data?.audio;

      if (audioUrl) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
        setSound(newSound);
        await newSound.playAsync();
      } else {
        alert("Audio tidak tersedia untuk ayat ini.");
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      alert("Gagal memutar audio.");
    }
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
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{surah.namaLatin}</Text>
        <Text style={styles.subtitle}>{surah.arti}</Text>
        <Text style={styles.info}>Jumlah Ayat: {surah.jumlahAyat}</Text>

        {surah.ayat.map((ayah) => (
          <View key={ayah.nomorAyat} style={styles.ayahBox}>
            <View style={styles.ayahHeader}>
              <Text style={styles.ayahNumber}>{ayah.nomorAyat}.</Text>
              <TouchableOpacity onPress={() => playAudio(surah.nomor, ayah.nomorAyat)}>
                <Text style={styles.audioButton}>🔊</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addBookmark(ayah)}>
                <Text style={[styles.audioButton, { marginLeft: 10 }]}>🔖</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.arabic}>{ayah.teksArab}</Text>
            <Text style={styles.translation}>{ayah.teksIndonesia}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
const addBookmark = async (ayah) => {
  try {
    const newBookmark = {
      surah: surah.namaLatin,
      surahId: surah.nomor,
      ayahNumber: ayah.nomorAyat,
      text: ayah.teksIndonesia,
      arabic: ayah.teksArab,
    };

    const existing = await AsyncStorage.getItem('bookmarks');
    const bookmarks = existing ? JSON.parse(existing) : [];
    bookmarks.push(newBookmark);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    alert('Bookmark ditambahkan!');
  } catch (e) {
    console.error(e);
  }
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#eee',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    textAlign: 'center',
    color: '#ccc',
    marginBottom: 20,
  },
  ayahBox: {
    backgroundColor: '#ffffff22',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  ayahHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ayahNumber: {
    color: '#fff',
    fontWeight: 'bold',
  },
  audioButton: {
    fontSize: 18,
  },
  arabic: {
    fontSize: 22,
    color: '#fff',
    marginTop: 10,
    textAlign: 'right',
  },
  translation: {
    marginTop: 6,
    color: '#fff',
    fontSize: 14,
  },
});
