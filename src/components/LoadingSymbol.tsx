import { Loader2 } from 'lucide-react'
import Logo2WhiteOutlined from './icons/Logo2WhiteOutlined'
import Loading from '@/assets/images/loading.svg'
import SvgLoading from './icons/Loading'
import React from 'react'
import SvgLogo2WhiteOutlinedMin from './icons/Logo2WhiteOutlinedMin'

function LoadingSymbol() {
  return (
    <div className='flex justify-center items-center pt-15'>
      <SvgLoading className="w-40 h-40 animate-spin origin-center [animation-duration:2s]"/>
    </div>
  )
}

export default LoadingSymbol