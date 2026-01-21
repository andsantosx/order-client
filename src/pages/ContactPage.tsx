import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"

export function ContactPage() {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    toast.success("Mensagem enviada com sucesso!")
    e.target.reset()
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Entre em Contato
          </h1>
          <p className="text-lg text-muted-foreground">
            Estamos aqui para ajudar. Fale conosco!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Informações de Contato</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Endereço</h3>
                    <p className="text-muted-foreground">
                      Rua das Flores, 123<br />
                      São Paulo, SP 01234-567<br />
                      Brasil
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telefone</h3>
                    <p className="text-muted-foreground">(11) 98765-4321</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">contato@orderstore.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Horário de Atendimento</h3>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 09h - 18h<br />
                      Sábado: 10h - 16h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Siga-nos</h3>
              <div className="flex gap-3">
                <a href="#" className="px-4 py-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors">
                  Instagram
                </a>
                <a href="#" className="px-4 py-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors">
                  Twitter
                </a>
                <a href="#" className="px-4 py-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Nome</label>
                <Input placeholder="Seu nome completo" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <Input type="email" placeholder="seu@email.com" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Telefone</label>
                <Input placeholder="(11) 98765-4321" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Assunto</label>
                <Input placeholder="Qual é o assunto?" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Mensagem</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  rows={5}
                  placeholder="Sua mensagem aqui..."
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-16 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-8">Perguntas Frequentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Qual é o tempo de entrega?",
                a: "Entregamos em todo o Brasil em 2-10 dias úteis, dependendo da localidade.",
              },
              {
                q: "Como rastrear meu pedido?",
                a: "Você receberá um código de rastreamento por email após o envio.",
              },
              {
                q: "Qual é a política de devolução?",
                a: "Aceitamos devoluções em até 30 dias após a compra, sem taxas adicionais.",
              },
              {
                q: "Quais são as formas de pagamento?",
                a: "Aceitamos cartão de crédito, débito, PIX e boleto bancário.",
              },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-lg bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
