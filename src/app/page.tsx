'use client'

import BookGrid from "@/components/BookGrid";
import LoadingSymbol from "@/components/LoadingSymbol";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import { useBookContext } from "@/store/useBookContext";
import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { Book } from "@/types/types";
import { useProfileContext } from "@/store/useProfileContext";
import HomeDec1 from "@/assets/images/home_dec_1.svg"
import Noise from "@/components/effects/Noise";
import ScrollShadowing from "@/components/effects/ScrollShadowing";

export default function Home() {
  const [activeBook, setActiveBook] = useState<Book | null>(null);

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
    <>
      <Noise />
      <ScrollShadowing />
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
          <Navbar activeBook = {activeBook}/>
        <main className="relative flex flex-col min-h-screen w-screen max-w-full pt-[110px]">


          <div className="z-2 flex flex-col justify-center items-center gap-3 pt-20">

            <form onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
              if (currentPage === 1) fetchBooks();
            }} className="relative flex flex-col gap-2 pt-2">
              <HomeDec1 className="absolute z-[-1] bottom-3 right-[-35px] rotate-270 size-30" />
              <input type="text" value={searchTerm} placeholder="Search your book"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }} className="border-2 border-foreground/40 text-foreground rounded-[4px] p-1" />
              <button type="submit" className="cursor-pointer text-[1.2rem] bg-background/50 shadow-[0px_0px_15px_14px_rgba(5,_4,_3,_0.4)]">Submit</button>
            </form>

            <div className="flex gap-2 justify-center items-center pt-20">
              {
                currentPage > 1 && <button onClick={() => {
                  setCurrentPage(prev => prev - 1);
                }} className="bg-foreground rounded-[1px] p-2 text-background cursor-pointer">
                  Previous page
                </button>
              }

              {
                totalBooks > 0 && <Pagination />
              }

              {
                totalBooks >= limit && <button onClick={() => {
                  setCurrentPage(prev => prev + 1);
                }} className="bg-foreground rounded-[1px] p-2 text-background cursor-pointer">
                  Next page
                </button>
              }
            </div>

          </div>
          <div className="relative h-full flex justify-center items-center w-screen max-w-full">
            {
              !isLoading ? <BookGrid />
                : <LoadingSymbol />
            }
          </div>

          <DragOverlay modifiers={[snapCenterToCursor]}>
            {activeBook ? (
              <div className="w-10 h-10 rounded-[50%] bg-foreground"></div>
            ) : null}
          </DragOverlay>
        </main >
      </DndContext>
    </>



  );
}
