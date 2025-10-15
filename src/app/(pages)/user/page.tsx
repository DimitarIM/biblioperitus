'use client'
import FavoritesGrid from '@/components/FavoritesGrid'
import LoadingSymbol from '@/components/LoadingSymbol'
import Navbar from '@/components/Navbar'
import UserInfoBox from '@/components/UserInfoBox'
import { useProfileContext } from '@/context/useProfileContext'
import { FavoriteBook } from '@/types/types'
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'
import React, { useEffect, useState } from 'react'

function UserProfile() {
  const [activeBook, setActiveBook] = useState<FavoriteBook | null>(null);

  const ctx = useProfileContext();

  const { isLoading, getUserInfo, removeUserFavorite, biblioUser } = ctx;
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <DndContext
        collisionDetection={pointerWithin}
        onDragStart={(event) => {
          if (biblioUser?.favoriteBooks) {
            setActiveBook(biblioUser?.favoriteBooks?.find((b) => b.favoriteKey === event.active.id) ?? null);
          }
          console.log("active book set");
        }}
        onDragEnd={(event) => {
          const { over } = event;
          console.log("active book dropped");
          if (over?.id === "book_portal") {
            if (activeBook) {
              const activeBookId = activeBook.favoriteKey.substring(activeBook.favoriteKey.lastIndexOf("/") + 1);
              removeUserFavorite(activeBookId);
              getUserInfo();
            }
          }

          setActiveBook(null);
        }}
        onDragCancel={() => setActiveBook(null)}>
        <Navbar activeBook={activeBook} />
        <main className="flex flex-col justify-center items-center min-h-screen max-w-screen pt-[120px]">
          <UserInfoBox />
          {
            !isLoading ? <FavoritesGrid />
              : <LoadingSymbol />
          }
          <DragOverlay modifiers={[snapCenterToCursor]}>
            {activeBook ? (
              <div className="w-10 h-10 rounded-[50%] bg-foreground"></div>
            ) : null}
          </DragOverlay>
        </main>

      </DndContext>
    </>
  )
}

export default UserProfile