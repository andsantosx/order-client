import { useState } from "react"
import { Phone, Mail, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { create as createContactMessage } from "@/services/contact/create"
import toast from "react-hot-toast"
import ReCAPTCHA from "react-google-recaptcha"

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      toast.error("Por favor, valide o reCAPTCHA para continuar.");
      return;
    }

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
      // Reset reCAPTCHA (optional if we had the ref, but changing state hides the button temporarily)
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-16 flex items-center">
      <div className="mx-auto max-w-[1200px] w-full px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Side: Inspired Text */}
          <div className="space-y-8 lg:pr-10 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-5xl font-light text-foreground leading-[1.2]">
                Dúvidas sobre o seu <br className="hidden lg:block" />
                <span className="font-bold text-primary">pedido ou estilo?</span>
              </h1>
              <div className="w-full max-w-[200px] h-0.5 bg-primary mx-auto lg:mx-0"></div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                Nossa equipe está pronta para te ajudar. Envie sua mensagem e responderemos o mais rápido possível.
              </p>
            </div>

            {/* Subtle Contact Info below the text */}
            <div className="pt-8 space-y-4 inline-block text-left">
              <div className="flex items-center gap-4 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:orderstoreco@gmail.com" className="hover:text-primary transition-colors">
                  orderstoreco@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <a href="https://wa.me/554898192343" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  +55 48 9819-2343
                </a>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Instagram className="h-5 w-5 text-primary" />
                <a href="https://www.instagram.com/orderstore.co?igsh=MXhmdGZvemgyYjFvMA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  @orderstore.co
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-10 w-full max-w-xl mx-auto lg:mx-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Nome</label>
                <Input
                  className="bg-transparent border-input focus-visible:ring-primary shadow-sm h-11"
                  placeholder="Seu nome"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Telefone</label>
                  <Input
                    className="bg-transparent border-input focus-visible:ring-primary shadow-sm h-11"
                    placeholder="DDD + Telefone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">E-mail</label>
                  <Input
                    className="bg-transparent border-input focus-visible:ring-primary shadow-sm h-11"
                    type="email"
                    placeholder="E-mail"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Assunto</label>
                <Input
                  className="bg-transparent border-input focus-visible:ring-primary shadow-sm h-11"
                  placeholder="Qual é o assunto?"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Mensagem</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-input shadow-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-y min-h-[120px]"
                  placeholder="Escreva sua mensagem"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="pt-2 flex justify-center sm:justify-start">
                {/* 
                  Note: A key abaixo DEVE ser configurada na Vercel/Railway ou .env do Cliente como:
                  VITE_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
                */}
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "Chave_Nao_Configurada"}
                  onChange={(token) => setRecaptchaToken(token)}
                  theme="light"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-bold mt-4 transition-all active:scale-[0.99] shadow-md"
                disabled={isSubmitting || !recaptchaToken}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
