"use client"

import { useEffect, useState } from 'react'

export function useBannerRotation(totalBanners: number, intervalMs: number = 5000) {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % totalBanners)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [totalBanners, intervalMs])

  return { currentBanner, setCurrentBanner }
}