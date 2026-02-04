/**
 * Lista de domínios permitidos para imagens por segurança da plataforma
 */
const ALLOWED_DOMAINS = [
    'res.cloudinary.com',
    'i.imgur.com',
    'images.unsplash.com',
    'cdn.shopify.com',
    'storage.googleapis.com',
    'postimages.org',
    'postimg.cc',
    'i.postimg.cc',
];

/**
 * Valida se uma URL de imagem é de um domínio permitido
 * @param url - URL da imagem a ser validada
 * @returns true se o domínio é permitido, false caso contrário
 */
export const validateImageUrl = (url: string): { valid: boolean; error?: string } => {
    if (!url.trim()) {
        return { valid: false, error: 'URL de imagem inválida' };
    }

    try {
        const parsed = new URL(url);

        // Deve usar HTTPS
        if (parsed.protocol !== 'https:') {
            return { valid: false, error: 'URL de imagem inválida' };
        }

        // Verificar se o domínio é permitido
        const hostname = parsed.hostname;
        const isAllowed = ALLOWED_DOMAINS.some(domain => hostname.endsWith(domain));

        if (!isAllowed) {
            return {
                valid: false,
                error: 'URL de imagem inválida'
            };
        }

        return { valid: true };
    } catch {
        return { valid: false, error: 'URL de imagem inválida' };
    }
};

/**
 * Retorna a lista de domínios permitidos
 */
export const getAllowedDomains = (): string[] => {
    return [...ALLOWED_DOMAINS];
};
