'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '../../constant';

axios.defaults.withCredentials = true

export const useUserDetails = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getuserdetails`);
        setUser(response.data);
        if (!response.data && response.data?.success == false) {
          router.push('/login');
        }
      } catch (err) {
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  return { user };
};
