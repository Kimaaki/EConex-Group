"use client"

import React from 'react'

export default function LanguageSelector() {
  const languages = [
    { code: 'pt', flag: '🇵🇹', label: 'PT', color: 'bg-green-600' },
    { code: 'es', flag: '🇪🇸', label: 'ES', color: 'bg-red-600' }
  ]

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-2">
      <div className="flex items-center space-x-1">
        {languages.map((lang, index) => (
          <React.Fragment key={lang.code}>
            <div
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 cursor-default"
              aria-label={lang.label}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </div>
            
            {index < languages.length - 1 && (
              <div className="w-px h-6 bg-gray-300" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}