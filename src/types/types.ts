import { User } from "better-auth";

export interface BiblioUser extends User {
    favoriteBooks?: FavoriteBook[];
}

export type Book = {
    id: string,
    author_key:string[],
    author_name:string[],
    cover_i: number,
    key: string,
    title: string,
    cover_url?: string
}

export type FavoriteBook  = {
    description: string,
    cover_url?: string,
    favoriteKey: string,
    authors: Author[],
    title: string,
    subjects: string[],
}

export type Author = {
    name: string,
    bio: {type: string, value: string},
    personal_name: string,
    photos: number[],
    birth_date: string,
    death_date?: string
}