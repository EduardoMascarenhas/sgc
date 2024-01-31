import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(()=> {
    if(auth.accessToken) {
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }
  }, [])
  return (
    <>
    </>
  )
}
