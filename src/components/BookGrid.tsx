import { useBookContext } from '@/store/useBookContext';
import React, { useEffect } from 'react'
import BookCard from './BookCard';
import { motion } from 'motion/react';

function BookGrid() {
    const ctx = useBookContext();
    if (!ctx) return <p>Loading...</p>;

    const { books } = ctx;

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
        <motion.div
            key={books.map(b => b.id).join(',')}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-min gap-6 w-full max-w-[1500px] h-full p-20 pt-12'>
            {books?.map((book, index) => (
                <motion.div key={book.key}
                    variants={itemVariants}>
                    <BookCard key={index} book={book} />
                </motion.div>

            ))}
        </motion.div>
    )
}

export default BookGrid