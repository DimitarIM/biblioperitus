import { verifySession } from "@/lib/auth/dal";
import { NextResponse } from "next/server";
import { fetchBooks, fetchCover } from "@/lib/openLibraryFetches";
import { Book } from "@/types/types";

const ALLOWED_ORIGIN =
    process.env.NODE_ENV === 'production'
        ? 'https://app.example'
        : '*';

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        },
    });
}


export async function GET(req: Request) {

    const session = await verifySession();
    if (!session) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const data = await fetchBooks(title, page, limit);
    const books: Book[] = data.docs;
    const numFound = data.numFound;

    // let booksWithCovers = books.filter(books => books.cover_i);

    const booksWithCovers = await Promise.all(
        books.map(async (book) => {
            return {
                ...book,
                cover_url: await fetchCover(book.cover_i),
            };
        })
    );
    return NextResponse.json({ booksWithCovers, numFound }, {
        headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN },
    });
}