import { Loader2 } from 'lucide-react'
import Logo2WhiteOutlined from './icons/Logo2WhiteOutlined'
import Loading from '@/assets/images/loading.svg'
import SvgLoading from './icons/Loading'
import React from 'react'
import SvgLogo2WhiteOutlinedMin from './icons/Logo2WhiteOutlinedMin'

function LoadingSymbol() {
  return (
    <SvgLoading className="w-100 h-100 animate-spin [animation-duration:2s]"/>
  )
}

export default LoadingSymbol