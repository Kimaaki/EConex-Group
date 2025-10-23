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

export default function ServiceCalculator({ onSuccess }: ServiceCalculatorProps) {
  // Estados para o formulário
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  })

  // Estados de seleção
  const [budgetData, setBudgetData] = useState({
    category: '',
    serviceTypes: [] as string[],
    materialType: '',
    quantity: 1,
    observations: '',
    poolSize: 'small',
    nivelSujidade: '',
    distancia: ''
  })

  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)

  const { preselectedCategory, setPreselectedCategory } = useUi()

  // Categorias
  const categories = [
    { id: 'limpeza', name: 'Limpeza' },
    { id: 'manutencao', name: 'Manutenção & Reparação' },
    { id: 'climatizacao', name: 'Climatização' },
    { id: 'automovel', name: 'Automóvel' },
    { id: 'piscinas', name: 'Piscinas' }
  ]

  // Serviços (mantido como no original)
  const servicesByCategory = {
    limpeza: [
      { id: 'limpeza-domestica', name: 'Limpeza Doméstica', basePrice: 23750 },
      { id: 'escritorios', name: 'Escritórios e Lojas', basePrice: 28500 },
      { id: 'pos-obra', name: 'Limpeza Pós-Obra', basePrice: 118750 },
      { id: 'sofas-colchoes', name: 'Lavagem de Sofás e Colchões', basePrice: 42750 },
      { id: 'vidros-fachadas', name: 'Limpeza de Vidros e Fachadas', basePrice: 11400 },
      { id: 'limpeza-geral', name: 'Limpeza Geral de Casa Mobilada', basePrice: 47500 },
      { id: 'higienizacao-cortinas', name: 'Higienização de Cortinas (par)', basePrice: 33000 },
      { id: 'higienizacao-colchao-solteiro', name: 'Higienização de Colchão Solteiro', basePrice: 30000 },
      { id: 'higienizacao-colchao-casal', name: 'Higienização de Colchão Casal', basePrice: 45000 }
    ],
    manutencao: [
      { id: 'reparacao-eletrica', name: 'Reparação elétrica', basePrice: 105000 },
      { id: 'reparacao-hidraulica', name: 'Reparação hidráulica', basePrice: 65000 }
    ],
    climatizacao: [
      { id: 'instalacao-ac', name: 'Instalação de AC', basePrice: 76000 },
      { id: 'manutencao-preventiva', name: 'Manutenção preventiva', basePrice: 42750 }
    ],
    automovel: [
      { id: 'lavagem-completa', name: 'Lavagem completa', basePrice: 23750 },
      { id: 'higienizacao-interna', name: 'Higienização interna', basePrice: 19000 }
    ],
    piscinas: [
      { id: 'pool-wash', name: 'Lavagem e Higienização', basePrice: 130000 },
      { id: 'pool-ph', name: 'Tratamento de pH', basePrice: 150000 }
    ]
  }

  // Tipos de material
  const materialTypes = [
    { id: 'tecido', name: 'Tecido comum', multiplier: 1.0 },
    { id: 'couro', name: 'Couro natural', multiplier: 1.15 },
    { id: 'napa', name: 'Napa', multiplier: 1.20 }
  ]

  // Atualizar dados
  const updateBudgetData = (field: string, value: string | number | string[]) => {
    setBudgetData(prev => ({ ...prev, [field]: value }))
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Cálculo principal
  const calculatePrice = () => {
    const categoryServices = servicesByCategory[budgetData.category as keyof typeof servicesByCategory] || []
    let total = 0

    budgetData.serviceTypes.forEach(serviceId => {
      const service = categoryServices.find(s => s.id === serviceId)
      if (service) total += service.basePrice * budgetData.quantity
    })

    // Multiplicadores de sujidade
    let nivelMultiplier = 1
    if (budgetData.nivelSujidade === 'media') nivelMultiplier = 1.10
    if (budgetData.nivelSujidade === 'pesada') nivelMultiplier = 1.15
    if (budgetData.nivelSujidade === 'dificil') nivelMultiplier = 1.20

    // Multiplicadores de distância
    let distanciaMultiplier = 1
    if (budgetData.distancia === 'foracentro') distanciaMultiplier = 1.10
    if (budgetData.distancia === 'periferia') distanciaMultiplier = 1.15

    // Multiplicar
    total = total * nivelMultiplier * distanciaMultiplier

    setCalculatedPrice(total)
  }

  useEffect(() => {
    calculatePrice()
  }, [budgetData])

  // Envio do formulário
  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !budgetData.category) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }
    toast.success('✅ Solicitação enviada com sucesso!')
  }

  const getServices = () => {
    if (!budgetData.category) return []
    return servicesByCategory[budgetData.category as keyof typeof servicesByCategory] || []
  }

  return (
    <section id="calculadora-orcamento" className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center mb-3">
            <Calculator className="h-10 w-10 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Calculadora de Orçamento</h2>
          </div>
          <p className="text-gray-600 text-lg">Preencha os campos e veja o preço estimado em tempo real</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardTitle className="text-2xl">Configure o seu Orçamento</CardTitle>
              <CardDescription className="text-blue-100">Preencha os campos abaixo</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">

              {/* Dados Pessoais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome *</Label>
                  <Input value={formData.name} onChange={(e) => updateFormData('name', e.target.value)} placeholder="Seu nome completo" />
                </div>
                <div>
                  <Label>Telefone *</Label>
                  <Input value={formData.phone} onChange={(e) => updateFormData('phone', e.target.value)} placeholder="+244 900 000 000" />
                </div>
              </div>

              {/* Categoria */}
              <div>
                <Label>Categoria *</Label>
                <Select value={budgetData.category} onValueChange={(v) => updateBudgetData('category', v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione a categoria" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Serviços */}
              {budgetData.category && (
                <div>
                  <Label>Serviços Desejados * (Selecione um ou mais)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {getServices().map(service => (
                      <div key={service.id} className="flex justify-between items-center border p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={budgetData.serviceTypes.includes(service.id)}
                            onCheckedChange={(checked) => {
                              const newServices = checked
                                ? [...budgetData.serviceTypes, service.id]
                                : budgetData.serviceTypes.filter(id => id !== service.id)
                              updateBudgetData('serviceTypes', newServices)
                            }}
                          />
                          <span>{service.name}</span>
                        </div>
                        <span className="text-green-600 font-semibold">{formatPrice(service.basePrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Campos adicionais — somente para LIMPEZA */}
              {budgetData.category === 'limpeza' && (
                <>
                  {/* Nível de Sujidade */}
                  <div>
                    <Label>Nível de Sujidade *</Label>
                    <Select value={budgetData.nivelSujidade} onValueChange={(v) => updateBudgetData('nivelSujidade', v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione o nível" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leve">Leve</SelectItem>
                        <SelectItem value="media">Média (+10%)</SelectItem>
                        <SelectItem value="pesada">Pesada (+15%)</SelectItem>
                        <SelectItem value="dificil">Com manchas difíceis (+20%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Distância */}
                  <div>
                    <Label>Distância *</Label>
                    <Select value={budgetData.distancia} onValueChange={(v) => updateBudgetData('distancia', v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione a distância" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="centro">Centro</SelectItem>
                        <SelectItem value="foracentro">Fora do Centro (+10%)</SelectItem>
                        <SelectItem value="periferia">Periferia (+15%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Resultado */}
              <div className="p-5 bg-green-50 border rounded-lg text-center">
                <h3 className="text-xl font-bold text-gray-800">Preço Estimado</h3>
                <p className="text-3xl font-bold text-green-700 mt-2">
                  {calculatedPrice > 0 ? `${formatPrice(calculatedPrice)} Kz` : '0,00 Kz'}
                </p>
              </div>

              {/* Botão */}
              <div className="text-center">
                <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-10 py-3 text-lg">
                  <Mail className="h-5 w-5 mr-2" /> Solicitar Serviço
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
