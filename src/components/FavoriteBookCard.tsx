import { FavoriteBook } from '@/types/types'
import { useDraggable } from '@dnd-kit/core'
import CoverPlaceholder from '@/assets/images/no_cover_placeholder.svg'
import React, { useState } from 'react'

function FavoriteBookCard({ favoriteBook }: { favoriteBook: FavoriteBook }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: favoriteBook.key,
  })

  const [clickOrigin, setClickOrigin] = useState("center center");

  function handleMouseClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;
    setClickOrigin(`${originX}% ${originY}%`);
  }

  return (
    <div
      ref={setNodeRef} {...listeners} {...attributes}
      onMouseDown={handleMouseClick}
      style={{ transformOrigin: clickOrigin }}
      className={`relative flex flex-col justify-center items-center text-center border-1 p-4 bg-background/90 border-foreground w-full h-full ${isDragging ? "scale-0" : "scale-100"} transition duration-200 ease-in-out`}>
       {
          favoriteBook.cover_url ?
          <img className="w-60 h-90" src={favoriteBook.cover_url}></img> 
          : <CoverPlaceholder className="w-50 h-80 text-background" />
        }
          <h5 className='pt-5 text-[1.3rem]'>{favoriteBook.title}</h5>
      {/* <p className='text-[1rem]'>{favoriteBook.description}</p> */}
        <div 
        style={{transformOrigin: clickOrigin}}
        className={`absolute z-20 top-0 bottom-0 left-0 right-0 bg-foreground shadow-[-1px_0px_20px_22px_rgb(255,_249,_239)]
         ${isDragging ? "scale-100" : "scale-0"} transition duration-200 ease-in-out`}></div>
    </div>
  )
}

export default FavoriteBookCard