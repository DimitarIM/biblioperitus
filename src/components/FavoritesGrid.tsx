import React, { useEffect, useState } from 'react'
import BookCard from './BookCard'
import { useProfileContext } from '@/store/useProfileContext'
import { Book, FavoriteBook } from '@/types/types';
import { fetchBook } from '@/lib/openLibraryFetches';
import FavoriteBookCard from './FavoriteBookCard';

function FavoritesGrid() {
  const ctx = useProfileContext();
  if (!ctx) return <p>Loading...</p>;
  const { biblioUser } = ctx;
  useEffect(()=>{
    console.log(biblioUser?.favoriteBooks);
  },[biblioUser]);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-min gap-6'>
      {
        biblioUser?.favoriteBooks?.map((favoriteBook, index) => (
          <FavoriteBookCard key={index} favoriteBook={favoriteBook}/>
        ))
      }
    </div>
  )
}

export default FavoritesGrid