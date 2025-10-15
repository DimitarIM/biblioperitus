'use client'

import React, { createContext, useCallback, useContext, useState } from 'react'
import axios from "axios"
import { redirect } from 'next/navigation';
import { Book } from '@/types/types';

interface BookContextType {
    isLoading: boolean,
    setLoading: (value: boolean) => void,

    searchTerm: string,
    setSearchTerm: (value: string) => void,

    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,

    totalBooks: number,
    setTotalBooks: React.Dispatch<React.SetStateAction<number>>,

    limit: number,
    setLimit: (value:number) => void,

    books: Book[],
    setBooks: (value: Book[]) => void,

    fetchBooks: () => void,
}

const BookContext = createContext<BookContextType>(null!);

export const BookContextProvider = ({ children }: { children: React.ReactNode }) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);

    const [isLoading, setLoading] = useState<boolean>(false);
    const [books, setBooks] = useState<Book[]>([]);

    const fetchBooks = useCallback(async () => {
        try {
            setLoading(true);
            console.log("It's loading")
            const response = await axios.get(`${BASE_URL}/api/books?title=${searchTerm}&page=${currentPage}&limit=${limit}`, { withCredentials: true });
            setTotalBooks(response.data.numFound);
            setBooks(response.data.booksWithCovers);
            
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log("Axios Error: ", err.response?.status);
                if (err.response?.status === 401) redirect("/login");
            }
            else if(err instanceof Error) console.log("Error: ", err.message);
        } finally {
            setLoading(false);
        }
    },[BASE_URL, searchTerm, currentPage, limit])

    return (
        <BookContext.Provider value={{ isLoading, setLoading, searchTerm, setSearchTerm, currentPage, setCurrentPage, limit, setLimit, books, setBooks, totalBooks, setTotalBooks, fetchBooks }}>
            {children}
        </BookContext.Provider>
    )
}

export const useBookContext = () => {
    return useContext(BookContext);
}