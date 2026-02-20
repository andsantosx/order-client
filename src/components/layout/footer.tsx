import { Instagram } from "lucide-react"

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/orderstore.co?igsh=MXhmdGZvemgyYjFvMA%3D%3D&utm_source=qr" },
]

export function Footer() {

  const footerLinks = {
    shop: [
      { name: "Sale", href: "/loja" },
    ],
    help: [
      { name: "Entregas", href: "/entregas" },
      { name: "Devolucoes", href: "/trocas-devolucoes" },
      { name: "Pagamentos", href: "/pagamentos" },
      { name: "FAQ", href: "/contato" },
    ],
    company: [
      { name: "Sobre", href: "/sobre" },
    ],
  }

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
            </a>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              Moda contemporânea para quem transforma atitude em identidade.
            </p>
            <div className="flex flex-col gap-2 mb-6">
              <a href="https://wa.me/554898192343" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <span className="font-semibold">WhatsApp:</span> +55 48 9819-2343
              </a>
              <a href="mailto:orderstoreco@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <span className="font-semibold">Email:</span> orderstoreco@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${social.name === "Instagram"
                    ? "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-md hover:scale-110 hover:shadow-lg"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/20"
                    }`}
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
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm text-muted-foreground">
                Copyright Order - 2026. Todos os direitos reservados.
              </p>
              <div className="flex items-center gap-8">
                <a href="/politicas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacidade
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center pt-6 border-t border-border/30 text-center gap-1">
              <p className="text-xs text-muted-foreground/80">
                Site desenvolvido pensando em segurança e praticidade.
              </p>
              <p className="text-xs text-muted-foreground/80">
                Criado por <a href="https://www.instagram.com/andsantosb?igsh=MWYxYXpoNHJoNzBseQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">Anderson Santos</a> & <a href="https://www.instagram.com/lorenzosegotuzzo?igsh=bmV3ZmJvemFpMG9p" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">Lorenzo Severo</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
