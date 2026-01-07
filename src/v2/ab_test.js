export const AB_CONFIG = {
  version: 'B', // 'A' para original, 'B' para teste
  variants: {
    A: {
      title: 'Original',
      description: 'Fluxo padrão do quiz'
    },
    B: {
      title: 'Teste ABA',
      description: 'Fluxo com alterações para teste ABA',
      // Exemplo de alteração: Mudar o texto da primeira pergunta
      modifications: {
        // Removido para usar o título padrão da V1 conforme solicitado
      }
    }
  }
};

export const getVariant = () => {
  // Lógica simples para alternar ou fixar a variante
  // Para um teste real, isso poderia vir de um parâmetro de URL ou localStorage
  const params = new URLSearchParams(window.location.search);
  const variantParam = params.get('variant');
  
  if (variantParam === 'A' || variantParam === 'B') {
    return variantParam;
  }
  
  // Default para B para este teste solicitado
  return 'B';
};
