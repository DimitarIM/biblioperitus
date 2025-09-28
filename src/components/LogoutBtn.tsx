"use client"

import { authClient } from '@/lib/auth/auth-client'
import React from 'react'
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

function LogoutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    const { data } = await authClient.signOut();
    if (data?.success) router.push("/login");
  }

  return (
    <button onClick={handleLogout} className='flex justify-center items-center gap-2 cursor-pointer'>
      <h5 className='hidden sm:block [word-spacing:-1px] text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]'>Log out</h5>
      <LogOutIcon className='sm:size-4 md:size-6' />
    </button>
  )
}

export default LogoutBtn