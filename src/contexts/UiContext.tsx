"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UiContextType {
  calculatorOpen: boolean
  preselectedCategory: string | null
  setCalculatorOpen: (open: boolean) => void
  setPreselectedCategory: (category: string | null) => void
  openCalculatorWithCategory: (categoryId: string) => void
  scrollToCalculator: () => void
}

const UiContext = createContext<UiContextType | undefined>(undefined)

export function UiProvider({ children }: { children: ReactNode }) {
  const [calculatorOpen, setCalculatorOpen] = useState(false)
  const [preselectedCategory, setPreselectedCategory] = useState<string | null>(null)

  const openCalculatorWithCategory = (categoryId: string) => {
    setCalculatorOpen(true)
    setPreselectedCategory(categoryId)
  }

  const scrollToCalculator = () => {
    const el = document.querySelector('#calculadora-orcamento')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <UiContext.Provider
      value={{
        calculatorOpen,
        preselectedCategory,
        setCalculatorOpen,
        setPreselectedCategory,
        openCalculatorWithCategory,
        scrollToCalculator,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}

export function useUi() {
  const context = useContext(UiContext)
  if (context === undefined) {
    throw new Error('useUi must be used within a UiProvider')
  }
  return context
}