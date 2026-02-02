
export function ExchangesReturnsPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center uppercase tracking-tight">
                    Trocas e Devoluções
                </h1>

                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
                    <p>
                        Pensando na sua melhor satisfação quando realiza alguma compra aqui na <strong>ORDER</strong>, nós desenvolvemos essa página onde explica a política de Trocas e Devoluções do(os) produto(os) seguindo o código de Defesa do Consumidor de uma forma clara e descomplicada.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mt-8 mb-4">Prazos</h2>
                        <p>
                            Para Trocas e Devoluções, os produtos devem ser devolvidos em até <strong>07 dias corridos</strong> a partir da data de recebimento.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mt-8 mb-4">Como Solicitar</h2>
                        <p>Você deve acessar a página Trocas e Devoluções:</p>
                        <ol className="list-decimal pl-6 space-y-2 mt-4">
                            <li>Inserir seus dados pessoais e o número do pedido;</li>
                            <li>Escolha o(s) produto(s) que deseja devolver especificando o motivo. Você pode trocar quantos itens quiser de uma mesma compra;</li>
                            <li>Selecione as opções e confirme seu endereço.</li>
                        </ol>
                        <p className="mt-4">
                            Toda comunicação será realizada por e-mail, portanto, verifique se o seu endereço e dados de cadastro estão corretos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mt-8 mb-4">Avaliação e Reembolso</h2>
                        <p>
                            Após recebermos o pacote, nossa equipe irá avaliar se o(s) produto(s) atende(m) ao(s) requisito(s) e em até <strong>12 (doze) dias úteis</strong> atualizaremos você por e-mail.
                        </p>
                        <p className="mt-4">
                            Será gerado um cupom no valor integralmente pago pelo(s) artigo(s) devolvido(s) para que você possa escolher outro artigo a sua escolha no site. O cupom é valido por 6 meses e o uso é pessoal e intransferível.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mt-8 mb-4">Cuidados ao embalar</h2>
                        <p>
                            Devolução só será aceita se o(s) artigo(s) estiver na mesma condição de recebimento, sem nenhuma alteração da natureza do produto devido ao manuseio (sujeira), e com os tags intactos fixados ao artigo.
                        </p>
                        <p className="mt-4">
                            O(s) produto(s) deve(m) ser embalado(s) utilizando a embalagem original ou outro tipo de embalagem. Lembre-se de lacrar bem a embalagem!
                        </p>
                        <p className="mt-4">
                            A <strong>ORDER</strong> não se responsabiliza caso a devolução não seja efetivada em razão do mau acondicionamento do(s) produto(s) pelo cliente. Também é de responsabilidade do cliente garantir que o(s) produto(s) embalado(s) corresponde(m) ao(s) produto(s) da solicitação de devolução. A <strong>ORDER</strong> não possui gerência por produto(s) que seja(m) acondicionado(s) ou entregue(s) para devolução de forma incorreta por seus clientes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mt-8 mb-4">Condições Gerais</h2>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>A <strong>ORDER</strong> não garante a troca do produto caso não sejam observadas as regras da Política de Troca e e-mails de postagem.</li>
                            <li>Não é possível trocar itens de pedidos diferentes em uma mesma solicitação de troca. Para cada pedido gerado, o cliente deve abrir uma solicitação diferente.</li>
                            <li>A disponibilidade dos produtos para troca será conforme o estoque dos nossos fornecedores internacionais (PandaBuy/CSSBuy).</li>
                        </ul>
                    </section>

                    <section className="bg-secondary/10 p-6 rounded-lg border border-border mt-8">
                        <h3 className="font-bold text-foreground mb-2">Ficou com alguma dúvida?</h3>
                        <p>Fale conosco pelo WhatsApp: <a href="https://wa.me/554898192343" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary transition-colors">+55 48 9819-2343</a> ou Email: <a href="mailto:orderstoreco@gmail.com" className="font-bold hover:text-primary transition-colors">orderstoreco@gmail.com</a></p>
                    </section>

                    <p className="text-sm text-muted-foreground mt-8 border-t border-border pt-8">
                        A presente Política de Troca e Devolução está de acordo com a Legislação Brasileira, em especial, com o Código Civil (Lei 10.406/02), o Código de Defesa do Consumidor (Lei 8.078/90) e a Lei Geral de Proteção de Dados (Lei 13.709/18).
                    </p>
                </div>
            </div>
        </div>
    )
}
