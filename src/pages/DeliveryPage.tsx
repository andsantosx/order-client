export function DeliveryPage() {
    return (
        <div className="min-h-screen bg-background pt-28 pb-20">
            <div className="mx-auto max-w-[800px] px-8 lg:px-12">

                {/* Header Formal */}
                <header className="mb-12 border-b border-border/60 pb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
                        Política de Entrega
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Em conformidade com o Código de Defesa do Consumidor e Tratamento Aduaneiro.
                    </p>
                </header>

                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
                    <p className="text-justify indent-0 mb-8">
                        A presente <strong>Política de Entrega</strong> ("Política") regulamenta o processo de despacho, trânsito e entrega dos produtos comercializados pela <strong>ORDER</strong> ("Lojista") através do modelo de importação direta (Dropshipping) e intermediação com parceiros logísticos internacionais.
                    </p>

                    <p className="text-justify indent-0 mb-8">
                        Ao realizar uma compra em nosso site, o Cliente concorda plenamente com os termos, condições e metodologias logísticas dispostas neste documento, as quais estão em conformidade com as legislações vigentes e Código de Defesa do Consumidor.
                    </p>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-foreground mb-4">1. Modelo de Importação e Logística Intermediada</h2>
                        <p className="text-justify indent-0 mb-4">
                            Nossa operação é baseada na modalidade de importação sob demanda. Os produtos disponibilizados em nosso catálogo são fabricados e enviados diretamente das instalações de nossos fornecedores rigorosamente homologados, localizados primariamente no continente Asiático. Utilizamos prestadores logísticos consolidados, tais como <em>PandaBuy</em> e <em>CSSBuy</em>, para a garantia de qualidade aduaneira e empacotamento.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-foreground mb-4">2. Prazos Estipulados</h2>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li className="text-justify">
                                <strong>Processamento Aduaneiro Inicial (Separação e Postagem):</strong> O prazo para controle de qualidade, faturamento, recebimento interno e dispatch logístico ao armazém das portadoras internacionais é de até <strong>2 (dois) a 5 (cinco) dias úteis</strong> após a definitiva confirmação do pagamento integral.
                            </li>
                            <li className="text-justify">
                                <strong>Trânsito Internacional e Prazo Estimado de Entrega:</strong> O transporte aéreo até o Brasil aliado à distribuição interurbana realizada fundamentalmente pela Empresa Brasileira de Correios e Telégrafos ("Correios"), perfaz um prazo estimado de <strong>15 a 45 dias úteis</strong> contados a partir da emissão do rastreio.
                            </li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-foreground mb-4">3. Acompanhamento e Rastreabilidade</h2>
                        <p className="text-justify indent-0 mb-4">
                            Após a conclusão da expedição tarifária (emissão aduaneira de saída), será facultado ao Cliente um Código de Rastreio de padrão internacional (podendo englobar modalidades rastreáveis locais assim que ingressas no país).
                        </p>
                        <p className="text-justify indent-0 mb-4">
                            <strong>Aviso Importante:</strong> Transcorrem de costume entre 3 (três) e 7 (sete) dias úteis entre o envio físico do pacote e a indexação digital da encomenda nos sistemas informatizados dos Correios no Brasil ou correios locais precursores, portanto o seu rastreamento poderá apresentar falta de informações nesses primeiros dias.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-foreground mb-4">4. Regras sobre o Endereço de Recebimento</h2>
                        <p className="text-justify indent-0 mb-4">
                            A acuidade quanto aos dados de entrega fornecidos durante a etapa de fechamento ("Checkout") incidem única e exclusivamente como ônus mitigado do Cliente comprador:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li className="text-justify">A ORDER isenta-se da responsabilização por entregas falhas oriundas de fornecimento errôneo, incompleto ou não especificado do logradouro.</li>
                            <li className="text-justify">Havendo devolução do bem mercante ao remetente originário fora do Brasil em razão de endereço inválido ou carteiro não atendido após múltiplas tentativas, as taxas subsidiárias de uma eventual segunda postagem incorrerão sob titularidade do requisitante.</li>
                            <li className="text-justify">Fica a critério exclusivo dos Correios e suas agências conveniadas estipular a necessidade imperativa de retirada no balcão de agência caso julguem a região de entrega como área de distribuição com restrição ("Área de Risco"). Tais disposições geográficas fogem do enquadramento e ingerência da plataforma de e-commerce da Lojista.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-foreground mb-4">5. Taxações Alfandegárias e Tributos Retidos</h2>
                        <p className="text-justify indent-0 mb-4">
                            Toda importação no território nacional está sujeita à intervenção primária da Receita Federal do Brasil (RFB). Na esmagadora estatística, nossos despachos utilizam modalidades que contam com antecipação de remessas e trâmites isentos ou mitigados pelo programa do Governo ("Remessa Conforme"). Entretanto:
                        </p>
                        <p className="text-justify indent-0 mb-4">
                            Caso ocorra uma taxação ostensiva ou taxa de despacho postal extraordinária na referida mercadoria importada, <strong>nós, da ORDER, nos responsabilizamos pelo pagamento integral do tributo</strong>. O Cliente não deverá realizar o pagamento de eventuais boletos gerados pela alfândega. Solicitamos apenas que o Cliente nos notifique imediatamente através de nossos canais de suporte enviando o código de rastreio, para que a nossa equipe providencie o pagamento da guia e a rápida liberação do pacote.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-xl font-bold text-foreground mb-4">6. Força Maior e Intempéries Acidentais</h2>
                        <p className="text-justify indent-0">
                            O prazo de entrega é constituído de mera estimativa de cunho probabilístico médio. Pode esse cronograma sofrer hiatos temporais não imputáveis à ORDER, os quais incluem preceitos de força maior (tais quais pandemias, greves alfandegárias, paralisações estatais dos Correios ou avarias massivas de infraestrutura local, enchentes, etc). Nesses casos justificados não se configurará como inadimplemento contratual a priori do provedor logístico intermediano, estando a Lojista focada em acompanhar de bom grado a estabilização para o exímio remate da entrega.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-border mt-12">
                        <p className="text-sm text-center text-muted-foreground">
                            Reservados os direitos judiciais e legais à ORDER pertinente à revisão ou alteração desse documento. Para suporte ou interpelação prévia favor contatar: <a href="mailto:orderstoreco@gmail.com" className="font-bold text-foreground hover:text-primary transition-colors">orderstoreco@gmail.com</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
