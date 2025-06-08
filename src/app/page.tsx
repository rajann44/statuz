'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const TAGS = [
  'business', 'change', 'character', 'competition', 'courage', 'creativity',
  'education', 'faith', 'famous-quotes', 'film', 'freedom', 'friendship',
  'future', 'happiness', 'history', 'honor', 'humor', 'humorous',
  'imagination', 'inspirational', 'leadership', 'life', 'literature',
  'love', 'motivational', 'nature', 'opportunity', 'pain', 'perseverance',
  'philosophy', 'politics', 'power', 'religion', 'sadness', 'science',
  'self', 'self-help', 'social-justice', 'spirituality', 'sports',
  'success', 'technology', 'time', 'truth', 'virtue', 'war',
  'weakness', 'wisdom', 'work'
];

interface Quote {
  content: string;
  author: string;
}

function getRandomTag() {
  return TAGS[Math.floor(Math.random() * TAGS.length)];
}

export default function Home() {
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/1080/1920');
  const [selectedTag, setSelectedTag] = useState('technology');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateNewImage = () => {
    // Add timestamp to prevent caching
    setImageUrl(`https://picsum.photos/1080/1920?random=${Date.now()}`);
  };

  const fetchQuote = async (tag: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.quotable.io/random?tags=${tag}`);
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuote(selectedTag);
  }, [selectedTag]);

  // Handler for random tag and image
  const handleRandomize = () => {
    const randomTag = getRandomTag();
    setSelectedTag(randomTag);
    generateNewImage();
  };

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black">
      {/* Aspect-ratio box for image and overlays */}
      <div className="relative w-[90vw] max-w-[430px] aspect-[9/16] flex items-center justify-center">
        {/* Image fills the aspect box */}
        <Image
          src={imageUrl}
          alt="Random image"
          fill
          className="object-cover rounded-lg"
          priority
        />
        {/* Quote overlay, always centered in image area */}
        <div className="absolute top-1/2 left-1/2 w-[90%] max-w-[95%] -translate-x-1/2 -translate-y-1/2 text-center">
          {isLoading ? (
            <div className="text-white text-xl">Loading quote...</div>
          ) : quote ? (
            <div className="bg-black/50 backdrop-blur-sm p-3 rounded-lg">
              <p className="text-white text-base md:text-lg mb-1 break-words line-clamp-4">{quote.content}</p>
              <p className="text-white/80 text-xs md:text-sm">- {quote.author}</p>
            </div>
          ) : null}
        </div>
        {/* Controls at the bottom of the image area, grouped in a card for best UX */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[95%] flex justify-center">
          <div className="flex flex-col items-center gap-4 w-full max-w-xs bg-black/60 backdrop-blur-md rounded-xl p-5 shadow-lg">
            {/* Button group for dropdown, icon, and Get New Quote */}
            <div className="flex flex-row w-full h-9 mt-1 items-center">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="flex-1 min-w-0 px-3 py-1.5 text-sm bg-black/80 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Select quote category"
              >
                {TAGS.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')}
                  </option>
                ))}
              </select>
              {/* SVG icon as a button between dropdown and Get New Quote */}
              <button
                onClick={() => fetchQuote(selectedTag)}
                className="mx-1 p-1.5 rounded-full bg-black/70 hover:bg-black/90 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
                title="Get New Quote"
                aria-label="Get New Quote"
                tabIndex={0}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="white">
                  <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/>
                </svg>
              </button>
              <button
                onClick={() => fetchQuote(selectedTag)}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white border border-white/20 rounded-lg hover:bg-blue-700 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ minWidth: '110px' }}
              >
                Get New Quote
              </button>
            </div>
            {/* Divider above Generate New Image */}
            <div className="w-full border-t border-white/20 my-2"></div>
            <button
              onClick={generateNewImage}
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors w-full font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Change Background
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
