export async function fetchBooks(title: string, page: number, limit: number) {
    console.log("api page number", page);
    const response =
        await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&fields=key,title,author_name,author_key,cover_i&page=${page}&limit=${limit}`);
    const { docs, numFound } = await response.json();
    return { docs, numFound }
}

export async function fetchBook(bookId: string, cover_url:string) {
    console.log(bookId);
    if (!bookId) return undefined
    const response = await fetch(`https://openlibrary.org/works/${bookId}.json`);

    if (!response.ok) {
        console.error(`fetching book failed with id ${bookId} status: `, response.status);
    }
    try {
        const { description, key, authors, title, subjects } = await response.json();
        let keySubStr = key.substring(key.lastIndexOf("/") + 1);
        return { description, cover_url, key, authors, title, subjects }
    } catch (err) {
        console.error(`Invalid JSON for book ${bookId}:`, err);
        return undefined;
    }

}

export async function fetchCover(id: number): Promise<string | undefined> {
    if (!id) return undefined
    try {
        const response = await fetch(`https://covers.openlibrary.org/b/id/${id}-L.jpg`);
        if (!response.ok) {
            console.log(`No cover for book with cover_id ${id}`);
            return undefined;
        }
        return response.url;

    } catch (error) {
        console.log("Error fetching: ", error);
        return undefined;
    }
}

export async function fetchAuthor(id: number) {
    if (!id) return undefined;
    try {
        const response = await fetch(`https://covers.openlibrary.org/authors/${id}.json`);
        if (!response.ok) {
            console.log(`No author info for the book ${id}`);
            return undefined;
        }

        const { name, bio, personal_name, photos, birth_date, death_date } = await response.json();
        return { name, bio, photos, birth_date, death_date }
    } catch (error) {
        console.log("Error fetching: ", error);
        return undefined;
    }
}