// src/app/page.tsx
import { redirect } from 'next/navigation';
import HomePage from '@/containers/homePage';

export default function Home() {
  // Redirect to '/home'
  // redirect('/main');
  return (
    <HomePage />
  );
}
