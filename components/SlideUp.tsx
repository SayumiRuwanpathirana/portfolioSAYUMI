"use client" // this is a client component

import React, { useEffect, useRef, ReactNode } from "react"
interface Props {
  offset?: string
  children?: ReactNode
  // any props that come into the component
}

export default function SlideUp({ children, offset = "0px" }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0")
            entry.target.classList.add("animate-slideUpCubiBezier")
          }
        })
      },
      { rootMargin: offset }
    )

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef)
    }

    // Cleanup the observer on component unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [offset]) // Include 'offset' in the dependency array

  return (
    <div ref={ref} className="relative opacity-0">
      {children}
    </div>
  )
}