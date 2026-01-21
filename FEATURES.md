# 🛍️ ORDER STORE - E-commerce Completo

## ✨ Funcionalidades Implementadas

### 🏠 Páginas Principais
- **Home Page** - Landing page com hero, categorias, produtos destaque, promoções e newsletter
- **Shop Page** - Listagem completa de produtos com filtros avançados
- **Produto Detail** - Página detalhada de cada produto com múltiplas opções
- **Wishlist** - Página de favoritos com gerenciamento
- **Sobre** - Página sobre a empresa com história, missão e valores
- **Contato** - Página de contato com formulário e FAQ

### 🛒 Sistema de Carrinho
- Carrinho lateral deslizável
- Adicionar/remover produtos
- Ajustar quantidade
- Cálculo automático de total
- Persistência local (localStorage)
- Indicador de quantidade no header

### ❤️ Sistema de Favoritos
- Adicionar/remover produtos dos favoritos
- Página dedicada para favoritos
- Mover para carrinho direto dos favoritos
- Persistência local (localStorage)
- Indicador no header

### 🔍 Filtros e Busca
- Filtro por categoria
- Filtro por faixa de preço
- Busca por texto (nome/descrição)
- Ordenação (Novo, Preço, Avaliação)
- Atualização em tempo real

### 📦 Gerenciamento de Produtos
- 12 produtos pré-carregados com informações completas
- Categorias de produtos
- Avaliações e reviews
- Indicador de estoque
- Tags (Novo, Popular, Desconto)
- Cores e tamanhos selecionáveis

### 🎨 Interface Moderna
- Design responsivo (mobile, tablet, desktop)
- Animações suaves e transições
- Tema claro/escuro suportado (via CSS variables)
- Ícones Lucide React
- Componentes shadcn/ui

### 📱 Componentes Especiais
- Sidebar do carrinho com overlay
- Header fixo com efeito de scroll
- Menu mobile responsivo
- Notificações com React Hot Toast
- Forms com validação

### 🚀 Tecnologias Utilizadas
- **React 19** - Framework UI
- **React Router DOM** - Roteamento
- **Zustand** - Gerenciamento de estado
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização
- **Vite** - Build tool
- **React Hot Toast** - Notificações
- **Lucide React** - Ícones

### 📊 Dados e Estado
- **Cart Store** - Gerencia carrinho com Zustand
- **Wishlist Store** - Gerencia favoritos
- **Products Data** - 12 produtos com detalhes completos
- **Categories** - 12 categorias disponíveis

### 🔧 Recursos Adicionais
- Persistência local automática
- Ícones interativos
- Breadcrumb navigation (em detalhes do produto)
- Produtos relacionados (por categoria)
- Indicador de estoque baixo
- Links de navegação funcionais

## 📋 Estrutura do Projeto

```
src/
├── components/
│   ├── cart/
│   │   └── CartSidebar.tsx
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── categories.tsx
│   ├── products.tsx
│   ├── featured.tsx
│   ├── promo-banner.tsx
│   ├── newsletter.tsx
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       └── sheet.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ShopPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── WishlistPage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
├── store/
│   ├── cartStore.ts
│   └── wishlistStore.ts
├── data/
│   └── products.ts
├── App.tsx
└── main.tsx
```

## 🎯 Próximas Melhorias Sugeridas
- [ ] Autenticação de usuários
- [ ] Histórico de compras
- [ ] Dashboard de conta
- [ ] Sistema de pagamento integrado
- [ ] Avaliações e comentários de usuários
- [ ] Cupons e promoções
- [ ] Recomendações personalizadas
- [ ] Chat com atendimento
- [ ] Integração com backend
- [ ] Analytics e rastreamento

## 🚀 Como Usar

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

**ORDER STORE** - Moda de Qualidade para Quem Ousa Ser Diferente! 👕👖✨
