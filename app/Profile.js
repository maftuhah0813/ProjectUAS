// app/Profile.js
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  return (
    <LinearGradient colors={['#6FB1FC', '#4364F7']} style={styles.container}>
      <View style={styles.profileBox}>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/19/85/6e/19856e3dfd1b9b7fa774e7354d19b5d4.jpg' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Pengguna Qur'an App</Text>
        <Text style={styles.email}>email@contoh.com</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  profileBox: {
    alignItems: 'center',
    backgroundColor: '#ffffff22',
    padding: 30,
    borderRadius: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: '#ddd',
    fontSize: 14,
  },
});
