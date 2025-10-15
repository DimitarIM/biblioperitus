import SvgLoading from './icons/Loading'
import React from 'react'

function LoadingSymbol() {
  return (
    <div className='flex justify-center items-center pt-15'>
      <SvgLoading className="w-40 h-40 animate-spin origin-center [animation-duration:2s]"/>
    </div>
  )
}

export default LoadingSymbol