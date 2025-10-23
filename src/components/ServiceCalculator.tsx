"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { formatPrice } from '@/lib/currency'
import { useUi } from '@/contexts/UiContext'
import { toast } from 'sonner'
import { 
  Calculator, 
  DollarSign, 
  Mail, 
  Plus, 
  Minus, 
  Zap,
  Info
} from 'lucide-react'

interface ServiceCalculatorProps {
  onSuccess?: () => void
}

type DirtinessLevel = 'leve' | 'media' | 'pesada' | 'manchas'
type DistanceZone   = 'centro' | 'fora' | 'periferia'

export default function ServiceCalculator({ onSuccess }: ServiceCalculatorProps) {
  // ▶ Dados do cliente
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '' // Endereço reativado
  })

  // ▶ Estado geral do orçamento
  const [budgetData, setBudgetData] = useState({
    category: '',
    serviceTypes: [] as string[],
    materialType: '',
    quantity: 1,
    observations: '',
    // campos especiais
    posObraCompartments: 1,
    limpezaGeralCompartments: 0,
    tapeteArea: 0,
    cadeirasQuantity: 1,
    impermeabilizacao: false,
    urgencia: false,
    poolSize: 'small',
    // novos (aplicação silenciosa)
    dirtiness: 'leve' as DirtinessLevel,
    distance: 'centro' as DistanceZone,
  })

  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)

  const { preselectedCategory, setPreselectedCategory } = useUi()

  // ▶ Categorias
  const categories = [
    { id: 'limpeza', name: 'Limpeza' },
    { id: 'manutencao', name: 'Manutenção & Reparação' },
    { id: 'climatizacao', name: 'Climatização' },
    { id: 'automovel', name: 'Automóvel' },
    { id: 'piscinas', name: 'Piscinas' }
  ]

  // ▶ Tamanhos de piscina
  const POOL_SIZES = [
    { id: 'small',  label: 'Pequena (até 20 m²)',  priceWash: 130000 },
    { id: 'medium', label: 'Média (20–40 m²)',     priceWash: 140000 },
    { id: 'large',  label: 'Grande (> 40 m²)',     priceWash: 150000 }
  ]

  // ▶ Serviços por categoria
  const servicesByCategory = {
    limpeza: [
      { id: 'limpeza-domestica', name: 'Limpeza doméstica', basePrice: 23750 },
      { id: 'pos-obra', name: 'Limpeza pós-obra', basePrice: 118750 },
      { id: 'escritorios', name: 'Escritórios e lojas', basePrice: 28500 },
      { id: 'sofas-colchoes', name: 'Lavagem de sofás e colchões', basePrice: 42750 },
      { id: 'vidros-fachadas', name: 'Limpeza de vidros e fachadas', basePrice: 11400 },
      { id: 'limpeza-geral', name: 'Limpeza geral de casa mobilada — base (T1)', basePrice: 47500 },
      { id: 'limpeza-tapetes', name: 'Limpeza de Tapetes', basePrice: 10000, unit: 'm²' },
      { id: 'higienizacao-cortinas', name: 'Higienização de Cortinas (par)', basePrice: 33000 },
      { id: 'higienizacao-colchao-solteiro', name: 'Higienização de Colchão Solteiro', basePrice: 30000 },
      { id: 'higienizacao-colchao-casal', name: 'Higienização de Colchão Casal', basePrice: 45000 },

      // itens profundos extras + adicional
      { id: 'higienizacao-sofa-2lugares', name: 'Higienização de Sofá 2 lugares', basePrice: 30000 },
      { id: 'higienizacao-sofa-3lugares', name: 'Higienização de Sofá 3 lugares', basePrice: 40000 },
      { id: 'higienizacao-chaise-canto', name: 'Higienização de Chaise / Canto', basePrice: 45000 },
      { id: 'higienizacao-cadeiras', name: 'Higienização de Cadeiras (unidade)', basePrice: 7000, unit: 'unidade' },

      { id: 'impermeabilizacao', name: 'Impermeabilização de Sofás e Colchões (adicional)', basePrice: 0, isAdditional: true },
    ],
    manutencao: [
      { id: 'reparacao-eletrica', name: 'Reparação elétrica', basePrice: 105000 },
      { id: 'reparacao-hidraulica', name: 'Reparação hidráulica', basePrice: 65000 },
      { id: 'instalacao-equipamentos', name: 'Instalação de equipamentos domésticos', basePrice: 75000 },
      { id: 'manutencao-maquinas', name: 'Manutenção de máquinas (lavar / frigoríficos)', basePrice: 80000 },
      { id: 'visita-diagnostico', name: 'Visita de diagnóstico técnico', basePrice: 60000 },
      { id: 'urgencia', name: 'Urgência (até 24h)', basePrice: 25000, isAdditional: true }
    ],
    climatizacao: [
      { id: 'instalacao-ac', name: 'Instalação de AC', basePrice: 76000 },
      { id: 'manutencao-preventiva', name: 'Manutenção preventiva', basePrice: 42750 },
      { id: 'higienizacao-recarga', name: 'Higienização e recarga de gás', basePrice: 33250 }
    ],
    automovel: [
      { id: 'lavagem-completa', name: 'Lavagem completa', basePrice: 23750 },
      { id: 'higienizacao-interna', name: 'Higienização interna', basePrice: 19000 },
      { id: 'limpeza-ac-auto', name: 'Limpeza de AC automóvel', basePrice: 19000 }
    ],
    piscinas: [
      { id: 'pool-wash', name: 'Lavagem e higienização (selecionar tamanho)', basePrice: 0, variableBySize: true },
      { id: 'pool-ph', name: 'Tratamento de água e verificação de pH', basePrice: 130000, addOnLarge: 20000 }
    ]
  }

  // ▶ Materiais
  const materialTypes = [
    { id: 'tecido',   name: 'Tecido comum',  multiplier: 1.00 },
    { id: 'couro',    name: 'Couro natural', multiplier: 1.15 },
    { id: 'napa',     name: 'Napa',          multiplier: 1.20 },
    { id: 'camurca',  name: 'Camurça',       multiplier: 1.20 },
    { id: 'madeira',  name: 'Madeira',       multiplier: 1.10 },
    { id: 'aluminio', name: 'Alumínio',      multiplier: 1.00 },
    { id: 'vidro',    name: 'Vidro',         multiplier: 1.00 },
    { id: 'azulejo',  name: 'Azulejo',       multiplier: 1.00 },
    { id: 'aco',      name: 'Aço inox',      multiplier: 1.10 }
  ]

  // ▶ Multiplicadores silenciosos (não aparecem para o cliente)
  const DIRTINESS_MULT: Record<DirtinessLevel, number> = {
    leve: 1.00,
    media: 1.10,
    pesada: 1.15,
    manchas: 1.20,
  }
  const DISTANCE_MULT: Record<DistanceZone, number> = {
    centro: 1.00,
    fora: 1.10,
    periferia: 1.15,
  }

  // Pré-seleção de categoria via contexto
  useEffect(() => {
    if (preselectedCategory && preselectedCategory !== budgetData.category) {
      setBudgetData(prev => ({
        ...prev,
        category: preselectedCategory,
        serviceTypes: [],
        poolSize: 'small'
      }))
      setPreselectedCategory(null)
    }
  }, [preselectedCategory, budgetData.category, setPreselectedCategory])

  // Descontos progressivos
  const calculateDiscount = (servicesCount: number) => {
    if (servicesCount >= 4) return 20
    if (servicesCount >= 3) return 15
    if (servicesCount >= 2) return 10
    return 0
  }

  // Regras especiais
  const calculatePosObraPrice = (basePrice: number, compartments: number) => {
    const additional = Math.max(0, compartments - 1)
    return basePrice + (additional * 14250)
  }
  const calculateLimpezaGeralPrice = (basePrice: number, additionalCompartments: number) => {
    return basePrice + (additionalCompartments * 12000)
  }
  const calculatePoolPrice = (serviceId: string, poolSize: string) => {
    if (serviceId === 'pool-wash') {
      const size = POOL_SIZES.find(s => s.id === poolSize)
      return size ? size.priceWash : 130000
    }
    if (serviceId === 'pool-ph') {
      const base = 130000
      return poolSize === 'large' ? base + 20000 : base
    }
    return 0
  }
  const isEligibleForImpermeabilization = (serviceId: string) => {
    const eligible = [
      'higienizacao-sofa-2lugares',
      'higienizacao-sofa-3lugares', 
      'higienizacao-chaise-canto',
      'higienizacao-colchao-solteiro',
      'higienizacao-colchao-casal'
    ]
    return eligible.includes(serviceId)
  }

  // ▶ Cálculo principal
  const calculatePrice = () => {
    if (!budgetData.serviceTypes.length || !budgetData.materialType) {
      setCalculatedPrice(0)
      setDiscount(0)
      setDiscountAmount(0)
      return
    }

    const material = materialTypes.find(m => m.id === budgetData.materialType)
    const services = servicesByCategory[budgetData.category as keyof typeof servicesByCategory] || []

    if (!material) return

    let total = 0
    let addImper = 0
    let addUrg  = 0

    budgetData.serviceTypes.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId)
      if (!service || service.isAdditional) return

      let price = service.basePrice

      if (service.id === 'pos-obra') {
        price = calculatePosObraPrice(service.basePrice, budgetData.posObraCompartments)
      } else if (service.id === 'limpeza-geral') {
        price = calculateLimpezaGeralPrice(service.basePrice, budgetData.limpezaGeralCompartments)
      } else if (service.id === 'limpeza-tapetes') {
        price = service.basePrice * Math.max(1, budgetData.tapeteArea)
      } else if (service.id === 'higienizacao-cadeiras') {
        price = service.basePrice * Math.max(1, budgetData.cadeirasQuantity)
      } else if (budgetData.category === 'piscinas' && (service.id === 'pool-wash' || service.id === 'pool-ph')) {
        price = calculatePoolPrice(service.id, budgetData.poolSize)
      } else {
        price = price * budgetData.quantity
      }

      // Material + Sujidade + Distância (silenciosos)
      price = price * material.multiplier
      price = price * DIRTINESS_MULT[budgetData.dirtiness]
      price = price * DISTANCE_MULT[budgetData.distance]

      total += price

      // adicional de impermeabilização (40%) se marcado e elegível
      if (budgetData.impermeabilizacao && isEligibleForImpermeabilization(service.id)) {
        addImper += price * 0.40
      }
    })

    total += addImper

    if (budgetData.category === 'manutencao' && budgetData.urgencia) {
      addUrg = 25000
      total += addUrg
    }

    const serviceCount = budgetData.serviceTypes.filter(id => id !== 'impermeabilizacao' && id !== 'urgencia').length
    const promo = calculateDiscount(serviceCount)
    const discountValue = (total * promo) / 100
    const finalPrice = total - discountValue

    setCalculatedPrice(Math.round(finalPrice))
    setDiscount(promo)
    setDiscountAmount(Math.round(discountValue))
  }

  useEffect(() => {
    calculatePrice()
  }, [budgetData])

  // Helpers
  const updateBudgetData = (field: string, value: any) => {
    setBudgetData(prev => ({ ...prev, [field]: value }))
  }
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  const handleServiceToggle = (serviceId: string) => {
    setBudgetData(prev => {
      const exists = prev.serviceTypes.includes(serviceId)
      const next = exists ? prev.serviceTypes.filter(id => id !== serviceId) : [...prev.serviceTypes, serviceId]

      if (serviceId === 'impermeabilizacao') {
        return { ...prev, serviceTypes: next, impermeabilizacao: !exists }
      }
      if (serviceId === 'urgencia') {
        return { ...prev, serviceTypes: next, urgencia: !exists }
      }
      return { ...prev, serviceTypes: next }
    })
  }
  const getServicesForCategory = () => {
    if (!budgetData.category) return []
    return servicesByCategory[budgetData.category as keyof typeof servicesByCategory] || []
  }
  const hasEligibleServicesForImpermeabilization = () => {
    return budgetData.serviceTypes.some(serviceId => isEligibleForImpermeabilization(serviceId))
  }
  const hasMaintenanceServicesSelected = () => {
    if (budgetData.category !== 'manutencao') return false
    return budgetData.serviceTypes.some(serviceId => serviceId !== 'urgencia')
  }
  const getPoolServiceDisplayPrice = (service: any) => {
    if (service.id === 'pool-wash') return 'Varia por tamanho'
    if (service.id === 'pool-ph') return `${formatPrice(service.basePrice)} (+ ${formatPrice(service.addOnLarge)} se Grande)`
    return formatPrice(service.basePrice)
  }

  // Envio por email
  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.address || 
        !budgetData.category || !budgetData.serviceTypes.length || !budgetData.materialType) {
      toast.error('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    try {
      const material = materialTypes.find(m => m.id === budgetData.materialType)
      const category = categories.find(c => c.id === budgetData.category)
      const services = servicesByCategory[budgetData.category as keyof typeof servicesByCategory] || []

      const selectedServices = budgetData.serviceTypes.map(serviceId => {
        const service = services.find(s => s.id === serviceId)
        if (service && !service.isAdditional) {
          let price = service.basePrice
          let details = ''
          
          if (service.id === 'pos-obra') {
            price = calculatePosObraPrice(service.basePrice, budgetData.posObraCompartments)
            details = ` (${budgetData.posObraCompartments} compartimentos)`
          } else if (service.id === 'limpeza-geral') {
            price = calculateLimpezaGeralPrice(service.basePrice, budgetData.limpezaGeralCompartments)
            details = budgetData.limpezaGeralCompartments > 0 ? ` (+${budgetData.limpezaGeralCompartments} compartimentos)` : ''
          } else if (service.id === 'limpeza-tapetes') {
            price = service.basePrice * Math.max(1, budgetData.tapeteArea)
            details = ` (${budgetData.tapeteArea} m²)`
          } else if (service.id === 'higienizacao-cadeiras') {
            price = service.basePrice * Math.max(1, budgetData.cadeirasQuantity)
            details = ` (${budgetData.cadeirasQuantity} unidades)`
          } else if (budgetData.category === 'piscinas' && (service.id === 'pool-wash' || service.id === 'pool-ph')) {
            price = calculatePoolPrice(service.id, budgetData.poolSize)
            const poolSizeLabel = POOL_SIZES.find(s => s.id === budgetData.poolSize)?.label || ''
            details = ` (${poolSizeLabel})`
          } else {
            price = price * budgetData.quantity
          }

          // material + silenciosos
          price = price * (material?.multiplier || 1)
          price = price * DIRTINESS_MULT[budgetData.dirtiness]
          price = price * DISTANCE_MULT[budgetData.distance]

          return `• ${service.name}${details}: ${formatPrice(price)}`
        }
        return ''
      }).filter(Boolean)

      if (budgetData.impermeabilizacao) {
        selectedServices.push('• Impermeabilização de Sofás e Colchões (+40% sobre itens elegíveis)')
      }
      if (budgetData.urgencia && budgetData.category === 'manutencao') {
        selectedServices.push('• Urgência (até 24h): +25.000 KZ')
      }

      const servicesList = selectedServices.join('\n')
      const totalBeforeDiscount = calculatedPrice + discountAmount

      let poolSizeInfo = ''
      if (budgetData.category === 'piscinas') {
        const label = POOL_SIZES.find(s => s.id === budgetData.poolSize)?.label || ''
        poolSizeInfo = `• Tamanho da Piscina: ${label}\n`
      }

      const resumo = `
NOVA SOLICITAÇÃO DE SERVIÇO - CALCULADORA DE ORÇAMENTO

DADOS DO CLIENTE:
• Nome: ${formData.name}
• Telefone: ${formData.phone}
• E-mail: ${formData.email}
• Endereço: ${formData.address}

RESUMO DO SERVIÇO:
• Categoria: ${category?.name}
${poolSizeInfo}• Serviços Selecionados:
${servicesList}
• Quantidade: ${budgetData.quantity} ${budgetData.quantity === 1 ? 'item' : 'itens'}
• Material: ${material?.name}
• Nível de Sujidade: ${budgetData.dirtiness}
• Distância: ${budgetData.distance}
${budgetData.observations ? `• Observações: ${budgetData.observations}` : ''}

CÁLCULO DE PREÇOS:
• Subtotal (sem desconto): ${formatPrice(totalBeforeDiscount)}
${discount > 0 ? `• Desconto aplicado (-${discount}%): -${formatPrice(discountAmount)}` : ''}
• VALOR FINAL COM DESCONTO: ${formatPrice(calculatedPrice)}

${discount > 0 ? 'Observação: Descontos válidos para pedidos com múltiplos serviços.' : ''}

---
Enviado através da Calculadora de Orçamento da EConex Group
      `.trim()

      const subject = encodeURIComponent('Nova Solicitação de Serviço - Calculadora de Orçamento')
      const body = encodeURIComponent(resumo)
      const mailtoLink = `mailto:suporte@econexgroup.com?subject=${subject}&body=${body}`

      window.location.href = mailtoLink
      
      toast.success('✅ Sua solicitação foi enviada com sucesso! Nossa equipe EConex Group entrará em contato via WhatsApp.')
      
      setFormData({ name: '', phone: '', email: '', address: '' })
      setBudgetData({
        category: '',
        serviceTypes: [],
        materialType: '',
        quantity: 1,
        observations: '',
        posObraCompartments: 1,
        limpezaGeralCompartments: 0,
        tapeteArea: 0,
        cadeirasQuantity: 1,
        impermeabilizacao: false,
        urgencia: false,
        poolSize: 'small',
        dirtiness: 'leve',
        distance: 'centro',
      })
      setCalculatedPrice(0)
      setDiscount(0)
      setDiscountAmount(0)

      onSuccess?.()
    } catch (err) {
      console.error(err)
      toast.error('❌ Erro ao enviar orçamento. Tente novamente.')
    }
  }

  return (
    <section id="calculadora-orcamento" className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Calculadora de Orçamento
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Obtenha um orçamento instantâneo. Selecione as opções e veja o preço em tempo real.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardTitle className="text-2xl flex items-center">
                <DollarSign className="h-6 w-6 mr-2" />
                Configure o seu Orçamento
              </CardTitle>
              <CardDescription className="text-blue-100">
                Preencha os campos abaixo para calcular o preço do seu serviço
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Dados pessoais */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Dados Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium">Nome Completo *</Label>
                      <Input id="name" value={formData.name} onChange={(e) => updateFormData('name', e.target.value)} placeholder="O seu nome completo" className="h-12" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base font-medium">Telefone *</Label>
                      <Input id="phone" value={formData.phone} onChange={(e) => updateFormData('phone', e.target.value)} placeholder="+244 920 000 000" className="h-12" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base font-medium">E-mail *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} placeholder="seuemail@exemplo.com" className="h-12" />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-base font-medium">Endereço Completo *</Label>
                      <Input id="address" value={formData.address} onChange={(e) => updateFormData('address', e.target.value)} placeholder="Cidade, bairro e rua" className="h-12" />
                    </div>
                  </div>
                </div>

                {/* Categoria */}
                <div>
                  <Label className="text-xl font-semibold text-gray-800 mb-4 block">🏷️ Categoria de Serviço *</Label>
                  <Select 
                    value={budgetData.category}
                    onValueChange={(value) => {
                      updateBudgetData('category', value)
                      updateBudgetData('serviceTypes', [])
                      updateBudgetData('poolSize', 'small')
                    }}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecione a categoria de serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Piscinas – tamanho */}
                {budgetData.category === 'piscinas' && (
                  <div>
                    <Label className="text-lg font-semibold text-gray-800 mb-3 block">🏊‍♂️ Tamanho da Piscina *</Label>
                    <Select value={budgetData.poolSize} onValueChange={(v) => updateBudgetData('poolSize', v)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione o tamanho da piscina" />
                      </SelectTrigger>
                      <SelectContent>
                        {POOL_SIZES.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Serviços */}
                {budgetData.category && (
                  <div>
                    <Label className="text-xl font-semibold text-gray-800 mb-4 block">
                      ✅ Serviços Desejados * (Selecione um ou mais)
                    </Label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getServicesForCategory().map((service) => {
                        // Visual: preço antigo riscado + “promo” -15% (apenas marketing)
                        const oldPrice = service.basePrice
                        const promoPrice = Math.round(oldPrice * 0.85)
                        const isSelected = budgetData.serviceTypes.includes(service.id)

                        return (
                          <div 
                            key={service.id} 
                            className={`flex items-center justify-between space-x-3 p-3 border rounded-lg transition-all duration-200 ${
                              isSelected ? 'border-green-500 bg-green-50' : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <Checkbox
                                id={service.id}
                                checked={isSelected}
                                onCheckedChange={() => handleServiceToggle(service.id)}
                                disabled={
                                  (service.id === 'impermeabilizacao' && !hasEligibleServicesForImpermeabilization()) ||
                                  (service.id === 'urgencia' && !hasMaintenanceServicesSelected())
                                }
                              />
                              <Label htmlFor={service.id} className="text-sm cursor-pointer flex-1">
                                {service.name}
                                {service.unit && ` (por ${service.unit})`}
                              </Label>
                            </div>

                            <div className="text-right">
                              {!service.isAdditional && budgetData.category !== 'piscinas' && (
                                <p className="text-sm text-red-500 line-through">{formatPrice(oldPrice)}</p>
                              )}
                              <p className="text-sm text-green-600 font-semibold">
                                {service.isAdditional 
                                  ? (service.id === 'impermeabilizacao' ? '+40%' : `+${formatPrice(service.basePrice)}`)
                                  : budgetData.category === 'piscinas'
                                    ? getPoolServiceDisplayPrice(service)
                                    : formatPrice(promoPrice)
                                }
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Banner de promoção ativa */}
                    {budgetData.serviceTypes.length >= 2 && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-5 w-5 text-green-600" />
                          <span className="text-green-700 font-semibold">
                            🎉 Promoção Ativa: {budgetData.serviceTypes.length >= 4 ? '20%' : budgetData.serviceTypes.length >= 3 ? '15%' : '10%'} de desconto por múltiplos serviços!
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Explicativo para Limpeza */}
                {budgetData.category === 'limpeza' && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800 space-y-2">
                        <p><strong>🔹 Limpeza geral:</strong> foca em superfícies e organização.</p>
                        <p><strong>🔹 Higienização profunda:</strong> lavagem e desinfecção profissional de estofados, colchões, cortinas…</p>
                        <p>Para adicionar higienização de itens específicos, selecione-os na lista.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pós-obra */}
                {budgetData.serviceTypes.includes('pos-obra') && (
                  <div>
                    <Label className="text-lg font-semibold text-gray-800 mb-3 block">🏠 Número de Compartimentos (Pós-Obra) *</Label>
                    <div className="flex items-center space-x-3">
                      <Button type="button" variant="outline" size="sm" onClick={() => updateBudgetData('posObraCompartments', Math.max(1, budgetData.posObraCompartments - 1))} className="h-12 w-12">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input type="number" min="1" value={budgetData.posObraCompartments} onChange={(e) => updateBudgetData('posObraCompartments', Math.max(1, parseInt(e.target.value) || 1))} className="h-12 text-center" />
                      <Button type="button" variant="outline" size="sm" onClick={() => updateBudgetData('posObraCompartments', budgetData.posObraCompartments + 1)} className="h-12 w-12">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Valor base: {formatPrice(118750)} (1 compartimento) + {formatPrice(14250)} por compartimento adicional.
                    </p>
                  </div>
                )}

                {/* Limpeza geral – adicionais */}
                {budgetData.serviceTypes.includes('limpeza-geral') && (
                  <div>
                    <Label className="text-lg font-semibold text-gray-800 mb-3 block">🏡 Compartimentos Adicionais (Limpeza Geral) *</Label>
                    <div className="flex items-center space-x-3">
                      <Button type="button" variant="outline" size="sm" onClick={() => updateBudgetData('limpezaGeralCompartments', Math.max(0, budgetData.limpezaGeralCompartments - 1))} className="h-12 w-12">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input type="number" min="0" value={budgetData.limpezaGeralCompartments} onChange={(e) => updateBudgetData('limpezaGeralCompartments', Math.max(0, parseInt(e.target.value) || 0))} className="h-12 text-center" />
                      <Button type="button" variant="outline" size="sm" onClick={() => updateBudgetData('limpezaGeralCompartments', budgetData.limpezaGeralCompartments + 1)} className="h-12 w-12">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        💡 <strong>Base incluída (T1):</strong> {formatPrice(47500)}
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        <strong>Compartimentos adicionais:</strong> {formatPrice(12000)} cada
                      </p>
                    </div>
                  </div>
                )}

                {/* Tapetes – área */}
                {budgetData.serviceTypes.includes('limpeza-tapetes') && (
                  <div>
                    <Label className="text-lg font-semibold text-gray-800 mb-3 block">📐 Área do Tapete (m²) *</Label>
                    <div className="flex items-center space-x-3">
                      <Button type="button" variant="outline" size="sm" onClick={() => updateBudgetData('tapeteArea', Math.max(1, budgetData.tapeteArea - 1))} className="h-12 w-12">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input type="number" min="1" step="0.5" value={budgetData.tapeteArea} onChange={(e) => updateBudgetData('tapeteArea', Math.max(1, parseFloat(e.target.value) || 1))} className="h-12 text-center" />
                      <Button type="button" variant="outline" size="sm" onClick={() => updateBudgetData('tapeteArea', budgetData.tapeteArea + 1)} className="h-12 w-12">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Preço: {formatPrice(10000)} por m² • Subtotal: {formatPrice(10000 * Math.max(1, budgetData.tapeteArea))}
                    </p>
                  </div>
                )}

                {/* Cadeiras – quantidade */}
                {budgetData.serviceTypes.includes('higienizacao-cadeiras') && (
                  <div>
                    <Label className="text-lg font-semibold text-gray-800 mb-3 block">🪑 Quantidade de Cadeiras *</Label>
                    <div className="flex items-center space-x-3">
                      <Button type="button" variant="outline" size="sm" onClick={() => updateBudgetData('cadeirasQuantity', Math.max(1, budgetData.cadeirasQuantity - 1))} className="h-12 w-12">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input type="number" min="1" value={budgetData.cadeirasQuantity} onChange={(e) => updateBudgetData('cadeirasQuantity', Math.max(1, parseInt(e.target.value) || 1))} className="h-12 text-center" />
                      <Button type="button" variant="outline" size="sm" onClick={() => updateBudgetData('cadeirasQuantity', budgetData.cadeirasQuantity + 1)} className="h-12 w-12">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Preço: {formatPrice(7000)} por unidade • Subtotal: {formatPrice(7000 * Math.max(1, budgetData.cadeirasQuantity))}
                    </p>
                  </div>
                )}

                {/* Quantidade (geral) */}
                {!budgetData.serviceTypes.includes('pos-obra') && 
                 !budgetData.serviceTypes.includes('limpeza-geral') && 
                 !budgetData.serviceTypes.includes('limpeza-tapetes') &&
                 !budgetData.serviceTypes.includes('higienizacao-cadeiras') &&
                 budgetData.category !== 'piscinas' &&
                 budgetData.serviceTypes.length > 0 && (
                  <div>
                    <Label className="text-lg font-semibold text-gray-800 mb-3 block">🔢 Quantidade *</Label>
                    <div className="flex items-center space-x-3">
                      <Button type="button" variant="outline" size="sm" onClick={() => updateBudgetData('quantity', Math.max(1, budgetData.quantity - 1))} className="h-12 w-12">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input type="number" min="1" value={budgetData.quantity} onChange={(e) => updateBudgetData('quantity', Math.max(1, parseInt(e.target.value) || 1))} className="h-12 text-center" />
                      <Button type="button" variant="outline" size="sm" onClick={() => updateBudgetData('quantity', budgetData.quantity + 1)} className="h-12 w-12">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Tipo de Material */}
                {budgetData.serviceTypes.length > 0 && (
                  <div>
                    <Label className="text-lg font-semibold text-gray-800 mb-3 block">🧱 Tipo de Material *</Label>
                    <Select value={budgetData.materialType} onValueChange={(v) => updateBudgetData('materialType', v)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione o tipo de material" />
                      </SelectTrigger>
                      <SelectContent>
                        {materialTypes.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Nível de Sujidade (silencioso nas labels) */}
                {budgetData.serviceTypes.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-lg font-semibold text-gray-800 mb-3 block">Nível de Sujidade *</Label>
                      <Select value={budgetData.dirtiness} onValueChange={(v: DirtinessLevel) => updateBudgetData('dirtiness', v)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leve">Leve</SelectItem>
                          <SelectItem value="media">Média</SelectItem>
                          <SelectItem value="pesada">Pesada</SelectItem>
                          <SelectItem value="manchas">Com manchas difíceis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-lg font-semibold text-gray-800 mb-3 block">Distância *</Label>
                      <Select value={budgetData.distance} onValueChange={(v: DistanceZone) => updateBudgetData('distance', v)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Selecione a distância" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="centro">Centro</SelectItem>
                          <SelectItem value="fora">Fora do Centro</SelectItem>
                          <SelectItem value="periferia">Periferia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Observações */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">📝 Observações Adicionais (opcional)</Label>
                  <Textarea value={budgetData.observations} onChange={(e) => updateBudgetData('observations', e.target.value)} placeholder="Descreva detalhes importantes, horários, referências..." className="min-h-[100px]" />
                </div>

                {/* Total */}
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Preço Total Estimado</h3>

                    {calculatedPrice > 0 && (
                      <div className="space-y-3 mb-4">
                        <div className="text-lg text-gray-600">
                          Subtotal (sem desconto): <span className="font-semibold">{formatPrice(calculatedPrice + discountAmount)}</span>
                        </div>
                        {discount > 0 && (
                          <div className="text-lg text-red-600">
                            Desconto aplicado (-{discount}%): <span className="font-semibold">-{formatPrice(discountAmount)}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-3xl font-bold text-green-600">
                      {calculatedPrice.toLocaleString("pt-AO", { style: "currency", currency: "AOA", minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace("AOA", "KZ")}
                    </p>
                    <p className="text-gray-600">
                      {calculatedPrice > 0 ? 'Valor final com desconto' : 'Selecione as opções acima para ver o preço'}
                    </p>

                    {calculatedPrice > 0 && (
                      <div className="mt-4 text-sm text-gray-500">
                        <p>💡 Descontos automáticos: 10% para 2 serviços, 15% para 3, 20% para 4+.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <Button 
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.phone || !formData.email || !formData.address || 
                              !budgetData.category || !budgetData.serviceTypes.length || !budgetData.materialType}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg px-12 py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Solicitar Serviço
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    As suas informações serão enviadas para suporte@econexgroup.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
