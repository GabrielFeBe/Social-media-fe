'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface Props {
  children: ReactNode
  title: string
}

export default function FriendsDropDown({ children, title }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  const botaoRef = useRef<HTMLButtonElement & HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        botaoRef.current &&
        !botaoRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={botaoRef} className="relative bg-white">
      <button ref={botaoRef} onClick={() => setIsVisible(!isVisible)}>
        {title}
      </button>
      {isVisible ? <div className="absolute bg-white">{children}</div> : null}
    </div>
  )
}
