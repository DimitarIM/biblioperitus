import { FavoriteBook } from '@/types/types'
import { useDraggable } from '@dnd-kit/core'
import CoverPlaceholder from '@/assets/images/no_cover_placeholder.svg'
import React from 'react'

function FavoriteBookCard({favoriteBook}:{favoriteBook:FavoriteBook}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: favoriteBook.key,
  })


  return (
    <div
    ref={setNodeRef} {... listeners} {...attributes}
    className={`flex flex-col justify-center items-center text-center ${isDragging ? "opacity-0 scale-0" : "opacity-100 scale-100"} transition duration-200 ease-in-out`}>
      {
        favoriteBook.cover_url ? <img src={favoriteBook.cover_url}></img>
        : <CoverPlaceholder className="w-50 h-80 text-background"/>
      }
      <h5>{favoriteBook.title}</h5>
    </div>
  )
}

export default FavoriteBookCard