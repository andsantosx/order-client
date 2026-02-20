
export function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="mx-auto max-w-[800px] px-8 lg:px-12">

        {/* Header Formal */}
        <header className="mb-12 border-b border-border/60 pb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Sobre a ORDER
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Carta de Fundação</p>
            <p>Autoria: Anderson Santos</p>
          </div>
        </header>

        {/* Conteúdo Texto Corrido */}
        <article className="prose prose-zinc dark:prose-invert max-w-none hover:prose-a:text-primary leading-relaxed text-foreground/90">
          <p className="indent-8 text-justify">
            A <strong>ORDER</strong> foi concebida inicialmente não apenas como um empreendimento comercial, mas como um projeto de aplicação prática de engenharia de software. Idealizada por <strong>Anderson Santos</strong> e <strong>Luiz Gustavo Daniel</strong>, a iniciativa surgiu do desejo de transpor as barreiras teóricas da academia e materializar conhecimentos técnicos em uma plataforma real, robusta e centrada no usuário.
          </p>

          <p className="indent-8 text-justify">
            A arquitetura de segurança, projetada por <strong>Anderson Santos</strong>, tratou a proteção de dados e transações financeiras como requisitos prioritários. Implementamos protocolos de criptografia avançados e práticas de desenvolvimento seguro (DevSecOps) para assegurar que cada interação do usuário ocorra em um ambiente blindado contra vulnerabilidades.
          </p>

          <p className="indent-8 text-justify">
            A materialização da interface e experiência do usuário foi liderada por <strong>Lorenzo Severo Gotuzzo</strong>, responsável pelo desenvolvimento do <em>Software Web Frontend</em>. Sua expertise foi determinante para criar uma identidade visual fluida e intuitiva. Na frente operacional e estratégica, <strong>Luiz Gustavo Daniel</strong>, além de co-idealizador, conduz a gestão logística com rigor acadêmico, garantindo a excelência na entrega dos produtos.
          </p>

          <p className="indent-8 text-justify">
            A plataforma foi estruturada para romper com o padrão de mercado, frequentemente saturado por sites de compra genéricos e com lacunas de segurança. A <strong>ORDER</strong> foi criada com o propósito de unir <em>Software</em> e Moda em um conceito atual, onde a tecnologia não é apenas um suporte, mas parte integrante de uma harmonia estética e funcional.
          </p>

          <p className="indent-8 text-justify">
            Nosso compromisso é manter essa evolução constante, provando que a engenharia de software, quando aplicada com rigor, cria ambientes digitais que protegem, encantam e respeitam a individualidade de cada cliente.
          </p>

          <br />

          <div className="flex flex-col items-end mt-12 pt-8 border-t border-border/30">
            <p className="font-bold text-lg">Anderson Santos</p>
            <p className="text-sm text-muted-foreground italic">Fundador & Engenheiro de Software</p>
          </div>
        </article>

      </div>
    </div>
  )
}
