import { useBookContext } from '@/store/useBookContext';
import React, { useEffect } from 'react'
import BookCard from './BookCard';

function BookGrid() {
    const ctx = useBookContext();
    if (!ctx) return <p>Loading...</p>;

    const { books } = ctx;

    return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-min gap-6 max-w-screen'>
                {books?.map((book, index) => (
                    <BookCard key={index} book={book} />
                ))}
            </div>
    )
}

export default BookGrid