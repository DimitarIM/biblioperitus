'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import axios, { isAxiosError } from 'axios';
import { authClient } from '@/lib/auth/auth-client';
import { BiblioUser, Book } from '@/types/types';
import { redirect } from 'next/navigation';

interface ProfileContextType {
  isLoading: boolean,
  setLoading: (value: boolean) => void,

  biblioUser: BiblioUser | undefined
  setBiblioUser: (value: BiblioUser | undefined) => void

  getUserInfo: () => void;
  getUserFavoriteBooks: () => void;
  addUserFavorite: (bookId:string, coverId:string | undefined) => void;
  removeUserFavorite: (value:string) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);


export const ProfileContextProvider = ({ children }: { children: React.ReactNode }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [isLoading, setLoading] = useState<boolean>(false);
  const [biblioUser, setBiblioUser] = useState<BiblioUser>();

  useEffect(()=>{
    console.log(biblioUser);
  },[biblioUser]);

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const session = await authClient.getSession();
      const userInfo = (session.data?.user) as BiblioUser;

      const response = await axios.get(`${BASE_URL}/api/user`);
      userInfo.favoriteBooks = response.data.data;
      if (!userInfo) return;
      setBiblioUser(userInfo);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const getUserFavoriteBooks = (): Record<string, any> => {
    if (!biblioUser?.favoriteBooks) return [];
    return biblioUser.favoriteBooks;
  }

  const addUserFavorite = async (droppedBookId:string, droppedCoverUrl:string | undefined) => {
    try {
      await axios.post(`${BASE_URL}/api/user`, { bookId: droppedBookId, coverUrl: droppedCoverUrl });
      console.log("Book added successfully!!!!!!")
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log("Axios Error: ", err.response?.status);
        if (err.response?.status === 401) redirect("/login");
      }
      else console.log("Error: ", err.message);
    }
  }

  const removeUserFavorite = async (droppedBookId:string) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/user`, { data: {
        bookId: droppedBookId,
      } });
      console.log("Book deleted successfully!!!!!!")
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log("Axios Error: ", err.response?.status);
        if (err.response?.status === 401) redirect("/login");
      }
      else console.log("Error: ", err.message);
    }
  }

  return (
    <ProfileContext.Provider value={
      {
        isLoading, setLoading,
        biblioUser, setBiblioUser,
        getUserInfo, getUserFavoriteBooks, addUserFavorite, removeUserFavorite
      }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfileContext = () => {
  return useContext(ProfileContext);
}