import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { create as createContactMessage } from "@/services/contact/create"
import toast from "react-hot-toast"

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message
      });

      toast.success("Mensagem enviada com sucesso!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                      Criciúma - SC<br />
                      Brasil
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground">
                      <a href="https://wa.me/554898192343" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        +55 48 9819-2343
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:orderstoreco@gmail.com" className="hover:text-primary transition-colors">
                        orderstoreco@gmail.com
                      </a>
                    </p>
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
                <a
                  href="https://www.instagram.com/orderstore.co?igsh=MXhmdGZvemgyYjFvMA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border hover:border-primary/50 transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <span className="font-medium">@orderstore.co</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Nome</label>
                <Input
                  placeholder="Seu nome completo"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Telefone</label>
                <Input
                  placeholder="+55 48 9819-2343"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Assunto</label>
                <Input
                  placeholder="Qual é o assunto?"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Mensagem</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  rows={5}
                  placeholder="Sua mensagem aqui..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
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
                a: "Nossos produtos são importados e entregues em todo o Brasil com prazo médio de 15 a 45 dias úteis.",
              },
              {
                q: "Como rastrear meu pedido?",
                a: "Você receberá o código por email. O rastreio internacional pode levar de 3 a 5 dias para atualizar no sistema.",
              },
              {
                q: "Qual é a política de devolução?",
                a: "Aceitamos devoluções em até 7 dias corridos após o recebimento, conforme o Código de Defesa do Consumidor.",
              },
              {
                q: "Quais são as formas de pagamento?",
                a: "Aceitamos Cartão de Crédito (até 12x), PIX e Boleto Bancário via Mercado Pago.",
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
