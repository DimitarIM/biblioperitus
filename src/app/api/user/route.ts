import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { auth } from "@/lib/auth/auth";
import { verifySession } from "@/lib/auth/dal";
import { fetchBook } from "@/lib/openLibraryFetches";
import { FavoriteBook } from "@/types/types";

export async function GET(req: NextRequest) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const session = await auth.api.getSession(req);
        const user = session?.user;

        const favorites = await sql`
        SELECT * FROM user_favorite_books WHERE user_id=${user?.id}
        ORDER BY
        created_at DESC,
        book_id DESC`

        const favoriteBooks = await Promise.all(
            favorites.map(f => fetchBook(f.book_id, f.cover_url))
        ) as FavoriteBook[];
        // const favoriteBooksWithCovers = await Promise.all(
        //     favoriteBooks.map(async (favoriteBook) => {
        //         return {
        //             ...favoriteBook,
        //             cover_url: favoriteBook.covers?.length
        //                 ? await fetchCover(favoriteBook.covers[0])
        //                 : null,
        //         };
        //     })
        // );

        return NextResponse.json(
            { message: "Favorite Books Fetched!", success: true, data: favoriteBooks },
            { status: 200 })
    } catch (err) {
          console.error("User GET failure: ", err);
        return NextResponse.json(
            { error: "Internal Server Error", success: false },
            { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const { bookId, coverUrl } = await req.json();
        const addedFavorite = await sql`
        INSERT INTO user_favorite_books (user_id, book_id, cover_url)
        VALUES (${checkedSession.userId}, ${bookId}, ${coverUrl})
        ON CONFLICT (user_id, book_id) DO NOTHING
        RETURNING *`

        // Check if there is already a favorite with the same id, if not add it to the favorite_books_info table in database

        return NextResponse.json(
            { message: "Favorite Added!", success: true, data: addedFavorite[0] },
            { status: 201 })

    } catch (err) {
        return NextResponse.json(
            { error: err, success: false },
            { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const { bookId } = await req.json();
        const deletedFavorite = await sql`
        DELETE FROM user_favorite_books
        WHERE user_id=${checkedSession.userId} AND book_id=${bookId}
        RETURNING *`

        if (deletedFavorite.length === 0) {
            return NextResponse.json(
                { success: false, message: "Item Not Found" },
                { status: 404 })
        }

        return NextResponse.json({
            message: "Favorite Deleted!",
            success: true, data: deletedFavorite[0]
        },
            { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: err, success: false },
            { status: 500 });

    }
}