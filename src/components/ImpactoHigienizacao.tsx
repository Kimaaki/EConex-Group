"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImpactoHigienizacaoProps {
  onSolicitarServico: () => void
}

export default function ImpactoHigienizacao({ onSolicitarServico }: ImpactoHigienizacaoProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Pares de comparação ANTES/DEPOIS com diversidade étnica
  const slidesPairs = [
    {
      antes: {
        url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
        alt: 'Sofá manchado e sujo com pessoa desconfortável',
        texto: "⚠️ Não deixe para depois: o seu lar é o seu primeiro conforto."
      },
      depois: {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
        alt: 'Pessoa feliz em sala limpa e organizada',
        texto: "✨ Viver num ambiente limpo é viver com saúde e tranquilidade."
      }
    },
    {
      antes: {
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        alt: 'Cozinha suja e desorganizada com pessoa preocupada',
        texto: "🚿 O conforto e a higiene que o seu espaço merece — cuide hoje!"
      },
      depois: {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
        alt: 'Pessoa sorrindo em cozinha limpa e moderna',
        texto: "💚 Mais saúde, mais bem-estar, mais confiança."
      }
    },
    {
      antes: {
        url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
        alt: 'Quarto desarrumado com pessoa cansada e irritada',
        texto: "⚠️ Ambientes sujos afetam a sua energia e disposição diária."
      },
      depois: {
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        alt: 'Pessoa relaxada em quarto limpo e aconchegante',
        texto: "✨ Desperte renovado num ambiente limpo e harmonioso."
      }
    },
    {
      antes: {
        url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop',
        alt: 'Casa de banho suja com pessoa demonstrando desconforto',
        texto: "🚨 Casas de banho mal higienizadas são focos de bactérias e doenças."
      },
      depois: {
        url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop',
        alt: 'Pessoa satisfeita em casa de banho impecável e moderna',
        texto: "💚 Higiene completa para a sua família se sentir protegida."
      }
    },
    {
      antes: {
        url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
        alt: 'Escritório bagunçado com funcionário stressado',
        texto: "⚠️ Ambientes de trabalho sujos reduzem produtividade e motivação."
      },
      depois: {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        alt: 'Equipa feliz em escritório limpo e organizado',
        texto: "✨ Espaços profissionais limpos inspiram sucesso e bem-estar."
      }
    },
    {
      antes: {
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        alt: 'Restaurante com manchas e pessoa preocupada',
        texto: "🚨 Estabelecimentos sujos afastam clientes e prejudicam negócios."
      },
      depois: {
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
        alt: 'Cliente satisfeito em restaurante impecável',
        texto: "💚 Ambientes higienizados atraem mais clientes e confiança."
      }
    }
  ]

  // Criar array linear alternando antes/depois
  const allSlides = []
  slidesPairs.forEach(pair => {
    allSlides.push({ ...pair.antes, type: 'antes' })
    allSlides.push({ ...pair.depois, type: 'depois' })
  })

  // Auto-slide a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [allSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allSlides.length) % allSlides.length)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              🧼 Riscos e Benefícios da Higienização do Seu Espaço
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja a diferença que a higienização profissional pode fazer no seu ambiente e na sua qualidade de vida
            </p>
          </div>

          {/* Carrossel de Imagens */}
          <div className="relative mb-12">
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
              {allSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                    index === currentSlide 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <div
                    className="h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${slide.url})` }}
                  >
                    {/* Overlay sutil sem filtros coloridos */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                    
                    {/* Conteúdo sobreposto */}
                    <div className="relative h-full flex items-center justify-center text-center text-white px-6">
                      <div className="max-w-4xl">
                        {slide.type === 'antes' ? (
                          <div className="animate-fade-in">
                            <h3 className="text-2xl md:text-4xl font-bold mb-4 text-red-100">
                              ⚠️ Ambiente Mal Higienizado
                            </h3>
                            <p className="text-lg md:text-xl text-white mb-6">
                              {slide.texto}
                            </p>
                            <div className="bg-red-600/80 backdrop-blur-sm rounded-lg p-4 inline-block">
                              <p className="text-white font-semibold">
                                Não deixe a sua família ou negócio em risco!
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="animate-fade-in">
                            <h3 className="text-2xl md:text-4xl font-bold mb-4 text-green-100">
                              ✨ Ambiente Limpo e Saudável
                            </h3>
                            <p className="text-lg md:text-xl text-white mb-6">
                              {slide.texto}
                            </p>
                            <div className="bg-green-600/80 backdrop-blur-sm rounded-lg p-4 inline-block">
                              <p className="text-white font-semibold">
                                Invista na qualidade de vida do seu espaço!
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles do Carrossel */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Próximo slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicadores de Slide */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {allSlides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Frases Motivacionais Melhoradas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "⚠️ Não deixe para depois: o seu lar é o seu primeiro conforto."
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "✨ Viver num ambiente limpo é viver com saúde e tranquilidade."
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "🚿 O conforto e a higiene que o seu espaço merece — cuide hoje!"
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "💚 Mais saúde, mais bem-estar, mais confiança."
              </p>
            </div>
          </div>

          {/* Chamada Principal de Urgência */}
          <div className="text-center bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 rounded-2xl shadow-2xl mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🚨 Não deixe para depois! O seu lar é o seu primeiro conforto.
            </h3>
            <p className="text-xl mb-6">
              Cuide dele com quem entende de limpeza profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-lg font-semibold">
                ⏰ Cada dia sem higienização é um risco à sua saúde
              </div>
            </div>
          </div>

          {/* Chamada à Ação */}
          <div className="text-center">
            <Button 
              onClick={onSolicitarServico}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-xl px-12 py-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform"
            >
              <span className="mr-3">🧼</span>
              Solicitar Higienização Agora
              <span className="ml-3">✨</span>
            </Button>
            <p className="text-gray-600 mt-4 text-lg">
              Transforme o seu espaço num ambiente saudável e acolhedor hoje mesmo!
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  )
}