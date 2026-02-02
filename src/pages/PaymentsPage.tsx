
export function PaymentsPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="mx-auto max-w-[800px] px-8 lg:px-12">

                {/* Header with clear separation */}
                <header className="mb-16 border-b border-border/60 pb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
                        Políticas de Pagamento e Segurança
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-muted-foreground">
                        <p>Documento Oficial ORDER</p>
                        <p>Atualizado em: 02 de Fevereiro de 2026</p>
                    </div>
                </header>

                {/* Main Content with improved Typography and Spacing */}
                <article className="space-y-16 text-foreground leading-relaxed">

                    {/* Introduction */}
                    <div className="text-lg text-muted-foreground font-medium border-l-4 border-primary pl-6 py-1">
                        <p>
                            A <strong>ORDER</strong> estabelece através deste documento suas diretrizes operacionais referente ao processamento de pagamentos e segurança da informação, reafirmando seu compromisso com a transparência.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-8 pb-2 border-b border-border/40 inline-block pr-12">
                            1. Modalidades de Pagamento
                        </h2>

                        <div className="space-y-10 pl-2">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                                    <span className="text-primary/60 font-mono text-sm">1.1</span> Cartão de Crédito
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Aceitamos as principais bandeiras nacionais e internacionais através de checkout transparente.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground marker:text-primary/50">
                                    <li><strong className="text-foreground">Parcelamento:</strong> Disponível em até 12x (doze vezes) sem juros.</li>
                                    <li><strong className="text-foreground">Aprovação:</strong> Processamento imediato, sujeito à análise de crédito.</li>
                                    <li><strong className="text-foreground">Segurança:</strong> Dados protegidos por criptografia de ponta a ponta.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                                    <span className="text-primary/60 font-mono text-sm">1.2</span> PIX (Pagamento Instantâneo)
                                </h3>
                                <p className="text-muted-foreground mb-3">
                                    Método desenvolvido pelo Banco Central. Ao finalizar a compra, um <strong>QR Code</strong> e uma chave aleatória serão gerados.
                                </p>
                                <p className="text-sm text-foreground bg-secondary/50 p-4 rounded-lg border-l-4 border-primary">
                                    <strong>Nota:</strong> O pagamento deve ser realizado dentro de 30 minutos para garantir a reserva imediata dos produtos selecionados.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                                    <span className="text-primary/60 font-mono text-sm">1.3</span> Boleto Bancário
                                </h3>
                                <p className="text-muted-foreground">
                                    Opção para pagamento à vista com registro. Pode ser pago em qualquer rede bancária ou lotérica até o vencimento. A compensação ocorre em <strong>1 a 3 dias úteis</strong>.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-8 pb-2 border-b border-border/40 inline-block pr-12">
                            2. Segurança e Infraestrutura
                        </h2>

                        <div className="space-y-10 pl-2">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                                    <span className="text-primary/60 font-mono text-sm">2.1</span> Proteção de Dados (SSL)
                                </h3>
                                <p className="text-muted-foreground">
                                    Todo tráfego é protegido por certificado <strong>SSL (Secure Socket Layer)</strong> de 256 bits, garantindo que informações pessoais trafeguem criptografadas.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                                    <span className="text-primary/60 font-mono text-sm">2.2</span> Privacidade de Senhas
                                </h3>
                                <p className="text-muted-foreground">
                                    Utilizamos hashing avançado (algoritmo <strong>bcrypt</strong>) para proteção de credenciais. Nenhuma senha é armazenada em formato legível em nossos servidores.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-8 pb-2 border-b border-border/40 inline-block pr-12">
                            3. Política de Dados Sensíveis
                        </h2>

                        <div className="bg-card border border-border/50 rounded-xl p-8 space-y-4">
                            <p className="font-medium text-foreground">
                                Conformidade PCI-DSS
                            </p>
                            <p className="text-muted-foreground">
                                A <strong>ORDER</strong> não processa, armazena ou tem acesso aos dados completos do seu cartão de crédito.
                            </p>
                            <ol className="list-decimal pl-6 space-y-3 text-muted-foreground marker:text-foreground/70">
                                <li>Os dados são enviados diretamente ao adquirente (Mercado Pago).</li>
                                <li>Nosso sistema recebe apenas um token de autorização.</li>
                                <li>O código de segurança (CVV) jamais é salvo após a transação.</li>
                            </ol>
                        </div>
                    </section>

                </article>

            </div>
        </div>
    )
}
