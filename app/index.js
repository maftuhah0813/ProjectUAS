// app/index.js
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (router) {
        router.replace('/SplashScreen');
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
