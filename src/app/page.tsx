"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { useBannerRotation } from '@/hooks/useBannerRotation'
import { useUi } from '@/contexts/UiContext'
import WhatsAppButton from '@/components/WhatsAppButton'
import ImpactoHigienizacao from '@/components/ImpactoHigienizacao'
import ServiceCalculator from '@/components/ServiceCalculator'
import { sendEmail, type ServiceFormData } from '@/lib/emailjs'
import { formatPrice, PRICE_REGION_FACTOR } from '@/lib/currency'
import { scrollToCalculator } from '@/lib/scroll'
import { toast } from 'sonner'

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  Users,
  Building2,
  Wrench,
  Sparkles,
  Briefcase,
  Shield,
  Factory,
  Home,
  UtensilsCrossed,
  Trophy,
  MessageCircle,
  Calculator,
  DollarSign,
  Plus,
  Minus,
  AlertTriangle,
  Heart,
  Zap,
  Award,
  Wind,
  Car,
  Waves,
  Facebook,
  Instagram,
  Linkedin,
  ShieldCheck,
  Timer,
  TrendingUp,
  Building,
  Hotel,
  Snowflake,
  Quote,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function EConexGroupApp() {
  const [selectedService, setSelectedService] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [currentServiceType, setCurrentServiceType] = useState('')
  
  // Estados para formulário específico por categoria
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    phone: '',
    address: '',
    observations: '',
    selectedServices: [] as string[],
    serviceType: ''
  })

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    serviceType: '',
    observations: ''
  })

  // Estados para o sistema de orçamento dinâmico
  const [budgetData, setBudgetData] = useState({
    serviceTypes: [] as string[], // Mudança para array de serviços
    materialType: '',
    dirtLevel: '',
    address: '',
    neighborhood: '',
    quantity: 1,
    observations: '',
    posObraCompartments: 1, // Novo campo para Pós-Obra
    limpezaGeralQuartos: 1 // Novo campo para Limpeza Geral de Casa Mobilada
  })
  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)

  // Usar o contexto UI
  const { openCalculatorWithCategory } = useUi()

  // Definição dos serviços por categoria com preços em Kwanzas - ATUALIZADA CONFORME SOLICITAÇÃO
  const categoryServices = {
    limpeza: [
      { name: 'Limpeza Doméstica', price: 23750 },
      { name: 'Escritórios e Lojas', price: 28500 },
      { name: 'Limpeza Pós-Obra', price: 118750 },
      { name: 'Lavagem de Sofás e Colchões', price: 42750 },
      { name: 'Limpeza de Vidros e Fachadas', price: 11400 },
      { name: 'Limpeza Geral de Casa Mobilada', price: 47500 },
      { name: 'Higienização de Cortinas (par)', price: 33000 },
      { name: 'Higienização de Colchão Solteiro', price: 30000 },
      { name: 'Higienização de Colchão Casal', price: 45000 }
    ],
    manutencao: [
      { name: 'Reparação Elétrica', price: 60000 },
      { name: 'Reparação Hidráulica', price: 70000 },
      { name: 'Instalação de Equipamentos', price: 90000 },
      { name: 'Manutenção de Máquinas/Frigoríficos', price: 130000 }
    ],
    climatizacao: [
      { name: 'Instalação de AC', price: 76000 },
      { name: 'Manutenção Preventiva', price: 42750 },
      { name: 'Higienização e Recarga de Gás', price: 33250 }
    ],
    automovel: [
      { name: 'Lavagem Completa', price: 23750 },
      { name: 'Higienização Interna', price: 19000 },
      { name: 'Limpeza de AC Automóvel', price: 19000 }
    ],
    piscinas: [
      { name: 'Lavagem e Higienização – Piscina Pequena (até 20 m²)', price: 130000 },
      { name: 'Lavagem e Higienização – Piscina Média (20–40 m²)', price: 140000 },
      { name: 'Lavagem e Higienização – Piscina Grande (>40 m²)', price: 150000 },
      { name: 'Tratamento da Água e Verificação de pH', price: 130000, note: 'adicionar +20 000 Kz se Piscina Grande' }
    ]
  }

  // Imagens únicas para categorias - CLIMATIZAÇÃO CORRIGIDA CONFORME SOLICITAÇÃO
  const categoryImages = {
    limpeza: {
      url: 'https://img.freepik.com/free-photo/full-shot-men-cleaning-office_23-2149345551.jpg?t=st=1761237662~exp=1761241262~hmac=6eb99e5d17a93048a559463c298bf45e9e8025b1591c3f4022051e988a3dc1b2',
      alt: 'Profissional africana limpando sofá em casa moderna'
    },
    manutencao: {
      url: 'https://img.freepik.com/free-photo/automation-engineer-optimizes-systems-industrial-facility_482257-126827.jpg?ga=GA1.1.1755074997.1757074077&semt=ais_hybrid&w=740&q=80',
      alt: 'Técnico africano realizando manutenção profissional com uniforme azul e ferramentas'
    },
    climatizacao: {
      url: 'https://img.freepik.com/free-photo/mechanic-getting-rid-hvac-system-dirt_482257-91994.jpg?ga=GA1.1.1755074997.1757074077&semt=ais_hybrid&w=740&q=80',
      alt: 'Ilustração vetorial moderna de técnico africano instalando ar-condicionado em casa ou escritório em Angola'
    },
    automovel: {
      url: 'https://img.freepik.com/free-photo/still-life-cleaning-tools_23-2150552221.jpg?ga=GA1.1.1755074997.1757074077&semt=ais_hybrid&w=740&q=80',
      alt: 'Ilustração vetorial de técnico africano lavando carro'
    },
    piscinas: {
      url: 'https://img.freepik.com/free-photo/swimming-pool-top-view_1150-11010.jpg?ga=GA1.1.1755074997.1757074077&semt=ais_hybrid&w=740&q=80',
      alt: 'Ilustração vetorial de manutenção de piscina residencial'
    }
  }

  // Serviços organizados por categoria com preços ajustados para Angola
  const serviceCategories = [
    {
      id: 'limpeza',
      title: 'Limpeza',
      description: 'Serviços completos de limpeza para todos os ambientes',
      subtitle: 'Soluções de limpeza adaptadas à realidade das cidades angolanas — rapidez, confiança e preço justo.',
      icon: Sparkles,
      image: 'https://img.freepik.com/premium-photo/young-black-man-uniform-yellow-gloves-using-vacuum-cleaner_274679-35137.jpg'
    },
    {
      id: 'manutencao',
      title: 'Manutenção & Reparação',
      description: 'Serviços técnicos de manutenção e reparação',
      subtitle: 'Técnicos especializados para resolver problemas elétricos, hidráulicos e de equipamentos.',
      icon: Wrench,
      image: 'https://img.freepik.com/free-photo/licensed-serviceman-starting-routine-condenser-maintenance-using-manifold-meters-read-pressure-external-air-conditioner-while-seasoned-wireman-writes-hvac-system-checkup-report-clipboard_482257-68066.jpg?ga=GA1.1.1755074997.1757074077&semt=ais_hybrid&w=740&q=80'
    },
    {
      id: 'climatizacao',
      title: 'Climatização',
      description: 'Instalação e manutenção de sistemas de ar-condicionado',
      subtitle: 'Especialistas em climatização para o clima tropical angolano.',
      icon: Wind,
      image: 'https://img.freepik.com/free-photo/expert-repairman-doing-condenser-investigations-filter-replacements-necessary-fixes-prevent-major-breakdowns-proficient-worker-checking-up-hvac-system-writing-findings-clipboard_482257-65742.jpg?ga=GA1.1.1755074997.1757074077&semt=ais_hybrid&w=740&q=80'
    },
    {
      id: 'automovel',
      title: 'Automóvel',
      description: 'Serviços especializados para veículos',
      subtitle: 'Cuidamos do seu veículo com produtos de qualidade e técnicas profissionais.',
      icon: Car,
      image: 'https://img.freepik.com/free-photo/expert-repairs-car-helped-by-lamp-light_482257-102860.jpg?ga=GA1.1.1755074997.1757074077&semt=ais_hybrid&w=740&q=80'
    },
    {
      id: 'piscinas',
      title: 'Piscinas',
      description: 'Manutenção e tratamento de piscinas',
      subtitle: 'Mantenha sua piscina sempre limpa e segura para toda a família.',
      icon: Waves,
      image: 'https://img.freepik.com/free-photo/sky-travel-resort-leisure-swimming_1203-4672.jpg?ga=GA1.1.1755074997.1757074077&semt=ais_hybrid&w=740&q=80'
    }
  ]

  // Preços atualizados conforme solicitação
  const serviceTypes = [
    { id: 'sofa', name: 'Limpeza de Sofá', basePrice: 45 },
    { id: 'hipermeabilizacao-sofa', name: 'Hipermeabilização de Sofá', basePrice: 160 },
    { id: 'colchao-solteiro', name: 'Higienização de Colchão (Solteiro)', basePrice: 30000 },
    { id: 'colchao-casal', name: 'Higienização de Colchão (Casal)', basePrice: 45000 },
    { id: 'tapetes', name: 'Tapete', basePrice: 10 }, // 10 por m²
    { id: 'pos-obra', name: 'Limpeza Pós-Obras', basePrice: 125 }, // a partir de 125
    { id: 'cadeiras', name: 'Limpeza de Cadeiras', basePrice: 8 },
    { id: 'armarios', name: 'Limpeza de Armários', basePrice: 13 },
    { id: 'cortinas-par', name: 'Higienização de Cortinas (par)', basePrice: 33000 },
    { id: 'vidros', name: 'Limpeza de Vidros', basePrice: 12 },
    { id: 'escritorios', name: 'Higienização de Escritórios/Hotéis', basePrice: 30 },
    { id: 'wc-sanitarios', name: 'Limpeza de WC / Sanitários / Lavatórios', basePrice: 11 },
    { id: 'fogoes-fornos', name: 'Limpeza de Fogões / Fornos', basePrice: 15 },
    { id: 'limpeza-geral', name: 'Limpeza Geral de Casa Mobilada', basePrice: 50 }
  ]

  const materialTypes = [
    { id: 'tecido', name: 'Tecido comum', multiplier: 1.0 },
    { id: 'couro', name: 'Couro natural', multiplier: 1.15 },
    { id: 'napa', name: 'Napa', multiplier: 1.20 },
    { id: 'camurca', name: 'Camurça', multiplier: 1.20 },
    { id: 'madeira', name: 'Madeira', multiplier: 1.10 },
    { id: 'aluminio', name: 'Alumínio', multiplier: 1.0 },
    { id: 'vidro', name: 'Vidro', multiplier: 1.0 },
    { id: 'azulejo', name: 'Azulejo', multiplier: 1.0 },
    { id: 'aco', name: 'Aço inox', multiplier: 1.10 }
  ]

  const dirtLevels = [
    { id: 'leve', name: 'Leve', multiplier: 1.0 },
    { id: 'media', name: 'Média', multiplier: 1.15 },
    { id: 'pesada', name: 'Pesada', multiplier: 1.30 },
    { id: 'manchas', name: 'Com manchas difíceis', multiplier: 1.30 }
  ]

  const distanceOptions = [
    { id: 'centro', name: 'Centro', multiplier: 1.0 },
    { id: 'fora-centro', name: 'Fora do Centro', multiplier: 1.10 },
    { id: 'periferia', name: 'Periferia', multiplier: 1.20 }
  ]

  const neighborhoods = [
    { id: 'luanda', name: 'Luanda', multiplier: 1.0 },
    { id: 'benguela', name: 'Benguela', multiplier: 1.05 },
    { id: 'huambo', name: 'Huambo', multiplier: 1.05 },
    { id: 'lobito', name: 'Lobito', multiplier: 1.10 },
    { id: 'cabinda', name: 'Cabinda', multiplier: 1.15 },
    { id: 'malanje', name: 'Malanje', multiplier: 1.20 },
    { id: 'namibe', name: 'Namibe', multiplier: 1.20 },
    { id: 'outro', name: 'Outra localidade', multiplier: 1.10 }
  ]

  const banners = [
    {
      title: 'EConex Group - Serviços Completos',
      subtitle: 'Limpeza, Manutenção, Climatização, Automóvel e Piscinas em Angola',
      image: 'https://img.freepik.com/premium-photo/african-american-engineer-assisting-customer-with-car-maintenance-repair-shop-trained-professional-garage-looking-car-components-with-woman-servicing-her-vehicle-annual-checkup_482257-74127.jpg',
      cta: 'Solicitar Orçamento'
    },
    {
      title: 'Soluções Integradas',
      subtitle: 'Equipamentos modernos e profissionais certificados para Angola',
      image: 'https://img.freepik.com/free-photo/top-view-steel-hammer-with-other-construction-elements-tools_23-2150576400.jpg?t=st=1767800337~exp=1767803937~hmac=12b3a5c25d0c512cfd77f7937dc87da3d33fa775bc6ab28ee431403603bfe45b',
      cta: 'Ver Serviços'
    },
    {
      title: 'Atendimento rápido e profissional. Simule o seu orçamento online e nós cuidamos do resto',
      subtitle: 'Estamos sempre prontos para o atender em toda Angola',
      image: 'https://img.freepik.com/free-photo/helpdesk-secretary-listening-client-helpline-call-using-customer-service-network-headset-male-receptionist-working-call-center-telemarketing-assistance-close-up_482257-44022.jpg?ga=GA1.1.616307467.1766244108&semt=ais_hybrid&w=740&q=80',
      cta: 'Falar no WhatsApp'
    }
  ]

  const { currentBanner, setCurrentBanner } = useBannerRotation(banners.length, 5000)

  // Testemunhos de clientes com imagens de pessoas africanas
  const clientTestimonials = [
    {
      name: 'Ana Domingos',
      city: 'Luanda, Angola',
      service: 'Limpeza',
      comment: 'Excelente atendimento! O serviço de limpeza foi rápido, cuidadoso e profissional. Recomendo a todos.',
      image: 'https://img.freepik.com/free-photo/happy-successful-professional-holding-folder-with-documents_74855-2314.jpg?ga=GA1.1.1755074997.1757074077&semt=ais_hybrid&w=740&q=80'
    },
    {
      name: 'Carlos Mateus',
      city: 'Benguela, Angola',
      service: 'Manutenção',
      comment: 'O técnico resolveu o problema elétrico rapidamente. Serviço de confiança e preço justo.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Maria Santos',
      city: 'Huambo, Angola',
      service: 'Limpeza',
      comment: 'Adorei o resultado da higienização dos sofás! Ficaram como novos e com cheiro agradável.',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'João Paulo',
      city: 'Lobito, Angola',
      service: 'Climatização',
      comment: 'Instalação do ar-condicionado perfeita. Equipe pontual e muito profissional.',
      image: 'https://img.freepik.com/free-psd/smiley-middle-age-man-posing_23-2151842267.jpg?ga=GA1.1.1755074997.1757074077&semt=ais_hybrid&w=740&q=80'
    },
    {
      name: 'Sílvia Tavares',
      city: 'Luanda, Angola',
      service: 'Limpeza',
      comment: 'Excelente serviço de limpeza pós-obra. Deixaram tudo impecável e organizado.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'André Lopes',
      city: 'Cabinda, Angola',
      service: 'Automóvel',
      comment: 'Lavagem completa do carro ficou perfeita. Já usei o serviço duas vezes e sempre excelente.',
      image: 'https://img.freepik.com/free-photo/african-american-businessman-gray-suit-studio-portrait_53876-102940.jpg?ga=GA1.1.1755074997.1757074077&semt=ais_hybrid&w=740&q=80'
    },
    {
      name: 'Neusa Ferreira',
      city: 'Malanje, Angola',
      service: 'Limpeza',
      comment: 'Gostei muito da higienização das cortinas. Atendimento educado e resultado impecável.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Fernando Mateus',
      city: 'Namibe, Angola',
      service: 'Climatização',
      comment: 'Manutenção do AC foi excelente. O ar ficou mais gelado e sem ruídos. Muito satisfeito.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Helena António',
      city: 'Luanda, Angola',
      service: 'Limpeza',
      comment: 'Equipe muito educada e profissional. Limpeza doméstica impecável e rápida.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Rui Alexandre',
      city: 'Benguela, Angola',
      service: 'Piscinas',
      comment: 'Tratamento da piscina ficou perfeito! A água está cristalina e o pH balanceado.',
      image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face'
    }
  ]

  // Função para calcular desconto baseado na quantidade de serviços (NOVA ESTRUTURA)
  const calculateDiscount = (servicesCount: number) => {
    if (servicesCount >= 4) return 20 // 20% para 4 ou mais serviços
    if (servicesCount >= 3) return 15 // 15% para 3 serviços
    if (servicesCount >= 2) return 10 // 10% para 2 serviços
    return 0 // Sem desconto para 1 serviço
  }

  // Função para calcular preço do Pós-Obra com compartimentos
  const calculatePosObraPrice = (basePrice: number, compartments: number) => {
    // Valor base mínimo: 125 (para 1 compartimento)
    // +15 por compartimento adicional
    const additionalCompartments = Math.max(0, compartments - 1)
    return basePrice + (additionalCompartments * 15)
  }

  // Função para calcular preço da Limpeza Geral com quartos
  const calculateLimpezaGeralPrice = (basePrice: number, quartos: number) => {
    // Valor base: 50 (para 1 quarto - já inclui sala, cozinha, 1 WC e varanda)
    // +15 por quarto adicional
    const additionalQuartos = Math.max(0, quartos - 1)
    return basePrice + (additionalQuartos * 15)
  }

  // Função para calcular o preço em tempo real (múltiplos serviços)
  const calculatePrice = () => {
    if (!budgetData.serviceTypes.length || !budgetData.materialType || !budgetData.dirtLevel) {
      setCalculatedPrice(0)
      setDiscount(0)
      setDiscountAmount(0)
      return
    }

    const material = materialTypes.find(m => m.id === budgetData.materialType)
    const dirt = dirtLevels.find(d => d.id === budgetData.dirtLevel)
    const neighborhood = neighborhoods.find(n => n.id === budgetData.neighborhood) || { multiplier: 1.0 }

    if (material && dirt) {
      let totalPrice = 0
      
      // Somar preços de todos os serviços selecionados
      budgetData.serviceTypes.forEach(serviceId => {
        const service = serviceTypes.find(s => s.id === serviceId)
        if (service) {
          let servicePrice = service.basePrice
          
          // Aplicar precificação especial para Pós-Obra
          if (service.id === 'pos-obra') {
            servicePrice = calculatePosObraPrice(service.basePrice, budgetData.posObraCompartments)
          } 
          // Aplicar precificação especial para Limpeza Geral
          else if (service.id === 'limpeza-geral') {
            servicePrice = calculateLimpezaGeralPrice(service.basePrice, budgetData.limpezaGeralQuartos)
          } 
          else {
            servicePrice = servicePrice * budgetData.quantity
          }
          
          servicePrice = servicePrice * material.multiplier * dirt.multiplier * neighborhood.multiplier
          totalPrice += servicePrice
        }
      })
      
      // Calcular desconto baseado na quantidade de serviços
      const discountPercentage = calculateDiscount(budgetData.serviceTypes.length)
      const discountValue = (totalPrice * discountPercentage) / 100
      const finalPriceEU = totalPrice - discountValue
      
      // Aplicar fator de região Angola (15% do preço europeu)
      const finalPriceAOA = finalPriceEU * PRICE_REGION_FACTOR
      const discountAmountAOA = discountValue * PRICE_REGION_FACTOR
      
      setCalculatedPrice(Math.round(finalPriceAOA))
      setDiscount(discountPercentage)
      setDiscountAmount(Math.round(discountAmountAOA))
    }
  }

  // Recalcular preço sempre que os dados mudarem
  useEffect(() => {
    calculatePrice()
  }, [budgetData])

  // Atualizar dados do orçamento
  const updateBudgetData = (field: string, value: string | number | string[]) => {
    setBudgetData(prev => ({ ...prev, [field]: value }))
  }

  // Função para lidar com seleção múltipla de serviços (budget)
  const handleServiceToggle = (serviceId: string) => {
    setBudgetData(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(serviceId)
        ? prev.serviceTypes.filter(id => id !== serviceId)
        : [...prev.serviceTypes, serviceId]
    }))
  }

  // Função para calcular total estimado do formulário por categoria
  const calculateCategoryTotal = () => {
    if (!currentServiceType || !categoryFormData.selectedServices.length) return 0
    
    const services = categoryServices[currentServiceType as keyof typeof categoryServices] || []
    return categoryFormData.selectedServices.reduce((total, serviceName) => {
      const service = services.find(s => s.name === serviceName)
      return total + (service?.price || 0)
    }, 0)
  }

  // Função para lidar com seleção de serviços no formulário por categoria
  const handleCategoryServiceToggle = (serviceName: string) => {
    setCategoryFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceName)
        ? prev.selectedServices.filter(name => name !== serviceName)
        : [...prev.selectedServices, serviceName]
    }))
  }

  // Função para enviar orçamento por email
  const handleBudgetSubmit = async () => {
    if (!budgetData.serviceTypes.length || !budgetData.materialType || !budgetData.dirtLevel || !budgetData.address) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    try {
      const material = materialTypes.find(m => m.id === budgetData.materialType)
      const dirt = dirtLevels.find(d => d.id === budgetData.dirtLevel)
      const neighborhood = neighborhoods.find(n => n.id === budgetData.neighborhood)

      // Calcular preço total antes do desconto (em euros)
      let totalBeforeDiscountEU = 0
      budgetData.serviceTypes.forEach(serviceId => {
        const service = serviceTypes.find(s => s.id === serviceId)
        if (service) {
          let servicePrice = service.basePrice
          
          // Aplicar precificação especial para Pós-Obra
          if (service.id === 'pos-obra') {
            servicePrice = calculatePosObraPrice(service.basePrice, budgetData.posObraCompartments)
          } 
          // Aplicar precificação especial para Limpeza Geral
          else if (service.id === 'limpeza-geral') {
            servicePrice = calculateLimpezaGeralPrice(service.basePrice, budgetData.limpezaGeralQuartos)
          } 
          else {
            servicePrice = servicePrice * budgetData.quantity
          }
          
          servicePrice = servicePrice * (material?.multiplier || 1) * (dirt?.multiplier || 1) * (neighborhood?.multiplier || 1)
          totalBeforeDiscountEU += servicePrice
        }
      })

      // Aplicar fator de região para valores em KZ
      const totalBeforeDiscountKZ = totalBeforeDiscountEU * PRICE_REGION_FACTOR

      // Criar resumo detalhado dos serviços
      const selectedServices = budgetData.serviceTypes.map(serviceId => {
        const service = serviceTypes.find(s => s.id === serviceId)
        if (service) {
          let servicePrice = service.basePrice
          
          // Aplicar precificação especial para Pós-Obra
          if (service.id === 'pos-obra') {
            servicePrice = calculatePosObraPrice(service.basePrice, budgetData.posObraCompartments)
            const compartmentInfo = budgetData.posObraCompartments > 1 ? ` (${budgetData.posObraCompartments} compartimentos)` : ' (1 compartimento)'
            servicePrice = servicePrice * (material?.multiplier || 1) * (dirt?.multiplier || 1) * (neighborhood?.multiplier || 1)
            const servicePriceKZ = servicePrice * PRICE_REGION_FACTOR
            return `• ${service.name}${compartmentInfo}: ${formatPrice(servicePriceKZ)}`
          } 
          // Aplicar precificação especial para Limpeza Geral
          else if (service.id === 'limpeza-geral') {
            servicePrice = calculateLimpezaGeralPrice(service.basePrice, budgetData.limpezaGeralQuartos)
            const quartosInfo = budgetData.limpezaGeralQuartos > 1 ? ` (${budgetData.limpezaGeralQuartos} quartos)` : ' (1 quarto)'
            servicePrice = servicePrice * (material?.multiplier || 1) * (dirt?.multiplier || 1) * (neighborhood?.multiplier || 1)
            const servicePriceKZ = servicePrice * PRICE_REGION_FACTOR
            return `• ${service.name}${quartosInfo}: ${formatPrice(servicePriceKZ)}`
          } 
          else {
            servicePrice = servicePrice * budgetData.quantity * (material?.multiplier || 1) * (dirt?.multiplier || 1) * (neighborhood?.multiplier || 1)
            const servicePriceKZ = servicePrice * PRICE_REGION_FACTOR
            return `• ${service.name}: ${formatPrice(servicePriceKZ)}`
          }
        }
        return ''
      }).filter(Boolean).join('\n')

      const resumo = `\nRESUMO DO SERVIÇO:\n• Serviços Selecionados:\n${selectedServices}\n• Quantidade: ${budgetData.quantity} ${budgetData.quantity === 1 ? 'item' : 'itens'} (por serviço)\n• Material: ${material?.name}\n• Nível de Sujidade: ${dirt?.name}\n• Endereço: ${budgetData.address}\n${budgetData.neighborhood ? `• Localidade: ${neighborhood?.name}` : ''}\n${budgetData.observations ? `• Observações: ${budgetData.observations}` : ''}\n\nCÁLCULO DE PREÇOS:\n• Subtotal (sem desconto): ${formatPrice(totalBeforeDiscountKZ)}\n${discount > 0 ? `• Desconto aplicado (-${discount}%): -${formatPrice(discountAmount)}` : ''}\n• VALOR FINAL COM DESCONTO: ${formatPrice(calculatedPrice)}\n\n${discount > 0 ? 'Observação: Descontos válidos apenas para pedidos combinados de múltiplos serviços.' : ''}\n      `

      // Criar link mailto com todos os dados
      const subject = encodeURIComponent('Nova Solicitação de Serviço - EConex Group')
      const body = encodeURIComponent(`\nNOVA SOLICITAÇÃO DE SERVIÇO\n\n${resumo}\n\n---\nEnviado através do sistema de orçamento da EConex Group\n      `.trim())

      const mailtoLink = `mailto:suporte@econexgroup.com?subject=${subject}&body=${body}`
      
      // Abrir cliente de email
      window.location.href = mailtoLink
      
      setShowSuccessMessage(true)
      
      // Limpar formulário
      setBudgetData({
        serviceTypes: [],
        materialType: '',
        dirtLevel: '',
        address: '',
        neighborhood: '',
        quantity: 1,
        observations: '',
        posObraCompartments: 1,
        limpezaGeralQuartos: 1
      })
      setCalculatedPrice(0)
      setDiscount(0)
      setDiscountAmount(0)

      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)

    } catch (error) {
      console.error('Erro ao enviar orçamento:', error)
      alert('Erro ao enviar orçamento. Tente novamente.')
    }
  }

  // Função para enviar formulário específico por categoria
  const handleCategoryFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!categoryFormData.name || !categoryFormData.phone || !categoryFormData.address || !categoryFormData.selectedServices.length) {
      alert('Por favor, preencha todos os campos obrigatórios e selecione pelo menos um serviço.')
      return
    }

    try {
      const categoryTitle = serviceCategories.find(cat => cat.id === currentServiceType)?.title || currentServiceType
      const totalEstimated = calculateCategoryTotal()
      
      // Criar lista de serviços selecionados
      const servicesList = categoryFormData.selectedServices.map(serviceName => {
        const services = categoryServices[currentServiceType as keyof typeof categoryServices] || []
        const service = services.find(s => s.name === serviceName)
        return `• ${serviceName}: ${formatPrice(service?.price || 0)}`
      }).join('\n')

      // Preparar dados para EmailJS
      const emailData: ServiceFormData = {
        name: categoryFormData.name,
        email: `Solicitação — ${categoryTitle}`,
        message: `\nNOVA SOLICITAÇÃO DE SERVIÇO\n\nCategoria: ${categoryTitle}\nNome: ${categoryFormData.name}\nTelefone: ${categoryFormData.phone}\nEndereço: ${categoryFormData.address}\n\nServiços Selecionados:\n${servicesList}\n\nValor Estimado: ${formatPrice(totalEstimated)}\n\n${categoryFormData.observations ? `Observações: ${categoryFormData.observations}` : ''}\n\n---\nEnviado através do formulário da EConex Group\n        `.trim()
      }

      // Enviar via EmailJS
      await sendEmail(emailData)

      // Mostrar toast de sucesso
      toast.success('✅ Sua solicitação foi enviada com sucesso! Nossa equipe EConex Group entrará em contato via WhatsApp.')
      
      // Mostrar mensagem de sucesso
      setShowSuccessMessage(true)
      setIsFormOpen(false)
      
      // Limpar formulário
      setCategoryFormData({
        name: '',
        phone: '',
        address: '',
        observations: '',
        selectedServices: [],
        serviceType: ''
      })

      // Esconder mensagem após 5 segundos
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)

    } catch (error) {
      console.error('Erro ao enviar email:', error)
      toast.error('❌ Erro ao enviar solicitação. Tente novamente.')
    }
  }

  // Função para enviar formulário genérico
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.location || !formData.serviceType) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    try {
      // Preparar dados para EmailJS
      const emailData: ServiceFormData = {
        name: formData.name,
        email: `Solicitação — ${formData.serviceType}`,
        message: `\nNOVA SOLICITAÇÃO DE SERVIÇO\n\nNome: ${formData.name}\nTelefone: ${formData.phone}\nLocalização: ${formData.location}\nTipo de Serviço: ${formData.serviceType}\n${formData.observations ? `Observações: ${formData.observations}` : ''}\n\n---\nEnviado através do formulário da EConex Group\n        `.trim()
      }

      // Enviar via EmailJS
      await sendEmail(emailData)

      // Mostrar toast de sucesso
      toast.success('✅ Solicitação enviada com sucesso! Nossa equipe entrará em contato pelo WhatsApp.')
      
      // Mostrar mensagem de sucesso
      setShowSuccessMessage(true)
      setIsFormOpen(false)
      
      // Limpar formulário
      setFormData({
        name: '',
        phone: '',
        location: '',
        serviceType: '',
        observations: ''
      })

      // Esconder mensagem após 5 segundos
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)

    } catch (error) {
      console.error('Erro ao enviar email:', error)
      toast.error('❌ Erro ao enviar solicitação. Tente novamente.')
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCategoryInputChange = (field: string, value: string) => {
    setCategoryFormData(prev => ({ ...prev, [field]: value }))
  }

  // Função para abrir formulário específico por categoria
  const openCategoryForm = (categoryId: string) => {
    setCurrentServiceType(categoryId)
    setCategoryFormData(prev => ({ 
      ...prev, 
      serviceType: categoryId,
      selectedServices: []
    }))
    setIsFormOpen(true)
  }

  const openServiceForm = (serviceName: string, categoryTitle?: string) => {
    const serviceType = categoryTitle ? `${categoryTitle} - ${serviceName}` : serviceName
    setFormData(prev => ({ ...prev, serviceType }))
    setSelectedService(serviceName)
    setSelectedCategory(categoryTitle || '')
    setCurrentServiceType('')
    setIsFormOpen(true)
  }

  // Função para abrir o formulário de solicitação de serviço
  const handleSolicitarServico = () => {
    setCurrentServiceType('')
    setIsFormOpen(true)
  }

  // Reviews dos clientes atualizados
  const customerReviews = [
    {
      name: "Joana Miguel Dinis",
      rating: 5,
      comment: "Excelente atendimento e limpeza impecável. Agendei pelo WhatsApp e chegaram pontualmente, super profissionais."
    },
    {
      name: "Carlos Alberto Tomé",
      rating: 5,
      comment: "O técnico resolveu o problema do AC rapidamente. Serviço de confiança, recomendo a todos."
    },
    {
      name: "Marta Domingos Filipe",
      rating: 5,
      comment: "Adorei o resultado da higienização dos sofás! Ficaram como novos e cheirosos."
    },
    {
      name: "Pedro Sebastião",
      rating: 4,
      comment: "O atendimento foi rápido e eficiente. Só elogios à equipa da manutenção."
    },
    {
      name: "Sílvia Tavares",
      rating: 5,
      comment: "Excelente serviço de limpeza pós-obra. Organização, qualidade e simpatia!"
    },
    {
      name: "André Lopes",
      rating: 5,
      comment: "Já usei os serviços duas vezes e sempre fui muito bem atendido. Profissionais e pontuais."
    },
    {
      name: "Neusa Ferreira",
      rating: 4,
      comment: "Gostei da forma como cuidaram da higienização das cortinas. Voltarei a contratar."
    },
    {
      name: "Fernando Mateus",
      rating: 5,
      comment: "Ótimo serviço de climatização. O ar-condicionado ficou perfeito e limpo."
    },
    {
      name: "João Carlos Paulo",
      rating: 5,
      comment: "Excelente relação qualidade/preço. Super confiável!"
    },
    {
      name: "Helena António",
      rating: 5,
      comment: "Equipa muito educada e profissional. Limpeza impecável e rápida."
    },
    {
      name: "Tatiana Rodrigues",
      rating: 4,
      comment: "Tive um pequeno atraso no horário, mas compensaram com um serviço excelente."
    },
    {
      name: "Cristina Figueiredo",
      rating: 5,
      comment: "Trabalho de qualidade e atenção aos detalhes. Amei o resultado."
    },
    {
      name: "Luís Armando",
      rating: 5,
      comment: "Serviço de manutenção impecável. Voltarei a contratar com certeza."
    },
    {
      name: "Sandra Paulo",
      rating: 5,
      comment: "A limpeza de piscina ficou perfeita! A água parece nova, super cristalina."
    },
    {
      name: "Rui Alexandre",
      rating: 5,
      comment: "Ótima comunicação e execução. Serviço profissional e confiável."
    }
  ]

  // Função para scroll suave para seções
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Efeito de fade-in para cards com animação de entrada
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    }, observerOptions)

    const cards = document.querySelectorAll('.fade-in-card')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Mensagem de Sucesso */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>✅ Sua solicitação foi enviada com sucesso! Nossa equipe EConex Group entrará em contato via WhatsApp.</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
  <img
    src="/icon-v2.png"
    alt="EConex Group"
    className="h-14 md:h-16 w-auto"
  />

  <div>
    <h1 className="text-2xl font-bold text-gray-800">EConex Group</h1>
    <p className="text-sm text-gray-600">
      Soluções Profissionais em Limpeza e Manutenção em Angola
    </p>
  </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <a href="tel:+244938855529" className="hover:text-blue-600">+244 938 855 529</a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <a href="mailto:suporte@econexgroup.com" className="hover:text-blue-600">suporte@econexgroup.com</a>
              </div>
              <WhatsAppButton className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-4 py-2 rounded-md inline-flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </WhatsAppButton>
            </div>
          </div>
          
          {/* Menu de Navegação */}
          <nav className="mt-4 hidden md:block">
            <div className="flex items-center justify-center space-x-8">
              <button
                onClick={() => scrollToSection('limpeza')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Limpeza
              </button>
              <button
                onClick={() => scrollToSection('manutencao')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Manutenção
              </button>
              <button
                onClick={() => scrollToSection('climatizacao')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Climatização
              </button>
              <button
                onClick={() => scrollToSection('automovel')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Automóvel
              </button>
              <button
                onClick={() => scrollToSection('piscinas')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Piscinas
              </button>
              <button
                onClick={() => scrollToSection('orcamento')}
                className="bg-[#0B0B0B] text-white px-4 py-2 rounded-md hover:bg-[#1A1A1A] transition-colors"
              >
                Calculadora de Orçamento
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Banner Carousel */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black/50" style={{ pointerEvents: "none" }} />
              <div className="relative h-full flex items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h2>
                  <p className="text-xl md:text-2xl mb-8">{banner.subtitle}</p>
                  {banner.cta === 'Falar no WhatsApp' ? (
                    <div className="relative z-50 pointer-events-auto">
                      <WhatsAppButton className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg px-8 py-3 rounded-md">
                        {banner.cta}
                      </WhatsAppButton>
                    </div>
                  ) : (
                    <Button 
                      size="lg" 
                      className={`text-lg px-8 py-3 text-white transition-colors ${banner.cta === 'Ver Orçamento' ? 'bg-black hover:bg-neutral-900' : 'bg-sky-400 hover:bg-sky-500'}`}
                      onClick={() => {
                        if (banner.cta === 'Solicitar Orçamento') {
                          document.getElementById('orcamento')?.scrollIntoView({ behavior: 'smooth' })
                        } else {
                          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                    >
                      {banner.cta}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Banner Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentBanner ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">350+</div>
              <div className="text-gray-600">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">5</div>
              <div className="text-gray-600">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">9/17</div>
              <div className="text-gray-600">Atendimento</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Garantia</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Sobre Nós
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              A EConex Group é uma empresa angolana especializada em limpeza, manutenção e climatização. 
              Combinamos tecnologia, rapidez e qualidade para oferecer um serviço de excelência. 
              Nosso sistema de orçamentos em tempo real e atendimento via WhatsApp garantem transparência e comodidade.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - COM IMAGENS ÚNICAS FIXAS CONFORME SOLICITADO */}
      <section id="services" className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tipos de Serviço
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções de limpeza e manutenção adaptadas à realidade das cidades angolanas — rapidez, confiança e preço justo.
            </p>
          </div>

          <div className="space-y-8">
            {serviceCategories.map((category) => {
              const IconComponent = category.icon
              const categoryKey = category.id as keyof typeof categoryImages
              
              return (
                <div key={category.id} id={category.id} className="scroll-mt-20">
                  {/* Título da Categoria */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <IconComponent className="h-12 w-12 text-blue-600 mr-3" />
                      <h3 className="text-3xl font-bold text-gray-800">{category.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-2">{category.description}</p>
                    <p className="text-base text-gray-500 italic">{category.subtitle}</p>
                  </div>

                  {/* Imagem Única da Categoria - CORRIGIDA CONFORME SOLICITAÇÃO */}
                  <div className="mb-8 max-w-4xl mx-auto">
                    {categoryImages[categoryKey] && (
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
                        <img 
                          src={categoryImages[categoryKey].url}
                          alt={categoryImages[categoryKey].alt}
                          className="w-full h-[400px] md:h-[500px] object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                      </div>
                    )}
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button 
                      onClick={() => scrollToCalculator()}
                      className="bg-[#111111] hover:bg-black text-white transition-colors"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      Ver Orçamento
                    </Button>
                    <Button 
                      onClick={() => openCategoryForm(category.id)}
                      
                      className="bg-sky-400 hover:bg-sky-500 text-white transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Solicitar Serviço
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navegação por Âncoras */}
          <div className="mt-12 text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Navegação Rápida:</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {serviceCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  onClick={() => scrollToSection(category.id)}
                  className="flex items-center space-x-2"
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 1️⃣ Por que higienizar é essencial? - SEÇÃO ADICIONADA CONFORME SOLICITAÇÃO */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-blue-600 mr-4" />
                Por que higienizar é essencial?
              </h2>
            </div>

            <Card className="fade-in-card border-l-4 border-blue-500 bg-blue-50">
              <CardContent className="p-8">
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Manter o ambiente limpo e higienizado não é apenas uma questão estética — é uma questão de saúde e bem-estar.
A higienização regular elimina vírus, bactérias, fungos e ácaros que se acumulam no dia a dia, prevenindo doenças respiratórias e alergias.

Com a EConex Group, você garante um espaço mais saudável, confortável e produtivo, com técnicos especializados e produtos certificados que respeitam o meio ambiente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 2️⃣ Riscos da Falta de Manutenção - SEÇÃO ADICIONADA CONFORME SOLICITAÇÃO */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-red-600 mr-4" />
                Riscos da Falta de Manutenção
              </h2>
            </div>

            <Card className="fade-in-card border-l-4 border-red-500 bg-red-50">
              <CardContent className="p-8">
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Ignorar a manutenção periódica de equipamentos e infraestruturas pode causar prejuízos sérios e comprometer a segurança do seu espaço.
Sistemas elétricos, climatização, canalizações e estruturas sem revisão acumulam desgaste e acabam falhando nos piores momentos.

Com a EConex Group, você evita gastos inesperados, garante a durabilidade dos seus equipamentos e mantém tudo a funcionar em perfeitas condições, com acompanhamento técnico especializado e rápido em toda Angola..
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3️⃣ Planos flexíveis - SEÇÃO ADICIONADA CONFORME SOLICITAÇÃO */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
                <Building2 className="h-10 w-10 text-green-600 mr-4" />
                Planos flexíveis
              </h2>
            </div>

            <Card className="fade-in-card border-l-4 border-green-500 bg-green-50">
              <CardContent className="p-8">
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  <p>
                    A EConex Group oferece soluções completas de limpeza e manutenção adaptadas às necessidades de cada cliente.
Desenvolvemos planos flexíveis para residências, empresas, condomínios, escolas e espaços comerciais, garantindo resultados consistentes e alta qualidade em cada atendimento.

Com opções de serviços pontuais ou contratos contínuos, asseguramos conforto, segurança e economia através de uma equipa técnica qualificada e um acompanhamento próximo.

Peça agora o seu orçamento personalizado e descubra o plano ideal para o seu espaço.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4️⃣ SEÇÃO DE TESTEMUNHOS DOS CLIENTES - ÚNICA VERSÃO MANTIDA CONFORME SOLICITAÇÃO */}
      <section id="testemunhos" className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              O que os nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Mais de 350 clientes satisfeitos confiam na EConex Group em toda Angola. Veja o que alguns dizem sobre nós:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clientTestimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="fade-in-card bg-white p-6 rounded-2xl shadow-md text-left hover:shadow-lg hover:scale-105 transition-all duration-300 opacity-0"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={`Cliente ${testimonial.name}`} 
                      className="w-14 h-14 rounded-full object-cover mr-4"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.city}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {testimonial.service}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                    <p className="text-gray-700 italic pl-6">
                      "{testimonial.comment}"
                    </p>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ CALCULADORA DE ORÇAMENTO - SEÇÃO PRINCIPAL MANTIDA */}
      <ServiceCalculator />

      {/* Modal do Formulário Específico por Categoria */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentServiceType ? 
                `Solicitar ${serviceCategories.find(cat => cat.id === currentServiceType)?.title || 'Serviço'}` : 
                selectedCategory ? `Solicitar ${selectedCategory}` : 'Solicitar Serviço'
              }
            </DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para solicitar o seu serviço. Nossa equipe entrará em contato pelo WhatsApp.
            </DialogDescription>
          </DialogHeader>
          
          {currentServiceType ? (
            // Formulário específico por categoria com checkboxes de serviços
            <form onSubmit={handleCategoryFormSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  required
                  value={categoryFormData.name}
                  onChange={(e) => handleCategoryInputChange('name', e.target.value)}
                  placeholder="O seu nome completo"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone WhatsApp *</Label>
                <Input
                  id="phone"
                  required
                  value={categoryFormData.phone}
                  onChange={(e) => handleCategoryInputChange('phone', e.target.value)}
                  placeholder="+244 920 000 000"
                />
              </div>

              <div>
                <Label htmlFor="address">Endereço Completo *</Label>
                <Input
                  id="address"
                  required
                  value={categoryFormData.address}
                  onChange={(e) => handleCategoryInputChange('address', e.target.value)}
                  placeholder="Cidade, bairro e endereço completo"
                />
              </div>

              {/* Serviços específicos da categoria */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Serviços Desejados * (Selecione um ou mais)
                </Label>
                <div className="space-y-3">
                  {(categoryServices[currentServiceType as keyof typeof categoryServices] || []).map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`service-${index}`}
                          checked={categoryFormData.selectedServices.includes(service.name)}
                          onCheckedChange={() => handleCategoryServiceToggle(service.name)}
                        />
                        <div>
                          <Label htmlFor={`service-${index}`} className="font-medium cursor-pointer">
                            {service.name}
                          </Label>
                          {service.note && (
                            <p className="text-sm text-gray-500 italic">{service.note}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-green-600">
                          {formatPrice(service.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Valor estimado */}
              {categoryFormData.selectedServices.length > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Valor estimado:</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatPrice(calculateCategoryTotal())}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="observations">Observações Adicionais (opcional)</Label>
                <Textarea
                  id="observations"
                  value={categoryFormData.observations}
                  onChange={(e) => handleCategoryInputChange('observations', e.target.value)}
                  placeholder="Descreva detalhes específicos, urgência, horários preferenciais..."
                  className="min-h-[80px]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={!categoryFormData.name || !categoryFormData.phone || !categoryFormData.address || !categoryFormData.selectedServices.length}
              >
                Solicitar Serviço
              </Button>
            </form>
          ) : (
            // Formulário genérico
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="O seu nome completo"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone / WhatsApp *</Label>
                <Input
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+244 920 000 000"
                />
              </div>

              <div>
                <Label htmlFor="location">Localização *</Label>
                <Input
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Cidade, bairro ou endereço"
                />
              </div>

              <div>
                <Label htmlFor="serviceType">Tipo de Serviço *</Label>
                <Input
                  id="serviceType"
                  required
                  value={formData.serviceType}
                  onChange={(e) => handleInputChange('serviceType', e.target.value)}
                  placeholder="Especifique o serviço desejado"
                />
              </div>

              <div>
                <Label htmlFor="observations">Observações (opcional)</Label>
                <Textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e) => handleInputChange('observations', e.target.value)}
                  placeholder="Descreva detalhes específicos, urgência, horários preferenciais..."
                  className="min-h-[80px]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={!formData.name || !formData.phone || !formData.location || !formData.serviceType}
              >
                Solicitar Serviço
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Botão Flutuante do WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppButton className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </WhatsAppButton>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">EConex Group</h3>
                  <p className="text-sm text-gray-400">Serviços Completos Angola</p>
                </div>
              </div>
              <p className="text-gray-400">
                A EConex Group é uma empresa angolana especializada em limpeza, manutenção e climatização. 
                Combinamos tecnologia, rapidez e qualidade para oferecer um serviço de excelência.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Limpeza Completa</li>
                <li>Manutenção & Reparação</li>
                <li>Climatização (AC)</li>
                <li>Serviços Automóvel</li>
                <li>Manutenção de Piscinas</li>
                <li>Soluções Integradas</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+244920000000" className="hover:text-white">+244 920 000 000</a>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <a href="https://wa.me/244920000000" className="hover:text-white">WhatsApp</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:suporte@econexgroup.com" className="hover:text-white">suporte@econexgroup.com</a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Angola, África</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>24/7 Atendimento</span>
                </div>
              </div>
              <WhatsAppButton className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md inline-flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Falar no WhatsApp
              </WhatsAppButton>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </div>
              </div>
              <div className="mt-6">
                <h5 className="text-sm font-semibold mb-2">Horário de Funcionamento</h5>
                <div className="space-y-1 text-sm text-gray-400">
                  <div>Segunda - Sexta: 7:00 - 19:00</div>
                  <div>Sábado: 8:00 - 17:00</div>
                  <div>Domingo: 9:00 - 15:00</div>
                  <div className="text-green-400 font-semibold mt-2">
                    Emergências: 24/7
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EConex Group — Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* CSS para animações otimizadas */}
      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Otimização para scroll suave */
        html {
          scroll-behavior: smooth;
        }
        
        /* Lazy loading otimizado */
        img[loading="lazy"] {
          transition: opacity 0.3s ease-in-out;
        }
        
        /* Hover effects suaves */
        .hover\\:scale-105 {
          transition: transform 0.3s ease-in-out;
        }
        
        /* Espaçamentos otimizados - REDUZIDOS */
        section {
          scroll-margin-top: 80px;
        }
      `}</style>
    </div>
  )
}
