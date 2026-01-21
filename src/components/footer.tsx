import { Instagram, Twitter, Youtube } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "Novidades", href: "#" },
    { name: "Masculino", href: "#" },
    { name: "Feminino", href: "#" },
    { name: "Acessorios", href: "#" },
    { name: "Sale", href: "#" },
  ],
  help: [
    { name: "Rastrear Pedido", href: "#" },
    { name: "Entregas", href: "#" },
    { name: "Devolucoes", href: "#" },
    { name: "Pagamentos", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  company: [
    { name: "Sobre", href: "#" },
    { name: "Carreiras", href: "#" },
    { name: "Sustentabilidade", href: "#" },
    { name: "Imprensa", href: "#" },
  ],
}

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Youtube", icon: Youtube, href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="inline-block mb-6 group">
              <span className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-foreground">
                ORDER
              </span>
              <span className="font-[var(--font-display)] text-3xl font-light tracking-tight text-primary ml-1">
                STORE
              </span>
            </a>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              Elevando seu estilo desde 2024. Moda contemporanea para quem ousa ser diferente.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-5">
              Produtos
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-5">
              Ajuda
            </h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-5">
              Empresa
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              2026 Order Store. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Termos
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
