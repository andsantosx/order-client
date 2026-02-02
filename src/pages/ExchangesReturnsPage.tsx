
export function ExchangesReturnsPage() {
    return (
        <div className="min-h-screen bg-background pt-28 pb-20">
            <div className="mx-auto max-w-[800px] px-8 lg:px-12">

                {/* Header Formal */}
                <header className="mb-12 border-b border-border/60 pb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
                        Política de Trocas e Devoluções
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Em conformidade com o Código de Defesa do Consumidor e LGPD.
                    </p>
                </header>

                {/* Conteúdo Texto Corrido */}
                <article className="prose prose-zinc dark:prose-invert max-w-none hover:prose-a:text-primary leading-relaxed text-foreground/90">

                    <p className="text-justify indent-0 mb-8">
                        Esta Política de Trocas e Devoluções está em conformidade com a legislação brasileira, incluindo o Código Civil (Lei nº 10.406/02), o Código de Defesa do Consumidor (Lei nº 8.078/90) e a Lei Geral de Proteção de Dados – LGPD (Lei nº 13.709/18).
                    </p>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-foreground mb-4">1. Transparência na Importação</h2>
                        <p className="text-justify indent-0 mb-4">
                            A <strong>ORDER</strong> atua intermediando a importação de produtos exclusivos através de parceiros internacionais (como CSSBuy e PandaBuy). Devido à natureza logística desta operação, nossos processos de troca e devolução possuem diretrizes específicas para garantir a transparência e a segurança de ambas as partes.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-foreground mb-4">2. Direito de Arrependimento</h2>
                        <p className="text-justify indent-0 mb-4">
                            Conforme o Artigo 49 do Código de Defesa do Consumidor, o cliente tem o direito de desistir da compra em até <strong>07 (sete) dias corridos</strong> após o recebimento do produto.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>O produto deve estar intacto, sem indícios de uso, com etiquetas originais e na embalagem original (ou similar que garanta a integridade).</li>
                            <li>A solicitação deve ser feita formalmente pelos nossos canais de atendimento antes do envio do produto.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-foreground mb-4">3. Trocas por Defeito ou Inconformidade</h2>
                        <p className="text-justify indent-0 mb-4">
                            Caso o produto apresente defeito de fabricação ou divergência do pedido original (tamanho, cor ou modelo incorretos), a ORDER assume a responsabilidade pela resolução.
                        </p>
                        <p className="text-justify indent-0">
                            O cliente deve entrar em contato em até <strong>07 dias corridos</strong> após o recebimento, enviando fotos e vídeos claros do defeito ou divergência para análise inicial. Após a validação, forneceremos as instruções para devolução e procederemos com o reembolso ou novo pedido, conforme disponibilidade.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-foreground mb-4">4. Procedimento de Devolução</h2>
                        <p className="text-justify indent-0 mb-4">
                            Devido aos altos custos e complexidade da logística reversa internacional para a China, a ORDER facilita o processo operando a devolução localmente no Brasil.
                        </p>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li><strong>Solicitação:</strong> Entre em contato via WhatsApp ou E-mail informando o número do pedido e o motivo.</li>
                            <li><strong>Análise:</strong> Nossa equipe avaliará a solicitação em até 3 dias úteis.</li>
                            <li><strong>Envio:</strong> Forneceremos uma etiqueta de postagem ou instruções para envio aos nossos endereços de suporte no Brasil.</li>
                            <li><strong>Conclusão:</strong> Após o recebimento e conferência do item devolvido, o reembolso será processado na mesma forma de pagamento original ou como crédito na loja, conforme escolha do cliente.</li>
                        </ol>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-foreground mb-4">5. Reembolsos</h2>
                        <p className="text-justify indent-0 mb-4">
                            Os reembolsos são processados após a conferência do produto devolvido:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Cartão de Crédito:</strong> O estorno poderá ocorrer em até duas faturas subsequentes, conforme regras da administradora do cartão.</li>
                            <li><strong>PIX ou Boleto:</strong> O reembolso será feito em conta corrente de mesma titularidade do comprador em até 10 dias úteis.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-xl font-bold text-foreground mb-4">6. Considerações Finais</h2>
                        <p className="text-justify indent-0">
                            Não realizamos trocas por escolha de tamanho errado feita pelo cliente, visto que disponibilizamos tabelas de medidas detalhadas. Recomendamos sempre verificar as medidas antes da compra. Ao finalizar um pedido na ORDER, o cliente declara estar ciente e de acordo com as normas aqui estabelecidas.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-border mt-12">
                        <p className="text-sm text-center text-muted-foreground">
                            Para iniciar um processo de troca ou devolução, fale conosco: <a href="https://wa.me/554898192343" target="_blank" rel="noopener noreferrer" className="font-bold text-foreground hover:text-primary transition-colors">+55 48 9819-2343</a> ou <a href="mailto:orderstoreco@gmail.com" className="font-bold text-foreground hover:text-primary transition-colors">orderstoreco@gmail.com</a>
                        </p>
                    </div>

                </article>
            </div>
        </div>
    )
}
