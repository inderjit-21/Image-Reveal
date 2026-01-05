'use client'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import SceneComp from './SceneComp'

const HeroSection = () => {
  return (
    <div className='w-full h-screen sticky top-0 left-0 z-30'>
      <div className='w-fit h-fit max-lg:hidden text-[1.5rem] leading-[1.5rem] text-[#91531d] z-50 tracking-tight absolute top-1/2 left-[10%] -translate-y-1/2'>
      PRODUCT
      </div>
      <div className='w-fit h-fit max-lg:hidden text-[1.5rem] leading-[1.5rem] text-[#91531d] z-50 tracking-tight absolute top-1/2 right-[10%] -translate-y-1/2'>
      REVEAL
      </div>
     <Canvas className='w-full h-screen'>
        <SceneComp />
     </Canvas>
    </div>
  )
}

export default HeroSection
