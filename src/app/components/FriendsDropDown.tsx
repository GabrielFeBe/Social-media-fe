'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface Props {
  children: ReactNode
}

export default function FriendsDropDown({ children }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  const botaoRef = useRef<HTMLButtonElement>(null)

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
    <div className="relative bg-white">
      <button ref={botaoRef} onClick={() => setIsVisible(!isVisible)}>
        Friends
      </button>
      {isVisible ? <div className="absolute bg-white">{children}</div> : null}
    </div>
  )
}
