import React from 'react'
import LogoutBtn from './LogoutBtn'
import Logo from '@/assets/images/logo2.svg'
import BookPortal from './BookPortal'
import Link from 'next/link'
import NavbarBg from '@/assets/images/bg_navbar.svg'


function Navbar() {
  return (
    <nav className='relative flex inset-x-0 justify-between text-background gap-10 p-1 bg-foreground'>
      <NavbarBg className="absolute right-0 left-0 top-0 text-nav-detail"/>
      <Link href={"/"} className='flex relative z-2 gap-1 items-center'>
        <Logo className="w-24 h-24" />
        <h4 className='font-[graveDigger]'>Biblio<span>peritus</span></h4>
      </Link>

      <div className='flex relative z-2 gap-6 items-center pr-5'>
        <BookPortal />
        <LogoutBtn />
        <Link href={"/user"}><h5>Profile</h5></Link>
      </div>

    </nav>
  )
}

export default Navbar