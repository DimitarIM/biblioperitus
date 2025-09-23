import React, { useEffect } from 'react'
import Portal from '@/assets/images/book_portal.svg'
import Portal2 from '@/assets/images/book_portal2.svg'
import { useDroppable } from '@dnd-kit/core'


function BookPortal() {
    const { isOver, setNodeRef } = useDroppable({
    id: 'book_portal',
  })

  useEffect(()=>{
    console.log(isOver);
  },[isOver])
  return (
    <div ref={setNodeRef} >
          <Portal2 className={`w-20 h-20 text-background transition duration-300 ease-in-out ${isOver ? "animate-spin scale-[110%]" : "animate-pulse"}`}/>
    </div>

  )
}

export default BookPortal