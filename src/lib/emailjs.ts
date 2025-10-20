// Sistema temporário sem dependência de @emailjs/browser
// Evita erros de compilação até que a biblioteca seja instalada

export interface ServiceFormData {
  name: string;
  email?: string;
  message?: string;
}

export async function sendEmail(_: ServiceFormData) {
  console.warn("⚠️ Envio de emails desativado temporariamente. Instale '@emailjs/browser' para habilitar esta função.");
  return Promise.resolve({ status: "success", message: "Simulação de envio concluída." });
}