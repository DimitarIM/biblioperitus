'use client'
import BlobCursor from '@/components/effects/Blob'
import FavoritesGrid from '@/components/FavoritesGrid'
import LoadingSymbol from '@/components/LoadingSymbol'
import Navbar from '@/components/Navbar'
import UserInfoBox from '@/components/UserInfoBox'
import { useProfileContext } from '@/store/useProfileContext'
import { FavoriteBook } from '@/types/types'
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'
import React, { useEffect, useState } from 'react'

function userProfile() {
  const [activeBook, setActiveBook] = useState<FavoriteBook | null>(null);

  const ctx = useProfileContext();
  if (!ctx) return <div>Loading</div>

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
            setActiveBook(biblioUser?.favoriteBooks?.find((b) => b.key === event.active.id) ?? null);
          }
          console.log("active book set");
        }}
        onDragEnd={(event) => {
          const { over } = event;
          console.log("active book dropped");
          if (over?.id === "book_portal") {
            if (activeBook) {
              const activeBookId = activeBook.key.substring(activeBook.key.lastIndexOf("/") + 1);
              removeUserFavorite(activeBookId);
              getUserInfo();
            }
          }

          setActiveBook(null);
        }}
        onDragCancel={() => setActiveBook(null)}>
        <Navbar activeBook={activeBook} />
        {/* <BlobCursor /> */}
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

export default userProfile