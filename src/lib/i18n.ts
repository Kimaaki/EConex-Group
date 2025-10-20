export type Language = 'pt' | 'es' | 'en' | 'fr' | 'it'

export interface Translations {
  // Header
  header: {
    title: string
    subtitle: string
    phone: string
    email: string
    whatsapp: string
  }
  
  // Banner
  banner: {
    title1: string
    subtitle1: string
    title2: string
    subtitle2: string
    title3: string
    subtitle3: string
    cta1: string
    cta2: string
    cta3: string
  }
  
  // Stats
  stats: {
    clients: string
    experience: string
    support: string
    guarantee: string
  }
  
  // Services
  services: {
    title: string
    subtitle: string
    residential: {
      title: string
      description: string
      materials: string[]
      areas: string[]
    }
    commercial: {
      title: string
      description: string
      materials: string[]
      areas: string[]
    }
    restaurants: {
      title: string
      description: string
      materials: string[]
      areas: string[]
    }
    windows: {
      title: string
      description: string
      materials: string[]
      areas: string[]
    }
    postConstruction: {
      title: string
      description: string
      materials: string[]
      areas: string[]
    }
    maintenance: {
      title: string
      description: string
      materials: string[]
      areas: string[]
    }
    requestService: string
  }
  
  // Why Clean Section
  whyClean: {
    title: string
    risks: {
      title: string
      description: string
    }
    benefits: {
      title: string
      description: string
    }
    professional: {
      title: string
      description: string
    }
    savings: {
      title: string
      description: string
    }
  }
  
  // Impact Section
  impact: {
    title: string
    subtitle: string
    beforeTitle: string
    afterTitle: string
    quotes: string[]
    urgentTitle: string
    urgentSubtitle: string
    urgentTime: string
    ctaButton: string
    ctaSubtitle: string
  }
  
  // Budget Calculator
  budget: {
    title: string
    subtitle: string
    configTitle: string
    configSubtitle: string
    serviceTypes: string
    selectMultiple: string
    promotion: string
    compartments: string
    rooms: string
    quantity: string
    material: string
    dirtLevel: string
    location: string
    address: string
    observations: string
    observationsPlaceholder: string
    priceTitle: string
    subtotal: string
    discount: string
    finalPrice: string
    selectOptions: string
    discountNote: string
    requestButton: string
    emailNote: string
    roomsNote: string
  }
  
  // Service Types
  serviceTypes: {
    sofa: string
    mattress: string
    chairs: string
    wardrobes: string
    carpets: string
    curtains: string
    windows: string
    postConstruction: string
    offices: string
    bathrooms: string
    stoves: string
    generalCleaning: string
  }
  
  // Materials
  materials: {
    fabric: string
    leather: string
    napa: string
    suede: string
    wood: string
    aluminum: string
    glass: string
    tile: string
    steel: string
  }
  
  // Dirt Levels
  dirtLevels: {
    light: string
    medium: string
    heavy: string
    stains: string
  }
  
  // Distance/Neighborhoods
  neighborhoods: {
    center: string
    lisbon: string
    porto: string
    cascais: string
    sintra: string
    oeiras: string
    almada: string
    setubal: string
    braga: string
    other: string
  }
  
  // Form
  form: {
    title: string
    subtitle: string
    name: string
    phone: string
    email: string
    address: string
    addressPlaceholder: string
    namePlaceholder: string
    phonePlaceholder: string
    emailPlaceholder: string
    selectMaterial: string
    selectLevel: string
    selectDistance: string
    observationsOptional: string
    observationsPlaceholder: string
    priceTotal: string
    finalValue: string
    requestService: string
    fillRequired: string
    successMessage: string
    errorMessage: string
  }
  
  // Testimonials
  testimonials: {
    title: string
    testimonial1: {
      name: string
      role: string
      comment: string
    }
    testimonial2: {
      name: string
      role: string
      comment: string
    }
    testimonial3: {
      name: string
      role: string
      comment: string
    }
  }
  
  // Footer
  footer: {
    subtitle: string
    description: string
    servicesTitle: string
    contactTitle: string
    location: string
    support24: string
    scheduleTitle: string
    weekdays: string
    saturday: string
    sunday: string
    emergency: string
    copyright: string
  }
  
  // Contact
  contact: {
    portugalPhone: string
    spainPhone: string
    email: string
    location: string
  }
  
  // Common
  common: {
    loading: string
    error: string
    success: string
    required: string
    optional: string
    select: string
    cancel: string
    confirm: string
    close: string
    next: string
    previous: string
  }
}

