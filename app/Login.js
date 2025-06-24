
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Login() {
  const router =useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      await AsyncStorage.setItem('userEmail', email);
      router.replace('/Home');
    } else {
      alert('Isi semua field!');
    }
  };

  return (
    <LinearGradient colors={['#6FB1FC', '#4364F7']} style={styles.container}>
      <Image source={require('../assets/images/logo_alquran.jpg')} style={styles.logo} />
      <Text style={styles.title}>Aplikasi Al-Qur'an</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
       <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#ffffff55',
    padding: 12,
    width: '80%',
    borderRadius: 10,
    marginVertical: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    padding: 12,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#4364F7',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
