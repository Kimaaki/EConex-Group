import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para a tabela solicitacoes_servico
export interface SolicitacaoServico {
  id?: number
  nome: string
  telefone: string
  endereco: string
  tipos_servico: string[]
  tipo_material: string
  nivel_sujidade: string
  distancia: string
  valor_total: number
  quantidade?: number
  pos_obra_compartimentos?: number
  limpeza_geral_quartos?: number
  observacoes?: string
  created_at?: string
}

// Função para salvar solicitação de serviço
export async function salvarSolicitacaoServico(dados: SolicitacaoServico) {
  try {
    const { data, error } = await supabase
      .from('solicitacoes_servico')
      .insert([dados])
      .select()

    if (error) {
      console.error('Erro ao salvar solicitação:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Erro na função salvarSolicitacaoServico:', error)
    throw error
  }
}

// Função para criar a tabela se não existir (executar uma vez)
export async function criarTabelaSolicitacoes() {
  try {
    const { error } = await supabase.rpc('create_solicitacoes_table', {})
    
    if (error) {
      console.error('Erro ao criar tabela:', error)
      // Se a função RPC não existir, tentamos criar via SQL direto
      const { error: sqlError } = await supabase
        .from('solicitacoes_servico')
        .select('id')
        .limit(1)
      
      if (sqlError && sqlError.code === '42P01') {
        // Tabela não existe, mas não podemos criar via cliente
        console.log('Tabela solicitacoes_servico precisa ser criada no Supabase Dashboard')
      }
    }
  } catch (error) {
    console.error('Erro ao verificar/criar tabela:', error)
  }
}