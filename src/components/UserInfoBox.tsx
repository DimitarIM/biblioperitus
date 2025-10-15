import { useProfileContext } from '@/context/useProfileContext'
import React from 'react'

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