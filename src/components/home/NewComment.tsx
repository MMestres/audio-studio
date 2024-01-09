'use client'

import { useState } from 'react'
import CommentForm from './CommentForm'
import { useInView } from 'react-intersection-observer'

interface ComentariosSectionProps {
  linkTxt: string
  title: string
  text: string
  txtName: string
  txtMessage: string
  txtButton: string
}

export default function NewComment ({
  linkTxt, title, text, txtName, txtMessage, txtButton
}: ComentariosSectionProps) {
  const [open, setOpen] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return <>
  <div ref={ref} className={`text-right ${inView ? 'animatecss animatecss-fast animatecss-slideInUp' : ''} `}>
    <button className="transition-all duration-[0.8s] text-zinc-400 text-lg hover:text-zinc-100 hover:underline" onClick={() => { setOpen(true) }}>{linkTxt}</button>
  </div>
  <div className={`${open ? 'fixed inset-0' : 'hidden'}`}>
    <div className='fixed inset-[2vw] bottom-[calc(2vw+100px)] z-[9999] animatecss-fadeIn animatecss-fast bg-black/60 backdrop-blur-md rounded-lg border-3 border-black shadow-xl shadow-black/70'>
      <div className='grid place-content-center h-full gap-6 mx-auto'>
        <h4 className="w-[80vw] max-w-[600px] mx-auto text-xl font-bold text-white">{title}</h4>
        <div className='flex flex-col gap-2'>
          {text.split('\n').map((text, index) => <p key={index} className="w-[80vw] max-w-[600px] mx-auto text-md text-zinc-200">{text}</p>)}
        </div>
        <CommentForm txtName={txtName} txtMessage={txtMessage} txtButton={txtButton} onClose={() => { setOpen(false) }} />
      </div>
    </div>
  </div>
  </>
}
