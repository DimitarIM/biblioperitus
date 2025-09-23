'use client'

import BookGrid from "@/components/BookGrid";
import LoadingSymbol from "@/components/LoadingSymbol";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import { useBookContext } from "@/store/useBookContext";
import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
import { Book } from "@/types/types";
import { useProfileContext } from "@/store/useProfileContext";

export default function Home() {
  const [activeBook, setActiveBook] = useState<Book | null>();

  const bookCtx = useBookContext();
  const userCtx = useProfileContext();
  if (!bookCtx || !userCtx) return null;
  const { isLoading, books, setBooks, fetchBooks, searchTerm, setSearchTerm, setCurrentPage, currentPage, totalBooks, limit } = bookCtx;
  const { addUserFavorite, getUserInfo, biblioUser } = userCtx;


  useEffect(() => {
    if (!biblioUser) getUserInfo();
  }, [])

  useEffect(() => {
    console.log("clinet page:", currentPage);
    if (currentPage === 0) return;
    fetchBooks();
  }, [currentPage]);


  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={(event) => {
        setActiveBook(books.find((b) => b.key === event.active.id));
        console.log("active book set");
      }}
      onDragEnd={(event) => {
        const { over } = event;
        console.log("active book dropped");
        if (over?.id === "book_portal") {
          if (activeBook) {
            const activeBookId = activeBook.key.substring(activeBook.key.lastIndexOf("/") + 1);
            addUserFavorite(activeBookId, activeBook.cover_url);
          }
        }

        setActiveBook(null);
      }}
      onDragCancel={() => setActiveBook(null)}>

      <Navbar />
      <main className="flex flex-col justify-center items-center min-h-screen max-w-screen">
        <div className="flex flex-col">
          <form onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(1);
            if(currentPage === 1) fetchBooks();
          }} className="flex flex-col">
            <input type="text" value={searchTerm} placeholder="Search your book"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }} />
            <button type="submit" className="cursor-pointer">Submit</button>
          </form>

          <div className="flex gap-2">
            {
              currentPage > 1 && <button onClick={() => {
                setCurrentPage(prev => prev - 1);
              }} className="bg-foreground p-2 text-background cursor-pointer">
                Previous page
              </button>
            }

            {
              totalBooks > 0 && <Pagination />
            }

            {
              totalBooks >= limit && <button onClick={() => {
                setCurrentPage(prev => prev + 1);
              }} className="bg-foreground p-2 text-background cursor-pointer">
                Next page
              </button>
            }
          </div>

        </div>

        {
          !isLoading ? <BookGrid />
            : <LoadingSymbol />
        }
        <DragOverlay modifiers={[snapCenterToCursor]}>
          {activeBook ? (
            <div
              style={{ transform: "translate(-50%, -50%)" }}
              className="w-[30px] h-[30px] bg-foreground rounded-full cursor-grabbing">
            </div>
          ) : null}
        </DragOverlay>
      </main>
    </DndContext>
  );
}
