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
  CheckCircle,
  Info
} from 'lucide-react'

interface ServiceCalculatorProps {
  onSuccess?: () => void
}

export default function ServiceCalculator({ onSuccess }: ServiceCalculatorProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  })

  const [budgetData, setBudgetData] = useState({
    category: '',
    serviceTypes: [] as string[],
    materialType: '',
    quantity: 1,
    observations: '',
    poolSize: 'small',
    sujidade: '',        // 🔹 novo campo
    distancia: ''        // 🔹 novo campo
  })

  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)

  const { preselectedCategory, setPreselectedCategory } = useUi()

  const categories = [
    { id: 'limpeza', name: 'Limpeza' },
    { id: 'manutencao', name: 'Manutenção & Reparação' },
    { id: 'climatizacao', name: 'Climatização' },
    { id: 'automovel', name: 'Automóvel' },
    { id: 'piscinas', name: 'Piscinas' }
  ]

  const POOL_SIZES = [
    { id: 'small', label: 'Pequena (até 20 m²)', priceWash: 130000 },
    { id: 'medium', label: 'Média (20–40 m²)', priceWash: 140000 },
    { id: 'large', label: 'Grande (> 40 m²)', priceWash: 150000 }
  ]

  const servicesByCategory = {
    limpeza: [
      { id: 'limpeza-domestica', name: 'Limpeza doméstica', basePrice: 23750 },
      { id: 'pos-obra', name: 'Limpeza pós-obra', basePrice: 118750 },
      { id: 'sofas-colchoes', name: 'Lavagem de sofás e colchões', basePrice: 42750 },
      { id: 'limpeza-geral', name: 'Limpeza geral de casa', basePrice: 47500 },
    ],
    manutencao: [
      { id: 'reparacao-eletrica', name: 'Reparação elétrica', basePrice: 105000 },
      { id: 'urgencia', name: 'Urgência (até 24h)', basePrice: 25000, isAdditional: true }
    ]
  }

  const materialTypes = [
    { id: 'tecido', name: 'Tecido comum', multiplier: 1.0 },
    { id: 'couro', name: 'Couro natural', multiplier: 1.15 },
    { id: 'madeira', name: 'Madeira', multiplier: 1.1 }
  ]

  useEffect(() => {
    if (preselectedCategory && preselectedCategory !== budgetData.category) {
      setBudgetData(prev => ({ ...prev, category: preselectedCategory, serviceTypes: [] }))
      setPreselectedCategory(null)
    }
  }, [preselectedCategory, budgetData.category, setPreselectedCategory])

  const calculateDiscount = (count: number) => {
    if (count >= 4) return 20
    if (count >= 3) return 15
    if (count >= 2) return 10
    return 0
  }

  const calculatePrice = () => {
    if (!budgetData.serviceTypes.length || !budgetData.materialType) {
      setCalculatedPrice(0)
      setDiscount(0)
      setDiscountAmount(0)
      return
    }

    const material = materialTypes.find(m => m.id === budgetData.materialType)
    const services = servicesByCategory[budgetData.category as keyof typeof servicesByCategory] || []
    let totalPrice = 0

    budgetData.serviceTypes.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId)
      if (service && material) totalPrice += service.basePrice * material.multiplier
    })

    // 🔹 multiplicadores por sujidade
    if (budgetData.category === 'limpeza') {
      switch (budgetData.sujidade) {
        case 'media': totalPrice *= 1.10; break
        case 'pesada': totalPrice *= 1.15; break
        case 'manchas': totalPrice *= 1.20; break
      }
      switch (budgetData.distancia) {
        case 'fora-centro': totalPrice *= 1.10; break
        case 'periferia': totalPrice *= 1.15; break
      }
    }

    const serviceCount = budgetData.serviceTypes.length
    const discountPerc = calculateDiscount(serviceCount)
    const discountValue = (totalPrice * discountPerc) / 100
    const finalPrice = totalPrice - discountValue

    setCalculatedPrice(Math.round(finalPrice))
    setDiscount(discountPerc)
    setDiscountAmount(Math.round(discountValue))
  }

  useEffect(() => { calculatePrice() }, [budgetData])

  const updateBudgetData = (field: string, value: any) => {
    setBudgetData(prev => ({ ...prev, [field]: value }))
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.address || 
        !budgetData.category || !budgetData.serviceTypes.length || !budgetData.materialType) {
      toast.error('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const resumo = `
NOVA SOLICITAÇÃO DE SERVIÇO

• Nome: ${formData.name}
• Telefone: ${formData.phone}
• E-mail: ${formData.email}
• Endereço: ${formData.address}
• Categoria: ${budgetData.category}
• Serviços: ${budgetData.serviceTypes.join(', ')}
${budgetData.sujidade ? `• Nível de Sujidade: ${budgetData.sujidade}` : ''}
${budgetData.distancia ? `• Distância: ${budgetData.distancia}` : ''}
• Material: ${budgetData.materialType}
• Valor Final: ${formatPrice(calculatedPrice)}
    `.trim()

    const subject = encodeURIComponent('Nova Solicitação de Serviço - Calculadora de Orçamento')
    const body = encodeURIComponent(resumo)
    const mailtoLink = `mailto:suporte@econexgroup.com?subject=${subject}&body=${body}`
    window.location.href = mailtoLink
    toast.success('✅ Solicitação enviada com sucesso!')
  }

  const getServicesForCategory = () => {
    if (!budgetData.category) return []
    return servicesByCategory[budgetData.category as keyof typeof servicesByCategory] || []
  }

  return (
    <section id="calculadora-orcamento" className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="h-6 w-6 mr-2" /> Configurar Orçamento
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8 space-y-8">

            {/* Dados pessoais */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Nome *</Label>
                <Input value={formData.name} onChange={e => updateFormData('name', e.target.value)} placeholder="Seu nome completo" />
              </div>
              <div>
                <Label>Telefone *</Label>
                <Input value={formData.phone} onChange={e => updateFormData('phone', e.target.value)} placeholder="+244 900 000 000" />
              </div>
              <div>
                <Label>Email *</Label>
                <Input value={formData.email} onChange={e => updateFormData('email', e.target.value)} placeholder="email@exemplo.com" />
              </div>
              <div>
                <Label>Endereço *</Label>
                <Input value={formData.address} onChange={e => updateFormData('address', e.target.value)} placeholder="Cidade, bairro e rua" />
              </div>
            </div>

            {/* Categoria */}
            <div>
              <Label>Categoria *</Label>
              <Select value={budgetData.category} onValueChange={v => updateBudgetData('category', v)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Serviços */}
            {budgetData.category && (
              <div>
                <Label>Serviços *</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {getServicesForCategory().map(s => (
                    <div key={s.id} className="flex items-center space-x-2 border p-3 rounded-lg">
                      <Checkbox
                        id={s.id}
                        checked={budgetData.serviceTypes.includes(s.id)}
                        onCheckedChange={() => {
                          const exists = budgetData.serviceTypes.includes(s.id)
                          updateBudgetData('serviceTypes',
                            exists
                              ? budgetData.serviceTypes.filter(x => x !== s.id)
                              : [...budgetData.serviceTypes, s.id]
                          )
                        }}
                      />
                      <Label htmlFor={s.id}>{s.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🔹 Campos adicionais apenas para limpeza */}
            {budgetData.category === 'limpeza' && (
              <div className="grid md:grid-cols-2 gap-4">

                {/* Nível de Sujidade */}
                <div>
                  <Label>Nível de Sujidade *</Label>
                  <Select value={budgetData.sujidade} onValueChange={v => updateBudgetData('sujidade', v)}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Selecione o nível" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leve">Leve</SelectItem>
                      <SelectItem value="media">Média (+10%)</SelectItem>
                      <SelectItem value="pesada">Pesada (+15%)</SelectItem>
                      <SelectItem value="manchas">Com manchas difíceis (+20%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Distância */}
                <div>
                  <Label>Distância *</Label>
                  <Select value={budgetData.distancia} onValueChange={v => updateBudgetData('distancia', v)}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Selecione a distância" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="centro">Centro</SelectItem>
                      <SelectItem value="fora-centro">Fora do Centro (+10%)</SelectItem>
                      <SelectItem value="periferia">Periferia (+15%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Tipo de Material */}
            {budgetData.serviceTypes.length > 0 && (
              <div>
                <Label>Tipo de Material *</Label>
                <Select value={budgetData.materialType} onValueChange={v => updateBudgetData('materialType', v)}>
                  <SelectTrigger className="h-12"><SelectValue placeholder="Selecione o material" /></SelectTrigger>
                  <SelectContent>
                    {materialTypes.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Resultado */}
            <div className="p-6 bg-green-50 rounded-lg text-center border border-green-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Preço Estimado</h3>
              <p className="text-3xl text-green-700 font-bold">
                {formatPrice(calculatedPrice)}
              </p>
            </div>

            {/* Botão */}
            <div className="text-center">
              <Button 
                onClick={handleSubmit}
                disabled={!formData.name || !formData.phone || !budgetData.category || !budgetData.serviceTypes.length}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg px-10 py-4"
              >
                <Mail className="h-5 w-5 mr-2" /> Solicitar Serviço
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
