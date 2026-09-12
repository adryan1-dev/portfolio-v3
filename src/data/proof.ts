// Prova social. Só entra conteúdo real e autorizado pelo cliente.
// Enquanto a lista estiver vazia, a seção não é renderizada.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  projectUrl?: string;
}

export const testimonials: Testimonial[] = [];
