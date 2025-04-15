'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'

const Modal = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
      dialogRef.current?.scrollTo({
        top: 0,
      })
    }
  }, [])
  return createPortal(
    <dialog
      className="w-full max-w-2xl  mx-auto p-6 rounded-lg shadow-xl bg-white dark:bg-gray-800 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      onClick={(e) => {
        if ((e.target as any).nodeName === 'DIALOG') {
          router.back()
        }
      }}
      onClose={() => {
        router.back()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          router.back()
        }
      }}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  )
}

export default Modal
