CREATE TABLE IF NOT EXISTS favorite_books_info (
    book_id TEXT PRIMARY KEY REFERENCES user_favorite_books(book_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    authors JSONB,
    description TEXT,
    covers INT[],
    first_publish_date TEXT,
)