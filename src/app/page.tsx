'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/1080/1920');

  const generateNewImage = () => {
    // Add timestamp to prevent caching
    setImageUrl(`https://picsum.photos/1080/1920?random=${Date.now()}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative w-full max-w-3xl aspect-[9/16] mb-8">
        <Image
          src={imageUrl}
          alt="Random image"
          fill
          className="object-cover rounded-lg shadow-lg"
          priority
        />
      </div>
      <button
        onClick={generateNewImage}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Generate New Image
      </button>
    </main>
  );
}
