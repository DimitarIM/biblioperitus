import React, { useEffect, useState } from 'react'
import { useProfileContext } from '@/context/useProfileContext'
import FavoriteBookCard from './FavoriteBookCard';
import { motion } from 'motion/react';

function FavoritesGrid() {
  const ctx = useProfileContext();
  const { biblioUser } = ctx;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-min gap-6 w-full max-w-[1500px] h-full p-20 pt-12'>
      {
        biblioUser?.favoriteBooks?.map((favoriteBook, index) => (
          <motion.div key={favoriteBook.key}
            variants={itemVariants}>
            <FavoriteBookCard key={index} favoriteBook={favoriteBook} />
          </motion.div>
        ))
      }
    </motion.div>
  )
}

export default FavoritesGrid