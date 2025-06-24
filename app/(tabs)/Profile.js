
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('userEmail');
        if (savedEmail) setEmail(savedEmail);
      } catch (error) {
        console.log('Gagal ambil email:', error);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
   await AsyncStorage.removeItem('userEmail') ;
   router.replace('/Login');
  };

  return (
    <View style={styles.container}>
      <Image
      source={require('../../assets/images/profile_pictures.jpg')}
      style={{ width: 90, height: 90, borderRadius: 30, marginBottom: 10 }}
    />
      <Text style={styles.title}>Profil Pengguna</Text>
      <Text style={styles.label}>Email : </Text>
      <Text style={styles.email}>{email}</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#6FB1FC',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
 },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#4364F7',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
 
