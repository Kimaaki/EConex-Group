"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Language } from '@/lib/i18n'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  const languages = [
    { code: 'pt', flag: '🇵🇹', label: 'PT', color: 'bg-green-600' },
    { code: 'es', flag: '🇪🇸', label: 'ES', color: 'bg-red-600' },
    { code: 'en', flag: '🇬🇧', label: 'EN', color: 'bg-blue-600' },
    { code: 'fr', flag: '🇫🇷', label: 'FR', color: 'bg-blue-700' },
    { code: 'it', flag: '🇮🇹', label: 'IT', color: 'bg-green-700' }
  ]

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-2">
      <div className="flex items-center space-x-1">
        {languages.map((lang, index) => (
          <React.Fragment key={lang.code}>
            <button
              onClick={() => handleLanguageChange(lang.code as Language)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                language === lang.code
                  ? `${lang.color} text-white shadow-md`
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
              aria-label={lang.label}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
            
            {index < languages.length - 1 && (
              <div className="w-px h-6 bg-gray-300" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}