import React from 'react'
import LogoutBtn from './LogoutBtn'
import Logo from '@/assets/images/logo2.svg'
import BookPortal from './BookPortal'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className='flex justify-between text-background gap-10 p-1 bg-foreground'>
      <Link href={"/"} className='flex gap-1 items-center'>
        <Logo className="w-22 h-22" />
        <h4>Biblio<span>peritus</span></h4>
      </Link>

      <div className='flex gap-6 items-center pr-5'>
        <BookPortal />
        <LogoutBtn />
        <Link href={"/user"}><h5>Profile</h5></Link>
      </div>

    </nav>
  )
}

export default Navbar