export const translations: Record<Language, Translations> = {
  pt: {
    header: {
      title: "Limpszone",
      subtitle: "Limpeza Profissional Portugal",
      phone: "+351 920 000 000",
      email: "suportelimpszone@gmail.com",
      whatsapp: "WhatsApp"
    },
    
    banner: {
      title1: "Limpeza Profissional em Portugal",
      subtitle1: "Transformamos o seu espaço com qualidade e confiança",
      title2: "Higienização Completa",
      subtitle2: "Equipamentos modernos e produtos certificados",
      title3: "Atendimento 24/7",
      subtitle3: "Estamos sempre prontos para o atender",
      cta1: "Solicitar Orçamento",
      cta2: "Ver Serviços",
      cta3: "Falar no WhatsApp"
    },
    
    stats: {
      clients: "Clientes Satisfeitos",
      experience: "Anos de Experiência",
      support: "Atendimento",
      guarantee: "Garantia"
    },
    
    services: {
      title: "Os Nossos Serviços",
      subtitle: "Oferecemos soluções completas de limpeza e higienização para todos os tipos de ambientes em Portugal",
      residential: {
        title: "Limpeza Residencial",
        description: "Limpeza completa de casas e apartamentos",
        materials: ["Aspirador profissional", "Produtos biodegradáveis", "Panos de microfibra", "Equipamentos de segurança"],
        areas: ["Quartos", "Salas", "Cozinhas", "Casas de banho", "Áreas externas"]
      },
      commercial: {
        title: "Limpeza Comercial",
        description: "Higienização de escritórios e estabelecimentos comerciais",
        materials: ["Máquinas industriais", "Desinfetantes profissionais", "Equipamentos de limpeza", "Produtos especializados"],
        areas: ["Escritórios", "Recepções", "Casas de banho", "Corredores", "Áreas comuns"]
      },
      restaurants: {
        title: "Restaurantes & Hotéis",
        description: "Limpeza especializada para sector alimentício e hoteleiro",
        materials: ["Sanitizantes alimentares", "Equipamentos industriais", "Produtos anti-bacterianos", "Materiais certificados"],
        areas: ["Cozinhas", "Salões", "Quartos", "Casas de banho", "Áreas de serviço"]
      },
      windows: {
        title: "Limpeza de Vidros",
        description: "Limpeza profissional de vidros e fachadas",
        materials: ["Rodos profissionais", "Produtos específicos", "Equipamentos de altura", "Panos especiais"],
        areas: ["Janelas", "Fachadas", "Montras", "Divisórias", "Espelhos"]
      },
      postConstruction: {
        title: "Pós-Obra",
        description: "Limpeza pesada após construções e remodelações",
        materials: ["Equipamentos pesados", "Produtos específicos", "Ferramentas especializadas", "EPIs completos"],
        areas: ["Remoção de entulho", "Limpeza de paredes", "Pavimentos", "Acabamentos", "Detalhamento"]
      },
      maintenance: {
        title: "Manutenção Predial",
        description: "Limpeza e manutenção de condomínios e edifícios",
        materials: ["Máquinas industriais", "Produtos profissionais", "Equipamentos de segurança", "Ferramentas especializadas"],
        areas: ["Áreas comuns", "Garagens", "Elevadores", "Escadas", "Fachadas"]
      },
      requestService: "Solicitar Serviço"
    },
    
    whyClean: {
      title: "Por que higienizar é essencial?",
      risks: {
        title: "Riscos da Falta de Higienização",
        description: "A falta de higienização adequada pode causar ácaros, fungos e maus odores, comprometendo a saúde e o bem-estar da sua família ou funcionários."
      },
      benefits: {
        title: "Benefícios da Limpeza",
        description: "Ambientes limpos e cheirosos reduzem alergias e aumentam o conforto e o bem-estar, criando um espaço mais saudável para todos."
      },
      professional: {
        title: "Serviços Profissionais",
        description: "Com os nossos serviços profissionais, a sua casa ou negócio mantém-se sempre limpo, higienizado e com aparência de luxo, impressionando clientes e visitantes."
      },
      savings: {
        title: "Economia Garantida",
        description: "Clientes que realizam higienizações completas economizam até 20% nos serviços, aproveitando os nossos descontos progressivos automáticos."
      }
    },
    
    impact: {
      title: "Riscos e Benefícios da Higienização do Seu Espaço",
      subtitle: "Veja a diferença que a higienização profissional pode fazer no seu ambiente e na sua qualidade de vida",
      beforeTitle: "Ambiente Mal Higienizado",
      afterTitle: "Ambiente Limpo e Saudável",
      quotes: [
        "Não deixe para depois: o seu lar é o seu primeiro conforto.",
        "Viver num ambiente limpo é viver com saúde e tranquilidade.",
        "O conforto e a higiene que o seu espaço merece — cuide hoje!",
        "Mais saúde, mais bem-estar, mais confiança."
      ],
      urgentTitle: "Não deixe para depois! O seu lar é o seu primeiro conforto.",
      urgentSubtitle: "Cuide dele com quem entende de limpeza profissional.",
      urgentTime: "Cada dia sem higienização é um risco à sua saúde",
      ctaButton: "Solicitar Higienização Agora",
      ctaSubtitle: "Transforme o seu espaço num ambiente saudável e acolhedor hoje mesmo!"
    },
    
    budget: {
      title: "Calculadora de Orçamento",
      subtitle: "Obtenha um orçamento instantâneo para o seu serviço de limpeza. Selecione as opções abaixo e veja o preço em tempo real.",
      configTitle: "Configure o seu Orçamento",
      configSubtitle: "Preencha os campos abaixo para calcular o preço do seu serviço",
      serviceTypes: "Tipos de Serviço",
      selectMultiple: "(Selecione um ou mais)",
      promotion: "Promoção Ativa:",
      compartments: "Número de Compartimentos (Pós-Obra)",
      rooms: "Número de Quartos (Limpeza Geral)",
      quantity: "Quantidade",
      material: "Tipo de Material",
      dirtLevel: "Nível de Sujidade",
      location: "Localidade",
      address: "Endereço Completo",
      observations: "Observações Adicionais (opcional)",
      observationsPlaceholder: "Descreva manchas, áreas com bolor, danos ou outras informações importantes...",
      priceTitle: "Preço Total Estimado",
      subtotal: "Subtotal (sem desconto):",
      discount: "Desconto aplicado",
      finalPrice: "Valor final com desconto",
      selectOptions: "Selecione as opções acima para ver o preço",
      discountNote: "Descontos automáticos: 10% para 2 serviços, 15% para 3 serviços, 20% para 4+ serviços",
      requestButton: "Solicitar Serviço",
      emailNote: "As suas informações serão enviadas para suportelimpszone@gmail.com",
      roomsNote: "O valor da Limpeza Geral considera automaticamente sala, cozinha, WC e varanda. O preço final varia apenas pelo número de quartos adicionais informados."
    },
    
    serviceTypes: {
      sofa: "Limpeza de Sofá",
      mattress: "Limpeza de Colchão",
      chairs: "Limpeza de Cadeiras",
      wardrobes: "Limpeza de Armários",
      carpets: "Limpeza de Tapetes",
      curtains: "Limpeza de Cortinas",
      windows: "Limpeza de Vidros",
      postConstruction: "Higienização Pós-Obra",
      offices: "Higienização de Escritórios/Hotéis",
      bathrooms: "Limpeza de WC / Sanitários / Lavatórios",
      stoves: "Limpeza de Fogões / Fornos",
      generalCleaning: "Limpeza Geral de Casa Mobilada"
    },
    
    materials: {
      fabric: "Tecido comum",
      leather: "Couro natural",
      napa: "Napa",
      suede: "Camurça",
      wood: "Madeira",
      aluminum: "Alumínio",
      glass: "Vidro",
      tile: "Azulejo",
      steel: "Aço inox"
    },
    
    dirtLevels: {
      light: "Leve",
      medium: "Média",
      heavy: "Pesada",
      stains: "Com manchas difíceis"
    },
    
    neighborhoods: {
      center: "Centro",
      lisbon: "Lisboa",
      porto: "Porto",
      cascais: "Cascais",
      sintra: "Sintra",
      oeiras: "Oeiras",
      almada: "Almada",
      setubal: "Setúbal",
      braga: "Braga",
      other: "Outra localidade"
    },
    
    form: {
      title: "Solicitar Serviço",
      subtitle: "Preencha os dados abaixo para solicitar o seu serviço de limpeza com cálculo automático de preço.",
      name: "Nome",
      phone: "Telefone",
      email: "E-mail",
      address: "Endereço Completo",
      addressPlaceholder: "Rua, número, localidade, cidade",
      namePlaceholder: "O seu nome completo",
      phonePlaceholder: "+351 920 000 000",
      emailPlaceholder: "Digite o seu e-mail",
      selectMaterial: "Selecione o material",
      selectLevel: "Selecione o nível",
      selectDistance: "Selecione a distância",
      observationsOptional: "Observações Adicionais (opcional)",
      observationsPlaceholder: "Descreva manchas, áreas com bolor, danos ou outras informações importantes...",
      priceTotal: "Preço Total",
      finalValue: "Valor final com desconto",
      requestService: "Solicitar Serviço",
      fillRequired: "Por favor, preencha todos os campos obrigatórios.",
      successMessage: "Solicitação enviada com sucesso! Entraremos em contacto em breve.",
      errorMessage: "Erro ao enviar solicitação. Tente novamente."
    },
    
    testimonials: {
      title: "O que os nossos clientes dizem",
      testimonial1: {
        name: "Maria Silva",
        role: "Proprietária de Restaurante",
        comment: "Excelente serviço! A Limpszone transformou o nosso restaurante. Equipa profissional e pontual."
      },
      testimonial2: {
        name: "João Santos",
        role: "Gerente de Hotel",
        comment: "Trabalho impecável na limpeza do nosso hotel. Clientes sempre elogiam a limpeza dos quartos."
      },
      testimonial3: {
        name: "Ana Costa",
        role: "Dona de Casa",
        comment: "Serviço residencial perfeito! A minha casa ficou a brilhar. Super recomendo a Limpszone."
      }
    },
    
    footer: {
      subtitle: "Limpeza Profissional",
      description: "A melhor empresa de limpeza profissional em Portugal. Qualidade, confiança e excelência em cada serviço.",
      servicesTitle: "Serviços",
      contactTitle: "Contacto",
      location: "Portugal, União Europeia",
      support24: "24/7 Atendimento",
      scheduleTitle: "Horário de Funcionamento",
      weekdays: "Segunda - Sexta: 7:00 - 19:00",
      saturday: "Sábado: 8:00 - 17:00",
      sunday: "Domingo: 9:00 - 15:00",
      emergency: "Emergências: 24/7",
      copyright: "2024 Limpszone - Limpeza Profissional Portugal. Todos os direitos reservados."
    },
    
    contact: {
      portugalPhone: "+351 920 000 000",
      spainPhone: "+34 690 000 000",
      email: "suportelimpszone@gmail.com",
      location: "Portugal e Espanha, União Europeia"
    },
    
    common: {
      loading: "A carregar...",
      error: "Erro",
      success: "Sucesso",
      required: "obrigatório",
      optional: "opcional",
      select: "Selecionar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      close: "Fechar",
      next: "Seguinte",
      previous: "Anterior"
    }
  },
  
  es: {
    header: {
      title: "Limpszone",
      subtitle: "Limpieza Profesional España",
      phone: "+34 690 000 000",
      email: "suportelimpszone@gmail.com",
      whatsapp: "WhatsApp"
    },
    
    banner: {
      title1: "Limpieza Profesional en España",
      subtitle1: "Transformamos tu espacio con calidad y confianza",
      title2: "Higienización Completa",
      subtitle2: "Equipos modernos y productos certificados",
      title3: "Atención 24/7",
      subtitle3: "Siempre estamos listos para atenderte",
      cta1: "Solicitar Presupuesto",
      cta2: "Ver Servicios",
      cta3: "Hablar por WhatsApp"
    },
    
    stats: {
      clients: "Clientes Satisfechos",
      experience: "Años de Experiencia",
      support: "Atención",
      guarantee: "Garantía"
    },
    
    services: {
      title: "Nuestros Servicios",
      subtitle: "Ofrecemos soluciones completas de limpieza e higienización para todo tipo de ambientes en España",
      residential: {
        title: "Limpieza Residencial",
        description: "Limpieza completa de casas y apartamentos",
        materials: ["Aspiradora profesional", "Productos biodegradables", "Paños de microfibra", "Equipos de seguridad"],
        areas: ["Dormitorios", "Salones", "Cocinas", "Baños", "Áreas externas"]
      },
      commercial: {
        title: "Limpieza Comercial",
        description: "Higienización de oficinas y establecimientos comerciales",
        materials: ["Máquinas industriales", "Desinfectantes profesionales", "Equipos de limpieza", "Productos especializados"],
        areas: ["Oficinas", "Recepciones", "Baños", "Pasillos", "Áreas comunes"]
      },
      restaurants: {
        title: "Restaurantes y Hoteles",
        description: "Limpieza especializada para sector alimentario y hotelero",
        materials: ["Sanitizantes alimentarios", "Equipos industriales", "Productos antibacterianos", "Materiales certificados"],
        areas: ["Cocinas", "Salones", "Habitaciones", "Baños", "Áreas de servicio"]
      },
      windows: {
        title: "Limpieza de Cristales",
        description: "Limpieza profesional de cristales y fachadas",
        materials: ["Escobillas profesionales", "Productos específicos", "Equipos de altura", "Paños especiales"],
        areas: ["Ventanas", "Fachadas", "Escaparates", "Divisiones", "Espejos"]
      },
      postConstruction: {
        title: "Post-Obra",
        description: "Limpieza pesada después de construcciones y reformas",
        materials: ["Equipos pesados", "Productos específicos", "Herramientas especializadas", "EPIs completos"],
        areas: ["Retirada de escombros", "Limpieza de paredes", "Pavimentos", "Acabados", "Detallado"]
      },
      maintenance: {
        title: "Mantenimiento de Edificios",
        description: "Limpieza y mantenimiento de condominios y edificios",
        materials: ["Máquinas industriales", "Productos profesionales", "Equipos de seguridad", "Herramientas especializadas"],
        areas: ["Áreas comunes", "Garajes", "Ascensores", "Escaleras", "Fachadas"]
      },
      requestService: "Solicitar Servicio"
    },
    
    whyClean: {
      title: "¿Por qué higienizar es esencial?",
      risks: {
        title: "Riesgos de la Falta de Higienización",
        description: "La falta de higienización adecuada puede causar ácaros, hongos y malos olores, comprometiendo la salud y el bienestar de tu familia o empleados."
      },
      benefits: {
        title: "Beneficios de la Limpieza",
        description: "Ambientes limpios y perfumados reducen alergias y aumentan el confort y bienestar, creando un espacio más saludable para todos."
      },
      professional: {
        title: "Servicios Profesionales",
        description: "Con nuestros servicios profesionales, tu casa o negocio se mantiene siempre limpio, higienizado y con apariencia de lujo, impresionando a clientes y visitantes."
      },
      savings: {
        title: "Ahorro Garantizado",
        description: "Clientes que realizan higienizaciones completas ahorran hasta 20% en los servicios, aprovechando nuestros descuentos progresivos automáticos."
      }
    },
    
    impact: {
      title: "Riesgos y Beneficios de la Higienización de tu Espacio",
      subtitle: "Ve la diferencia que la higienización profesional puede hacer en tu ambiente y en tu calidad de vida",
      beforeTitle: "Ambiente Mal Higienizado",
      afterTitle: "Ambiente Limpio y Saludable",
      quotes: [
        "No lo dejes para después: tu hogar es tu primer confort.",
        "Vivir en un ambiente limpio es vivir con salud y tranquilidad.",
        "El confort y la higiene que tu espacio merece — ¡cuídalo hoy!",
        "Más salud, más bienestar, más confianza."
      ],
      urgentTitle: "¡No lo dejes para después! Tu hogar es tu primer confort.",
      urgentSubtitle: "Cuídalo con quien entiende de limpieza profesional.",
      urgentTime: "Cada día sin higienización es un riesgo para tu salud",
      ctaButton: "Solicitar Higienización Ahora",
      ctaSubtitle: "¡Transforma tu espacio en un ambiente saludable y acogedor hoy mismo!"
    },
    
    budget: {
      title: "Calculadora de Presupuesto",
      subtitle: "Obtén un presupuesto instantáneo para tu servicio de limpieza. Selecciona las opciones abajo y ve el precio en tiempo real.",
      configTitle: "Configura tu Presupuesto",
      configSubtitle: "Rellena los campos abajo para calcular el precio de tu servicio",
      serviceTypes: "Tipos de Servicio",
      selectMultiple: "(Selecciona uno o más)",
      promotion: "Promoción Activa:",
      compartments: "Número de Compartimentos (Post-Obra)",
      rooms: "Número de Habitaciones (Limpieza General)",
      quantity: "Cantidad",
      material: "Tipo de Material",
      dirtLevel: "Nivel de Suciedad",
      location: "Localidad",
      address: "Dirección Completa",
      observations: "Observaciones Adicionales (opcional)",
      observationsPlaceholder: "Describe manchas, áreas con moho, daños u otra información importante...",
      priceTitle: "Precio Total Estimado",
      subtotal: "Subtotal (sin descuento):",
      discount: "Descuento aplicado",
      finalPrice: "Valor final con descuento",
      selectOptions: "Selecciona las opciones arriba para ver el precio",
      discountNote: "Descuentos automáticos: 10% para 2 servicios, 15% para 3 servicios, 20% para 4+ servicios",
      requestButton: "Solicitar Servicio",
      emailNote: "Tu información será enviada a suportelimpszone@gmail.com",
      roomsNote: "El valor de la Limpieza General considera automáticamente salón, cocina, baño y terraza. El precio final varía solo por el número de habitaciones adicionales informadas."
    },
    
    serviceTypes: {
      sofa: "Limpieza de Sofá",
      mattress: "Limpieza de Colchón",
      chairs: "Limpieza de Sillas",
      wardrobes: "Limpieza de Armarios",
      carpets: "Limpieza de Alfombras",
      curtains: "Limpieza de Cortinas",
      windows: "Limpieza de Cristales",
      postConstruction: "Higienización Post-Obra",
      offices: "Higienización de Oficinas/Hoteles",
      bathrooms: "Limpieza de Baños / Sanitarios / Lavabos",
      stoves: "Limpieza de Cocinas / Hornos",
      generalCleaning: "Limpieza General de Casa Amueblada"
    },
    
    materials: {
      fabric: "Tela común",
      leather: "Cuero natural",
      napa: "Napa",
      suede: "Ante",
      wood: "Madera",
      aluminum: "Aluminio",
      glass: "Cristal",
      tile: "Azulejo",
      steel: "Acero inox"
    },
    
    dirtLevels: {
      light: "Ligera",
      medium: "Media",
      heavy: "Pesada",
      stains: "Con manchas difíciles"
    },
    
    neighborhoods: {
      center: "Centro",
      lisbon: "Madrid",
      porto: "Barcelona",
      cascais: "Valencia",
      sintra: "Sevilla",
      oeiras: "Bilbao",
      almada: "Málaga",
      setubal: "Murcia",
      braga: "Palma",
      other: "Otra localidad"
    },
    
    form: {
      title: "Solicitar Servicio",
      subtitle: "Rellena los datos abajo para solicitar tu servicio de limpieza con cálculo automático de precio.",
      name: "Nombre",
      phone: "Teléfono",
      email: "Email",
      address: "Dirección Completa",
      addressPlaceholder: "Calle, número, localidad, ciudad",
      namePlaceholder: "Tu nombre completo",
      phonePlaceholder: "+34 690 000 000",
      emailPlaceholder: "Escribe tu email",
      selectMaterial: "Selecciona el material",
      selectLevel: "Selecciona el nivel",
      selectDistance: "Selecciona la distancia",
      observationsOptional: "Observaciones Adicionales (opcional)",
      observationsPlaceholder: "Describe manchas, áreas con moho, daños u otra información importante...",
      priceTotal: "Precio Total",
      finalValue: "Valor final con descuento",
      requestService: "Solicitar Servicio",
      fillRequired: "Por favor, rellena todos los campos obligatorios.",
      successMessage: "¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.",
      errorMessage: "Error al enviar solicitud. Inténtalo de nuevo."
    },
    
    testimonials: {
      title: "Lo que dicen nuestros clientes",
      testimonial1: {
        name: "María García",
        role: "Propietaria de Restaurante",
        comment: "¡Excelente servicio! Limpszone transformó nuestro restaurante. Equipo profesional y puntual."
      },
      testimonial2: {
        name: "Juan Martínez",
        role: "Gerente de Hotel",
        comment: "Trabajo impecable en la limpieza de nuestro hotel. Los clientes siempre elogian la limpieza de las habitaciones."
      },
      testimonial3: {
        name: "Ana López",
        role: "Ama de Casa",
        comment: "¡Servicio residencial perfecto! Mi casa quedó brillante. Super recomiendo Limpszone."
      }
    },
    
    footer: {
      subtitle: "Limpieza Profesional",
      description: "La mejor empresa de limpieza profesional en España. Calidad, confianza y excelencia en cada servicio.",
      servicesTitle: "Servicios",
      contactTitle: "Contacto",
      location: "España, Unión Europea",
      support24: "24/7 Atención",
      scheduleTitle: "Horario de Funcionamiento",
      weekdays: "Lunes - Viernes: 7:00 - 19:00",
      saturday: "Sábado: 8:00 - 17:00",
      sunday: "Domingo: 9:00 - 15:00",
      emergency: "Emergencias: 24/7",
      copyright: "2024 Limpszone - Limpieza Profesional España. Todos los derechos reservados."
    },
    
    contact: {
      portugalPhone: "+351 920 000 000",
      spainPhone: "+34 690 000 000",
      email: "suportelimpszone@gmail.com",
      location: "Portugal y España, Unión Europea"
    },
    
    common: {
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      required: "obligatorio",
      optional: "opcional",
      select: "Seleccionar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      close: "Cerrar",
      next: "Siguiente",
      previous: "Anterior"
    }
  },

  en: {
    header: {
      title: "Limpszone",
      subtitle: "Professional Cleaning Europe",
      phone: "+351 920 000 000",
      email: "suportelimpszone@gmail.com",
      whatsapp: "WhatsApp"
    },
    
    banner: {
      title1: "Professional Cleaning in Europe",
      subtitle1: "We transform your space with quality and trust",
      title2: "Complete Sanitization",
      subtitle2: "Modern equipment and certified products",
      title3: "24/7 Support",
      subtitle3: "We are always ready to serve you",
      cta1: "Request Quote",
      cta2: "View Services",
      cta3: "Chat on WhatsApp"
    },
    
    stats: {
      clients: "Satisfied Clients",
      experience: "Years of Experience",
      support: "Support",
      guarantee: "Guarantee"
    },
    
    services: {
      title: "Our Services",
      subtitle: "We offer complete cleaning and sanitization solutions for all types of environments in Europe",
      residential: {
        title: "Residential Cleaning",
        description: "Complete cleaning of houses and apartments",
        materials: ["Professional vacuum", "Biodegradable products", "Microfiber cloths", "Safety equipment"],
        areas: ["Bedrooms", "Living rooms", "Kitchens", "Bathrooms", "External areas"]
      },
      commercial: {
        title: "Commercial Cleaning",
        description: "Sanitization of offices and commercial establishments",
        materials: ["Industrial machines", "Professional disinfectants", "Cleaning equipment", "Specialized products"],
        areas: ["Offices", "Receptions", "Bathrooms", "Corridors", "Common areas"]
      },
      restaurants: {
        title: "Restaurants & Hotels",
        description: "Specialized cleaning for food and hospitality sector",
        materials: ["Food sanitizers", "Industrial equipment", "Antibacterial products", "Certified materials"],
        areas: ["Kitchens", "Dining rooms", "Rooms", "Bathrooms", "Service areas"]
      },
      windows: {
        title: "Window Cleaning",
        description: "Professional cleaning of windows and facades",
        materials: ["Professional squeegees", "Specific products", "Height equipment", "Special cloths"],
        areas: ["Windows", "Facades", "Shop windows", "Partitions", "Mirrors"]
      },
      postConstruction: {
        title: "Post-Construction",
        description: "Heavy cleaning after construction and renovations",
        materials: ["Heavy equipment", "Specific products", "Specialized tools", "Complete PPE"],
        areas: ["Debris removal", "Wall cleaning", "Floors", "Finishes", "Detailing"]
      },
      maintenance: {
        title: "Building Maintenance",
        description: "Cleaning and maintenance of condominiums and buildings",
        materials: ["Industrial machines", "Professional products", "Safety equipment", "Specialized tools"],
        areas: ["Common areas", "Garages", "Elevators", "Stairs", "Facades"]
      },
      requestService: "Request Service"
    },
    
    whyClean: {
      title: "Why is sanitization essential?",
      risks: {
        title: "Risks of Lack of Sanitization",
        description: "Lack of proper sanitization can cause mites, fungi and bad odors, compromising the health and well-being of your family or employees."
      },
      benefits: {
        title: "Benefits of Cleaning",
        description: "Clean and fresh environments reduce allergies and increase comfort and well-being, creating a healthier space for everyone."
      },
      professional: {
        title: "Professional Services",
        description: "With our professional services, your home or business stays always clean, sanitized and with a luxury appearance, impressing clients and visitors."
      },
      savings: {
        title: "Guaranteed Savings",
        description: "Clients who perform complete sanitizations save up to 20% on services, taking advantage of our automatic progressive discounts."
      }
    },
    
    impact: {
      title: "Risks and Benefits of Sanitizing Your Space",
      subtitle: "See the difference that professional sanitization can make in your environment and quality of life",
      beforeTitle: "Poorly Sanitized Environment",
      afterTitle: "Clean and Healthy Environment",
      quotes: [
        "Don't leave it for later: your home is your first comfort.",
        "Living in a clean environment is living with health and tranquility.",
        "The comfort and hygiene your space deserves — take care of it today!",
        "More health, more well-being, more confidence."
      ],
      urgentTitle: "Don't leave it for later! Your home is your first comfort.",
      urgentSubtitle: "Take care of it with those who understand professional cleaning.",
      urgentTime: "Every day without sanitization is a risk to your health",
      ctaButton: "Request Sanitization Now",
      ctaSubtitle: "Transform your space into a healthy and welcoming environment today!"
    },
    
    budget: {
      title: "Budget Calculator",
      subtitle: "Get an instant quote for your cleaning service. Select the options below and see the price in real time.",
      configTitle: "Configure Your Budget",
      configSubtitle: "Fill in the fields below to calculate the price of your service",
      serviceTypes: "Service Types",
      selectMultiple: "(Select one or more)",
      promotion: "Active Promotion:",
      compartments: "Number of Compartments (Post-Construction)",
      rooms: "Number of Rooms (General Cleaning)",
      quantity: "Quantity",
      material: "Material Type",
      dirtLevel: "Dirt Level",
      location: "Location",
      address: "Complete Address",
      observations: "Additional Observations (optional)",
      observationsPlaceholder: "Describe stains, moldy areas, damage or other important information...",
      priceTitle: "Estimated Total Price",
      subtotal: "Subtotal (without discount):",
      discount: "Applied discount",
      finalPrice: "Final value with discount",
      selectOptions: "Select the options above to see the price",
      discountNote: "Automatic discounts: 10% for 2 services, 15% for 3 services, 20% for 4+ services",
      requestButton: "Request Service",
      emailNote: "Your information will be sent to suportelimpszone@gmail.com",
      roomsNote: "The General Cleaning value automatically considers living room, kitchen, bathroom and balcony. The final price varies only by the number of additional rooms informed."
    },
    
    serviceTypes: {
      sofa: "Sofa Cleaning",
      mattress: "Mattress Cleaning",
      chairs: "Chair Cleaning",
      wardrobes: "Wardrobe Cleaning",
      carpets: "Carpet Cleaning",
      curtains: "Curtain Cleaning",
      windows: "Window Cleaning",
      postConstruction: "Post-Construction Sanitization",
      offices: "Office/Hotel Sanitization",
      bathrooms: "Bathroom / Toilet / Washbasin Cleaning",
      stoves: "Stove / Oven Cleaning",
      generalCleaning: "General Furnished House Cleaning"
    },
    
    materials: {
      fabric: "Common fabric",
      leather: "Natural leather",
      napa: "Napa",
      suede: "Suede",
      wood: "Wood",
      aluminum: "Aluminum",
      glass: "Glass",
      tile: "Tile",
      steel: "Stainless steel"
    },
    
    dirtLevels: {
      light: "Light",
      medium: "Medium",
      heavy: "Heavy",
      stains: "With difficult stains"
    },
    
    neighborhoods: {
      center: "Center",
      lisbon: "London",
      porto: "Manchester",
      cascais: "Birmingham",
      sintra: "Liverpool",
      oeiras: "Bristol",
      almada: "Leeds",
      setubal: "Sheffield",
      braga: "Edinburgh",
      other: "Other location"
    },
    
    form: {
      title: "Request Service",
      subtitle: "Fill in the data below to request your cleaning service with automatic price calculation.",
      name: "Name",
      phone: "Phone",
      email: "Email",
      address: "Complete Address",
      addressPlaceholder: "Street, number, locality, city",
      namePlaceholder: "Your full name",
      phonePlaceholder: "+44 20 0000 0000",
      emailPlaceholder: "Enter your email",
      selectMaterial: "Select material",
      selectLevel: "Select level",
      selectDistance: "Select distance",
      observationsOptional: "Additional Observations (optional)",
      observationsPlaceholder: "Describe stains, moldy areas, damage or other important information...",
      priceTotal: "Total Price",
      finalValue: "Final value with discount",
      requestService: "Request Service",
      fillRequired: "Please fill in all required fields.",
      successMessage: "Request sent successfully! We will contact you soon.",
      errorMessage: "Error sending request. Please try again."
    },
    
    testimonials: {
      title: "What our clients say",
      testimonial1: {
        name: "Mary Johnson",
        role: "Restaurant Owner",
        comment: "Excellent service! Limpszone transformed our restaurant. Professional and punctual team."
      },
      testimonial2: {
        name: "John Smith",
        role: "Hotel Manager",
        comment: "Impeccable work cleaning our hotel. Clients always praise the cleanliness of the rooms."
      },
      testimonial3: {
        name: "Anna Brown",
        role: "Homeowner",
        comment: "Perfect residential service! My house was sparkling. Highly recommend Limpszone."
      }
    },
    
    footer: {
      subtitle: "Professional Cleaning",
      description: "The best professional cleaning company in Europe. Quality, trust and excellence in every service.",
      servicesTitle: "Services",
      contactTitle: "Contact",
      location: "Europe, European Union",
      support24: "24/7 Support",
      scheduleTitle: "Operating Hours",
      weekdays: "Monday - Friday: 7:00 - 19:00",
      saturday: "Saturday: 8:00 - 17:00",
      sunday: "Sunday: 9:00 - 15:00",
      emergency: "Emergencies: 24/7",
      copyright: "2024 Limpszone - Professional Cleaning Europe. All rights reserved."
    },
    
    contact: {
      portugalPhone: "+351 920 000 000",
      spainPhone: "+34 690 000 000",
      email: "suportelimpszone@gmail.com",
      location: "Portugal and Spain, European Union"
    },
    
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      required: "required",
      optional: "optional",
      select: "Select",
      cancel: "Cancel",
      confirm: "Confirm",
      close: "Close",
      next: "Next",
      previous: "Previous"
    }
  },

  fr: {
    header: {
      title: "Limpszone",
      subtitle: "Nettoyage Professionnel Europe",
      phone: "+351 920 000 000",
      email: "suportelimpszone@gmail.com",
      whatsapp: "WhatsApp"
    },
    
    banner: {
      title1: "Nettoyage Professionnel en Europe",
      subtitle1: "Nous transformons votre espace avec qualité et confiance",
      title2: "Assainissement Complet",
      subtitle2: "Équipements modernes et produits certifiés",
      title3: "Support 24/7",
      subtitle3: "Nous sommes toujours prêts à vous servir",
      cta1: "Demander un Devis",
      cta2: "Voir les Services",
      cta3: "Discuter sur WhatsApp"
    },
    
    stats: {
      clients: "Clients Satisfaits",
      experience: "Années d'Expérience",
      support: "Support",
      guarantee: "Garantie"
    },
    
    services: {
      title: "Nos Services",
      subtitle: "Nous offrons des solutions complètes de nettoyage et d'assainissement pour tous types d'environnements en Europe",
      residential: {
        title: "Nettoyage Résidentiel",
        description: "Nettoyage complet de maisons et appartements",
        materials: ["Aspirateur professionnel", "Produits biodégradables", "Chiffons en microfibre", "Équipements de sécurité"],
        areas: ["Chambres", "Salons", "Cuisines", "Salles de bain", "Zones externes"]
      },
      commercial: {
        title: "Nettoyage Commercial",
        description: "Assainissement de bureaux et établissements commerciaux",
        materials: ["Machines industrielles", "Désinfectants professionnels", "Équipements de nettoyage", "Produits spécialisés"],
        areas: ["Bureaux", "Réceptions", "Salles de bain", "Couloirs", "Zones communes"]
      },
      restaurants: {
        title: "Restaurants et Hôtels",
        description: "Nettoyage spécialisé pour le secteur alimentaire et hôtelier",
        materials: ["Désinfectants alimentaires", "Équipements industriels", "Produits antibactériens", "Matériaux certifiés"],
        areas: ["Cuisines", "Salles à manger", "Chambres", "Salles de bain", "Zones de service"]
      },
      windows: {
        title: "Nettoyage de Vitres",
        description: "Nettoyage professionnel de vitres et façades",
        materials: ["Raclettes professionnelles", "Produits spécifiques", "Équipements de hauteur", "Chiffons spéciaux"],
        areas: ["Fenêtres", "Façades", "Vitrines", "Cloisons", "Miroirs"]
      },
      postConstruction: {
        title: "Post-Construction",
        description: "Nettoyage lourd après constructions et rénovations",
        materials: ["Équipements lourds", "Produits spécifiques", "Outils spécialisés", "EPI complets"],
        areas: ["Enlèvement de débris", "Nettoyage des murs", "Sols", "Finitions", "Détaillage"]
      },
      maintenance: {
        title: "Maintenance d'Immeubles",
        description: "Nettoyage et maintenance de copropriétés et bâtiments",
        materials: ["Machines industrielles", "Produits professionnels", "Équipements de sécurité", "Outils spécialisés"],
        areas: ["Zones communes", "Garages", "Ascenseurs", "Escaliers", "Façades"]
      },
      requestService: "Demander un Service"
    },
    
    whyClean: {
      title: "Pourquoi l'assainissement est-il essentiel ?",
      risks: {
        title: "Risques du Manque d'Assainissement",
        description: "Le manque d'assainissement adéquat peut causer des acariens, champignons et mauvaises odeurs, compromettant la santé et le bien-être de votre famille ou employés."
      },
      benefits: {
        title: "Bénéfices du Nettoyage",
        description: "Des environnements propres et parfumés réduisent les allergies et augmentent le confort et le bien-être, créant un espace plus sain pour tous."
      },
      professional: {
        title: "Services Professionnels",
        description: "Avec nos services professionnels, votre maison ou entreprise reste toujours propre, assainie et avec une apparence de luxe, impressionnant clients et visiteurs."
      },
      savings: {
        title: "Économies Garanties",
        description: "Les clients qui réalisent des assainissements complets économisent jusqu'à 20% sur les services, profitant de nos remises progressives automatiques."
      }
    },
    
    impact: {
      title: "Risques et Bénéfices de l'Assainissement de Votre Espace",
      subtitle: "Voyez la différence que l'assainissement professionnel peut faire dans votre environnement et qualité de vie",
      beforeTitle: "Environnement Mal Assaini",
      afterTitle: "Environnement Propre et Sain",
      quotes: [
        "Ne remettez pas à plus tard : votre foyer est votre premier confort.",
        "Vivre dans un environnement propre, c'est vivre avec santé et tranquillité.",
        "Le confort et l'hygiène que votre espace mérite — prenez-en soin aujourd'hui !",
        "Plus de santé, plus de bien-être, plus de confiance."
      ],
      urgentTitle: "Ne remettez pas à plus tard ! Votre foyer est votre premier confort.",
      urgentSubtitle: "Prenez-en soin avec ceux qui comprennent le nettoyage professionnel.",
      urgentTime: "Chaque jour sans assainissement est un risque pour votre santé",
      ctaButton: "Demander l'Assainissement Maintenant",
      ctaSubtitle: "Transformez votre espace en un environnement sain et accueillant dès aujourd'hui !"
    },
    
    budget: {
      title: "Calculateur de Budget",
      subtitle: "Obtenez un devis instantané pour votre service de nettoyage. Sélectionnez les options ci-dessous et voyez le prix en temps réel.",
      configTitle: "Configurez Votre Budget",
      configSubtitle: "Remplissez les champs ci-dessous pour calculer le prix de votre service",
      serviceTypes: "Types de Service",
      selectMultiple: "(Sélectionnez un ou plusieurs)",
      promotion: "Promotion Active :",
      compartments: "Nombre de Compartiments (Post-Construction)",
      rooms: "Nombre de Chambres (Nettoyage Général)",
      quantity: "Quantité",
      material: "Type de Matériau",
      dirtLevel: "Niveau de Saleté",
      location: "Localisation",
      address: "Adresse Complète",
      observations: "Observations Supplémentaires (optionnel)",
      observationsPlaceholder: "Décrivez les taches, zones moisies, dommages ou autres informations importantes...",
      priceTitle: "Prix Total Estimé",
      subtotal: "Sous-total (sans remise) :",
      discount: "Remise appliquée",
      finalPrice: "Valeur finale avec remise",
      selectOptions: "Sélectionnez les options ci-dessus pour voir le prix",
      discountNote: "Remises automatiques : 10% pour 2 services, 15% pour 3 services, 20% pour 4+ services",
      requestButton: "Demander un Service",
      emailNote: "Vos informations seront envoyées à suportelimpszone@gmail.com",
      roomsNote: "La valeur du Nettoyage Général considère automatiquement salon, cuisine, salle de bain et balcon. Le prix final varie seulement par le nombre de chambres supplémentaires informées."
    },
    
    serviceTypes: {
      sofa: "Nettoyage de Canapé",
      mattress: "Nettoyage de Matelas",
      chairs: "Nettoyage de Chaises",
      wardrobes: "Nettoyage d'Armoires",
      carpets: "Nettoyage de Tapis",
      curtains: "Nettoyage de Rideaux",
      windows: "Nettoyage de Vitres",
      postConstruction: "Assainissement Post-Construction",
      offices: "Assainissement de Bureaux/Hôtels",
      bathrooms: "Nettoyage de WC / Sanitaires / Lavabos",
      stoves: "Nettoyage de Cuisinières / Fours",
      generalCleaning: "Nettoyage Général de Maison Meublée"
    },
    
    materials: {
      fabric: "Tissu commun",
      leather: "Cuir naturel",
      napa: "Napa",
      suede: "Daim",
      wood: "Bois",
      aluminum: "Aluminium",
      glass: "Verre",
      tile: "Carrelage",
      steel: "Acier inoxydable"
    },
    
    dirtLevels: {
      light: "Léger",
      medium: "Moyen",
      heavy: "Lourd",
      stains: "Avec taches difficiles"
    },
    
    neighborhoods: {
      center: "Centre",
      lisbon: "Paris",
      porto: "Lyon",
      cascais: "Marseille",
      sintra: "Toulouse",
      oeiras: "Nice",
      almada: "Nantes",
      setubal: "Strasbourg",
      braga: "Montpellier",
      other: "Autre localisation"
    },
    
    form: {
      title: "Demander un Service",
      subtitle: "Remplissez les données ci-dessous pour demander votre service de nettoyage avec calcul automatique du prix.",
      name: "Nom",
      phone: "Téléphone",
      email: "Email",
      address: "Adresse Complète",
      addressPlaceholder: "Rue, numéro, localité, ville",
      namePlaceholder: "Votre nom complet",
      phonePlaceholder: "+33 1 00 00 00 00",
      emailPlaceholder: "Entrez votre email",
      selectMaterial: "Sélectionnez le matériau",
      selectLevel: "Sélectionnez le niveau",
      selectDistance: "Sélectionnez la distance",
      observationsOptional: "Observations Supplémentaires (optionnel)",
      observationsPlaceholder: "Décrivez les taches, zones moisies, dommages ou autres informations importantes...",
      priceTotal: "Prix Total",
      finalValue: "Valeur finale avec remise",
      requestService: "Demander un Service",
      fillRequired: "Veuillez remplir tous les champs obligatoires.",
      successMessage: "Demande envoyée avec succès ! Nous vous contacterons bientôt.",
      errorMessage: "Erreur lors de l'envoi de la demande. Veuillez réessayer."
    },
    
    testimonials: {
      title: "Ce que disent nos clients",
      testimonial1: {
        name: "Marie Dubois",
        role: "Propriétaire de Restaurant",
        comment: "Excellent service ! Limpszone a transformé notre restaurant. Équipe professionnelle et ponctuelle."
      },
      testimonial2: {
        name: "Jean Martin",
        role: "Gérant d'Hôtel",
        comment: "Travail impeccable dans le nettoyage de notre hôtel. Les clients louent toujours la propreté des chambres."
      },
      testimonial3: {
        name: "Anne Leroy",
        role: "Propriétaire",
        comment: "Service résidentiel parfait ! Ma maison brillait. Je recommande vivement Limpszone."
      }
    },
    
    footer: {
      subtitle: "Nettoyage Professionnel",
      description: "La meilleure entreprise de nettoyage professionnel en Europe. Qualité, confiance et excellence dans chaque service.",
      servicesTitle: "Services",
      contactTitle: "Contact",
      location: "Europe, Union Européenne",
      support24: "Support 24/7",
      scheduleTitle: "Heures d'Ouverture",
      weekdays: "Lundi - Vendredi : 7:00 - 19:00",
      saturday: "Samedi : 8:00 - 17:00",
      sunday: "Dimanche : 9:00 - 15:00",
      emergency: "Urgences : 24/7",
      copyright: "2024 Limpszone - Nettoyage Professionnel Europe. Tous droits réservés."
    },
    
    contact: {
      portugalPhone: "+351 920 000 000",
      spainPhone: "+34 690 000 000",
      email: "suportelimpszone@gmail.com",
      location: "Portugal et Espagne, Union Européenne"
    },
    
    common: {
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès",
      required: "obligatoire",
      optional: "optionnel",
      select: "Sélectionner",
      cancel: "Annuler",
      confirm: "Confirmer",
      close: "Fermer",
      next: "Suivant",
      previous: "Précédent"
    }
  },

  it: {
    header: {
      title: "Limpszone",
      subtitle: "Pulizia Professionale Europa",
      phone: "+351 920 000 000",
      email: "suportelimpszone@gmail.com",
      whatsapp: "WhatsApp"
    },
    
    banner: {
      title1: "Pulizia Professionale in Europa",
      subtitle1: "Trasformiamo il tuo spazio con qualità e fiducia",
      title2: "Sanificazione Completa",
      subtitle2: "Attrezzature moderne e prodotti certificati",
      title3: "Supporto 24/7",
      subtitle3: "Siamo sempre pronti a servirti",
      cta1: "Richiedi Preventivo",
      cta2: "Vedi Servizi",
      cta3: "Chatta su WhatsApp"
    },
    
    stats: {
      clients: "Clienti Soddisfatti",
      experience: "Anni di Esperienza",
      support: "Supporto",
      guarantee: "Garanzia"
    },
    
    services: {
      title: "I Nostri Servizi",
      subtitle: "Offriamo soluzioni complete di pulizia e sanificazione per tutti i tipi di ambienti in Europa",
      residential: {
        title: "Pulizia Residenziale",
        description: "Pulizia completa di case e appartamenti",
        materials: ["Aspirapolvere professionale", "Prodotti biodegradabili", "Panni in microfibra", "Attrezzature di sicurezza"],
        areas: ["Camere da letto", "Soggiorni", "Cucine", "Bagni", "Aree esterne"]
      },
      commercial: {
        title: "Pulizia Commerciale",
        description: "Sanificazione di uffici e stabilimenti commerciali",
        materials: ["Macchine industriali", "Disinfettanti professionali", "Attrezzature per pulizia", "Prodotti specializzati"],
        areas: ["Uffici", "Reception", "Bagni", "Corridoi", "Aree comuni"]
      },
      restaurants: {
        title: "Ristoranti e Hotel",
        description: "Pulizia specializzata per settore alimentare e alberghiero",
        materials: ["Sanitizzanti alimentari", "Attrezzature industriali", "Prodotti antibatterici", "Materiali certificati"],
        areas: ["Cucine", "Sale da pranzo", "Camere", "Bagni", "Aree di servizio"]
      },
      windows: {
        title: "Pulizia Vetri",
        description: "Pulizia professionale di vetri e facciate",
        materials: ["Tergivetri professionali", "Prodotti specifici", "Attrezzature per altezza", "Panni speciali"],
        areas: ["Finestre", "Facciate", "Vetrine", "Divisori", "Specchi"]
      },
      postConstruction: {
        title: "Post-Costruzione",
        description: "Pulizia pesante dopo costruzioni e ristrutturazioni",
        materials: ["Attrezzature pesanti", "Prodotti specifici", "Strumenti specializzati", "DPI completi"],
        areas: ["Rimozione detriti", "Pulizia pareti", "Pavimenti", "Finiture", "Dettagli"]
      },
      maintenance: {
        title: "Manutenzione Edifici",
        description: "Pulizia e manutenzione di condomini e edifici",
        materials: ["Macchine industriali", "Prodotti professionali", "Attrezzature di sicurezza", "Strumenti specializzati"],
        areas: ["Aree comuni", "Garage", "Ascensori", "Scale", "Facciate"]
      },
      requestService: "Richiedi Servizio"
    },
    
    whyClean: {
      title: "Perché la sanificazione è essenziale?",
      risks: {
        title: "Rischi della Mancanza di Sanificazione",
        description: "La mancanza di sanificazione adeguata può causare acari, funghi e cattivi odori, compromettendo la salute e il benessere della tua famiglia o dipendenti."
      },
      benefits: {
        title: "Benefici della Pulizia",
        description: "Ambienti puliti e profumati riducono le allergie e aumentano il comfort e il benessere, creando uno spazio più sano per tutti."
      },
      professional: {
        title: "Servizi Professionali",
        description: "Con i nostri servizi professionali, la tua casa o attività rimane sempre pulita, sanificata e con un aspetto di lusso, impressionando clienti e visitatori."
      },
      savings: {
        title: "Risparmio Garantito",
        description: "I clienti che effettuano sanificazioni complete risparmiano fino al 20% sui servizi, approfittando dei nostri sconti progressivi automatici."
      }
    },
    
    impact: {
      title: "Rischi e Benefici della Sanificazione del Tuo Spazio",
      subtitle: "Vedi la differenza che la sanificazione professionale può fare nel tuo ambiente e qualità di vita",
      beforeTitle: "Ambiente Mal Sanificato",
      afterTitle: "Ambiente Pulito e Sano",
      quotes: [
        "Non rimandare: la tua casa è il tuo primo comfort.",
        "Vivere in un ambiente pulito è vivere con salute e tranquillità.",
        "Il comfort e l'igiene che il tuo spazio merita — prenditi cura oggi!",
        "Più salute, più benessere, più fiducia."
      ],
      urgentTitle: "Non rimandare! La tua casa è il tuo primo comfort.",
      urgentSubtitle: "Prenditi cura con chi capisce di pulizia professionale.",
      urgentTime: "Ogni giorno senza sanificazione è un rischio per la tua salute",
      ctaButton: "Richiedi Sanificazione Ora",
      ctaSubtitle: "Trasforma il tuo spazio in un ambiente sano e accogliente oggi stesso!"
    },
    
    budget: {
      title: "Calcolatore Budget",
      subtitle: "Ottieni un preventivo istantaneo per il tuo servizio di pulizia. Seleziona le opzioni qui sotto e vedi il prezzo in tempo reale.",
      configTitle: "Configura il Tuo Budget",
      configSubtitle: "Compila i campi qui sotto per calcolare il prezzo del tuo servizio",
      serviceTypes: "Tipi di Servizio",
      selectMultiple: "(Seleziona uno o più)",
      promotion: "Promozione Attiva:",
      compartments: "Numero di Compartimenti (Post-Costruzione)",
      rooms: "Numero di Camere (Pulizia Generale)",
      quantity: "Quantità",
      material: "Tipo di Materiale",
      dirtLevel: "Livello di Sporco",
      location: "Località",
      address: "Indirizzo Completo",
      observations: "Osservazioni Aggiuntive (opzionale)",
      observationsPlaceholder: "Descrivi macchie, aree con muffa, danni o altre informazioni importanti...",
      priceTitle: "Prezzo Totale Stimato",
      subtotal: "Subtotale (senza sconto):",
      discount: "Sconto applicato",
      finalPrice: "Valore finale con sconto",
      selectOptions: "Seleziona le opzioni sopra per vedere il prezzo",
      discountNote: "Sconti automatici: 10% per 2 servizi, 15% per 3 servizi, 20% per 4+ servizi",
      requestButton: "Richiedi Servizio",
      emailNote: "Le tue informazioni saranno inviate a suportelimpszone@gmail.com",
      roomsNote: "Il valore della Pulizia Generale considera automaticamente soggiorno, cucina, bagno e balcone. Il prezzo finale varia solo per il numero di camere aggiuntive informate."
    },
    
    serviceTypes: {
      sofa: "Pulizia Divano",
      mattress: "Pulizia Materasso",
      chairs: "Pulizia Sedie",
      wardrobes: "Pulizia Armadi",
      carpets: "Pulizia Tappeti",
      curtains: "Pulizia Tende",
      windows: "Pulizia Vetri",
      postConstruction: "Sanificazione Post-Costruzione",
      offices: "Sanificazione Uffici/Hotel",
      bathrooms: "Pulizia WC / Sanitari / Lavandini",
      stoves: "Pulizia Fornelli / Forni",
      generalCleaning: "Pulizia Generale Casa Arredata"
    },
    
    materials: {
      fabric: "Tessuto comune",
      leather: "Pelle naturale",
      napa: "Napa",
      suede: "Scamosciato",
      wood: "Legno",
      aluminum: "Alluminio",
      glass: "Vetro",
      tile: "Piastrella",
      steel: "Acciaio inox"
    },
    
    dirtLevels: {
      light: "Leggero",
      medium: "Medio",
      heavy: "Pesante",
      stains: "Con macchie difficili"
    },
    
    neighborhoods: {
      center: "Centro",
      lisbon: "Roma",
      porto: "Milano",
      cascais: "Napoli",
      sintra: "Torino",
      oeiras: "Palermo",
      almada: "Genova",
      setubal: "Bologna",
      braga: "Firenze",
      other: "Altra località"
    },
    
    form: {
      title: "Richiedi Servizio",
      subtitle: "Compila i dati qui sotto per richiedere il tuo servizio di pulizia con calcolo automatico del prezzo.",
      name: "Nome",
      phone: "Telefono",
      email: "Email",
      address: "Indirizzo Completo",
      addressPlaceholder: "Via, numero, località, città",
      namePlaceholder: "Il tuo nome completo",
      phonePlaceholder: "+39 06 0000 0000",
      emailPlaceholder: "Inserisci la tua email",
      selectMaterial: "Seleziona materiale",
      selectLevel: "Seleziona livello",
      selectDistance: "Seleziona distanza",
      observationsOptional: "Osservazioni Aggiuntive (opzionale)",
      observationsPlaceholder: "Descrivi macchie, aree con muffa, danni o altre informazioni importanti...",
      priceTotal: "Prezzo Totale",
      finalValue: "Valore finale con sconto",
      requestService: "Richiedi Servizio",
      fillRequired: "Per favore, compila tutti i campi obbligatori.",
      successMessage: "Richiesta inviata con successo! Ti contatteremo presto.",
      errorMessage: "Errore nell'invio della richiesta. Riprova."
    },
    
    testimonials: {
      title: "Cosa dicono i nostri clienti",
      testimonial1: {
        name: "Maria Rossi",
        role: "Proprietaria Ristorante",
        comment: "Servizio eccellente! Limpszone ha trasformato il nostro ristorante. Team professionale e puntuale."
      },
      testimonial2: {
        name: "Giovanni Bianchi",
        role: "Manager Hotel",
        comment: "Lavoro impeccabile nella pulizia del nostro hotel. I clienti elogiano sempre la pulizia delle camere."
      },
      testimonial3: {
        name: "Anna Verdi",
        role: "Proprietaria di Casa",
        comment: "Servizio residenziale perfetto! La mia casa brillava. Raccomando vivamente Limpszone."
      }
    },
    
    footer: {
      subtitle: "Pulizia Professionale",
      description: "La migliore azienda di pulizia professionale in Europa. Qualità, fiducia ed eccellenza in ogni servizio.",
      servicesTitle: "Servizi",
      contactTitle: "Contatto",
      location: "Europa, Unione Europea",
      support24: "Supporto 24/7",
      scheduleTitle: "Orari di Apertura",
      weekdays: "Lunedì - Venerdì: 7:00 - 19:00",
      saturday: "Sabato: 8:00 - 17:00",
      sunday: "Domenica: 9:00 - 15:00",
      emergency: "Emergenze: 24/7",
      copyright: "2024 Limpszone - Pulizia Professionale Europa. Tutti i diritti riservati."
    },
    
    contact: {
      portugalPhone: "+351 920 000 000",
      spainPhone: "+34 690 000 000",
      email: "suportelimpszone@gmail.com",
      location: "Portogallo e Spagna, Unione Europea"
    },
    
    common: {
      loading: "Caricamento...",
      error: "Errore",
      success: "Successo",
      required: "obbligatorio",
      optional: "opzionale",
      select: "Seleziona",
      cancel: "Annulla",
      confirm: "Conferma",
      close: "Chiudi",
      next: "Avanti",
      previous: "Precedente"
    }
  }
}

export function useTranslation(language: Language) {
  return translations[language]
}