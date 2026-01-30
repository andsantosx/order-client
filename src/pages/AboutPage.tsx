import { Award, Heart, Leaf, Users } from "lucide-react"

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Sobre a ORDER
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos uma marca comprometida com qualidade, estilo e sustentabilidade. Desde 2024, entregamos moda de excelência para quem ousa ser diferente.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-2xl bg-card border border-border">
            <Award className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Missão</h3>
            <p className="text-muted-foreground">
              Oferecer roupas e acessórios de alta qualidade, com design inovador e preços acessíveis, elevando o estilo pessoal de cada cliente.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-card border border-border">
            <Heart className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Visão</h3>
            <p className="text-muted-foreground">
              Ser a marca de moda preferida do Brasil, conhecida pela qualidade, inovação e compromisso com sustentabilidade.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-card border border-border">
            <Leaf className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Valores</h3>
            <p className="text-muted-foreground">
              Qualidade, integridade, inovação, sustentabilidade e responsabilidade social são os pilares da nossa empresa.
            </p>
          </div>
        </div>

        {/* History */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Nossa História</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ORDER nasceu de uma paixão por moda contemporânea e um compromisso com a qualidade. Começamos pequenos, com uma visão clara: criar roupas que não apenas acompanhem as tendências, mas que as definam.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Através dos anos, crescemos mantendo nossos valores principais: qualidade impecável, design inovador e atendimento ao cliente excepcional.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Hoje, servimos milhares de clientes em todo o Brasil, sempre buscando trazer o melhor da moda mundial com um toque brasileiro único.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 h-96 flex items-center justify-center">
            <p className="text-center text-6xl font-bold text-primary/20">2024</p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Nossa Equipe</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Carolina Silva", role: "CEO & Founder" },
              { name: "Bruno Santos", role: "Design Director" },
              { name: "Ana Costa", role: "Operations Manager" },
              { name: "Marcus Lima", role: "Marketing Lead" },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary/50" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Compromisso com a Sustentabilidade</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">🌍 Materiais Eco-Friendly</h4>
              <p className="text-muted-foreground text-sm">Utilizamos materiais sustentáveis e fornecedores certificados.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">♻️ Embalagem Reciclável</h4>
              <p className="text-muted-foreground text-sm">100% das nossas embalagens são recicláveis ou biodegradáveis.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">👥 Responsabilidade Social</h4>
              <p className="text-muted-foreground text-sm">Apoiamos comunidades locais e programas de educação.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">⚡ Energia Limpa</h4>
              <p className="text-muted-foreground text-sm">Nossas operações utilizam 100% energia renovável.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
