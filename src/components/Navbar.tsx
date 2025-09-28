import React from 'react'
import LogoutBtn from './LogoutBtn'
import Logo from '@/assets/images/logo2.svg'
import BookPortal from './BookPortal'
import Link from 'next/link'
import NavbarBg from '@/assets/images/bg_navbar.svg'
import SvgProfileIconPlaceholder from './icons/ProfileIconPlaceholder'
import { Book, FavoriteBook } from '@/types/types'


function Navbar({ activeBook }: { activeBook: Book | FavoriteBook | null }) {
  return (
    <nav className='fixed z-20 flex inset-x-0 justify-between text-background gap-8 sm:gap-10 p-1 bg-foreground shadow-[-1px_0px_20px_22px_rgb(255,_249,_239)] pt-2'>
      <NavbarBg className="absolute right-0 left-0 top-0 text-nav-detail pointer-events-none" />
      <Link href={"/"} className='flex relative z-2 gap-1 items-center'>
        <Logo className="w-12 h-12 sm:w-16 sm:h-16 md:w-22 md:h-22" />
        <h4 className='font-[graveDigger] text-[0.9rem] sm:text-[1.6rem] md:text-[2.4rem]'>Biblio<span className='text-detail'>peritus</span></h4>
      </Link>

      <div className='flex relative z-2 gap-4 sm:gap-6 md:gap-10 items-center pr-5'>
        <div className='flex gap-2 md:gap-5 justify-center items-center'>
          <BookPortal />
          <Link href={"/user"} className='w-7 h-7 sm:w-10 sm:h-10 md:w-13 md:h-13'>
            <SvgProfileIconPlaceholder className="w-full h-full text-background" /></Link>
        </div>

        <LogoutBtn />
      </div>

    </nav>
  )
}

export default Navbar;