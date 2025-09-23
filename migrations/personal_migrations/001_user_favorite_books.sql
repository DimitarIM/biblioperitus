CREATE TABLE IF NOT EXISTS user_favorite_books (
    user_id TEXT REFERENCES "user"(id) ON DELETE CASCADE,
    book_id TEXT NOT NULL, -- This'll be openlibrary api's book id!!
    cover_url TEXT
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, book_id)
)

