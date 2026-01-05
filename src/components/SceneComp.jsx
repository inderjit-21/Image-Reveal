import { useAspect, useTexture } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
// import Vertex from '@/shaders/Vertex.glsl'
// import Fragment from '@/shaders/Fragment.glsl'
import {Vertex, Fragment} from '@/shaders/RevealShader.jsx'
import { useFrame } from '@react-three/fiber'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SceneComp = () => {
    const texture = useTexture('/product.webp');
    const materialRef = useRef();

    const scale = useAspect(
        texture.image.width,
        texture.image.height,
        0.3
    )

    useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  useEffect(()=>{
    gsap.to(materialRef.current.uniforms.uReveal,{
        value:1.05,
        ease: 'none',
        scrollTrigger:{
            trigger:'.mainCont',
            start:'top top',
            end:'bottom bottom',
            scrub:true,
            // markers:true
        }
    })
  },)

  return (
    <mesh scale={scale}>
      <planeGeometry args={[1,1,40,40]} />
      <shaderMaterial 
      ref={materialRef}
      vertexShader={Vertex}
      fragmentShader={Fragment}
      uniforms={{
        uTexture:{value:texture},
        uTime:{value:0},
        uReveal:{value:0.0}
      }}
      />
    </mesh>
  )
}

export default SceneComp
