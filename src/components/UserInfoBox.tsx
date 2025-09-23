import { useProfileContext } from '@/store/useProfileContext'
import React, { useEffect } from 'react'
import BookCard from './BookCard';

function UserInfoBox() {
  const ctx = useProfileContext();
  if (!ctx) return <div>Loading...</div>

  const { biblioUser } = ctx;

  return (
    <div>
      {biblioUser?.name}
    </div>
  )
}

export default UserInfoBox