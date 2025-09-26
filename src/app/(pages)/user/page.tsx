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
  const [activeBook, setActiveBook] = useState<FavoriteBook | null>();

  const ctx = useProfileContext();
  if (!ctx) return <div>Loading</div>

  const { isLoading, getUserInfo, removeUserFavorite, biblioUser } = ctx;
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <BlobCursor
        blobType="circle"
        fillColor="#5227FF"
        trailCount={3}
        sizes={[60, 125, 75]}
        innerSizes={[20, 35, 25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6, 0.6, 0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={30}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={100}
      />
      <DndContext
        collisionDetection={pointerWithin}
        onDragStart={(event) => {
          if (biblioUser?.favoriteBooks) {
            setActiveBook(biblioUser?.favoriteBooks?.find((b) => b.key === event.active.id));
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
        <Navbar />
        <main className="flex flex-col justify-center items-center min-h-screen max-w-screen">
          <UserInfoBox />
          {
            !isLoading ? <FavoritesGrid />
              : <LoadingSymbol />
          }
          <DragOverlay modifiers={[snapCenterToCursor]}>
            {activeBook ? (
              <div className='flex items-center justify-center'>
                <svg viewBox="0 0 200 200" className="w-30 h-30 transform -translate-x-1/2 -translate-y-1/2">
                  <path fill="#FF0066" d="M44.1,-76.7C58.3,-68.2,71.6,-58.6,80.2,-45.7C88.7,-32.7,92.5,-16.3,91.8,-0.4C91,15.5,85.6,30.9,77.1,44C68.6,57.1,57,67.8,43.6,75.7C30.2,83.5,15.1,88.4,0.3,87.9C-14.6,87.5,-29.2,81.7,-43.4,74.3C-57.5,66.9,-71.2,58,-80.3,45.3C-89.3,32.7,-93.8,16.3,-92.6,0.7C-91.3,-14.9,-84.4,-29.8,-75.8,-43.2C-67.1,-56.7,-56.8,-68.6,-43.9,-77.8C-31,-87,-15.5,-93.5,-0.3,-93C15,-92.6,30,-85.2,44.1,-76.7Z" transform="translate(100 100)" />
                </svg>
              </div>

            ) : null}
          </DragOverlay>
        </main>

      </DndContext>
    </>
  )
}

export default userProfile