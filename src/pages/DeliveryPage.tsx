
import { Truck, Globe, Package, Clock } from "lucide-react";

export function DeliveryPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center uppercase tracking-tight">
                    Políticas de Entrega
                </h1>

                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
                    <p className="text-lg text-center max-w-3xl mx-auto">
                        A <strong>ORDER</strong> atua no modelo de importação direta, conectando você aos melhores fornecedores internacionais através de parceiros logísticos confiáveis como PandaBuy e CSSBuy. Garantimos a qualidade e a entrega do seu produto.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-16">
                        <div className="bg-card p-6 rounded-xl border border-border flex flex-col items-center text-center">
                            <Globe className="w-10 h-10 text-primary mb-4" />
                            <h3 className="font-bold text-foreground mb-2">Origem Inter.</h3>
                            <p className="text-xs">Produtos enviados diretamente dos nossos centros de distribuição na Ásia.</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border flex flex-col items-center text-center">
                            <Clock className="w-10 h-10 text-primary mb-4" />
                            <h3 className="font-bold text-foreground mb-2">Prazo de Entrega</h3>
                            <p className="text-xs">Média de <strong>15 a 45 dias úteis</strong> após a postagem.</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border flex flex-col items-center text-center">
                            <Package className="w-10 h-10 text-primary mb-4" />
                            <h3 className="font-bold text-foreground mb-2">Rastreamento</h3>
                            <p className="text-xs">Código de rastreio internacional fornecido em até 7 dias.</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border flex flex-col items-center text-center">
                            <Truck className="w-10 h-10 text-primary mb-4" />
                            <h3 className="font-bold text-foreground mb-2">Entrega Local</h3>
                            <p className="text-xs">Finalizada pelos Correios do Brasil no seu endereço.</p>
                        </div>
                    </div>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mt-8 mb-4">Processo de Envio</h2>
                        <ol className="list-decimal pl-6 space-y-4 mt-4">
                            <li>
                                <strong>Processamento do Pedido (2-5 dias úteis):</strong> Após a confirmação do pagamento, seu pedido é enviado para nossos fornecedores (via PandaBuy ou CSSBuy) para separação e controle de qualidade.
                            </li>
                            <li>
                                <strong>Envio Internacional:</strong> O produto é despachado e você recebe o código de rastreio. Nesta etapa, o código pode levar alguns dias para ser reconhecido pelos sistemas de rastreamento brasileiros.
                            </li>
                            <li>
                                <strong>Trânsito e Alfândega:</strong> O pacote viaja para o Brasil e passa pela fiscalização aduaneira. Em casos raros de taxação, a responsabilidade poderá ser compartilhada ou analisada caso a caso, conforme nossas políticas.
                            </li>
                            <li>
                                <strong>Entrega Final:</strong> Após a liberação, os Correios realizam a entrega no seu endereço.
                            </li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mt-8 mb-4">Observações Importantes</h2>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Certifique-se de que o endereço de entrega cadastrado está correto. Não nos responsabilizamos por endereços incompletos ou incorretos.</li>
                            <li>É necessário ter alguém no local para receber a encomenda (ou retirar na agência dos Correios, caso indicado).</li>
                            <li>Devido a fatores externos (greves, clima, épocas festivas), o prazo pode sofrer alterações pontuais.</li>
                        </ul>
                    </section>

                    <p className="text-sm text-center pt-8 border-t border-border">
                        Ficou com dúvidas sobre o seu pedido? Entre em contato pelo WhatsApp: <a href="https://wa.me/554898192343" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary transition-colors">+55 48 9819-2343</a> ou Email: <a href="mailto:orderstoreco@gmail.com" className="font-bold hover:text-primary transition-colors">orderstoreco@gmail.com</a>
                    </p>

                </div>
            </div>
        </div>
    )
}
