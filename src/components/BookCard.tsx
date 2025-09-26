import { Book } from '@/types/types'
import { useDraggable } from '@dnd-kit/core'
import React from 'react'
import CoverPlaceholder from '@/assets/images/no_cover_placeholder.svg'


function BookCard({book}:{book:Book}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: book.key,
  })


  return (
    <div
    ref={setNodeRef} {... listeners} {...attributes}
    className={`flex flex-col justify-center items-center text-center border-1 p-4 bg-background/90 border-foreground w-full h-full ${isDragging ? "opacity-0 scale-0" : "opacity-100 scale-100"} transition duration-200 ease-in-out`}>
      {
        book.cover_url ? <img className="w-60 h-90" src={book.cover_url}></img> : <CoverPlaceholder className="w-50 h-80 text-background"/>
      }
      <h5 className='pt-5 text-[1.3rem]'>{book.title}</h5>
      <p className='text-[1rem]'>{book.author_name}</p>
    </div>
  )
}

export default BookCard