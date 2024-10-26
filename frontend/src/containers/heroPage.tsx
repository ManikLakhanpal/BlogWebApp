// components/HeroPage.tsx
"use client";

import React, { useEffect } from 'react';
import { useUser } from '@/context/UserContext';

const HeroPage = () => {
  const { user, loading, error } = useUser();

  useEffect(() => {
    if (user) {
      alert(`User Data: ${JSON.stringify(user)}`);
    } else {
      alert('No user data found');
    }
  }, [user]);

  return (
    <div>
      <h1 className='text-white'>Welcome to the Hero Page</h1>
      {/* Your other content goes here */}
    </div>
  );
};

export default HeroPage;