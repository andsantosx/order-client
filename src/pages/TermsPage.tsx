import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function TermsPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="mx-auto max-w-[800px] px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    to="/"
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-12"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para a Loja
                </Link>

                {/* Header Section */}
                <div className="mb-12 border-b pb-8">
                    <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-foreground mb-4">
                        Termos e Condições
                    </h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Última atualização: Julho de 2024. O uso continuado deste site implica na aceitação incondicional dos termos descritos a seguir.
                    </p>
                </div>

                {/* Typography Legal Content */}
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/80 space-y-10">
                    <section>
                        <h2 className="text-xl font-bold text-foreground tracking-wide uppercase mb-4">
                            1. Aceitação dos Termos
                        </h2>
                        <p className="leading-relaxed text-justify">
                            Bem-vindo(a) à ORDER. Ao acessar e utilizar nosso site, comprar nossos produtos ou interagir com nossa marca, você está concordando com estes Termos de Condições de Uso em sua integralidade. Caso discorde de qualquer cláusula aqui estabelecida, solicitamos que interrompa a navegação imediatamente.
                        </p>
                        <p className="leading-relaxed text-justify mt-4">
                            Reservamo-nos o direito de alterar intempestivamente ou remover porções destes termos a nosso critério, cabendo ao usuário revisar esta página periodicamente.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground tracking-wide uppercase mb-4">
                            2. Propriedade Intelectual e Direitos Autorais
                        </h2>
                        <p className="leading-relaxed text-justify">
                            Todo o conteúdo apresentado no site institucional e de e-commerce da ORDER, abrangendo mas não se limitando a fotografias, lookbooks, elementos gráficos, logotipos, identidades visuais estruturais, textos copywritings e código-fonte, são de propriedade exclusiva da ORDER e protegidos de forma irrestrita pelas leis de direitos autorais e de propriedade industrial vigentes no Brasil e internacionalmente.
                        </p>
                        <p className="leading-relaxed text-justify mt-4">
                            A reprodução não autorizada, cópia indevida, falsificação ou utilização de nossa marca e de nossos designs industriais para fins comerciais ou ilícitos incorrerá nas medidas legais e criminais cabíveis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground tracking-wide uppercase mb-4">
                            3. Natureza das Operações Comerciais
                        </h2>
                        <p className="leading-relaxed text-justify">
                            A ORDER atua com a representação, intermediação e curadoria dos melhores produtos do fornecedor global utilizando modelos híbridos de estocagem própria e logística internacional.
                        </p>
                        <ul className="list-disc pl-5 mt-4 space-y-2 text-justify">
                            <li>Os prazos de postagem e trânsito são meramente estimativos. Oscilações causadas por desembaraços aduaneiros fogem do controle primário da empresa, ainda que a responsabilidade final de entrega seja garantida.</li>
                            <li>Temos o compromisso inegociável de transparência quanto à localização física da remessa das caixas em trânsito asiático ou ocidental.</li>
                            <li>Todo custo tributário imputado pelo radar alfandegário ou fiscal (Taxas da Receita Federal) já se encontram provisionados por nossa contabilidade, assegurando ao consumidor final que não haverá valores adicionais no momento de retirada do objeto.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground tracking-wide uppercase mb-4">
                            4. Conta, Registro e Dados do Usuário
                        </h2>
                        <p className="leading-relaxed text-justify">
                            A criação de contas com titularidade fictícia (Fake Accounts) ou uso de cartões creditícios não reconhecidos é estritamente proibida e está atrelada à nossa matriz de detecção de fraudes.
                        </p>
                        <p className="leading-relaxed text-justify mt-4">
                            Ao se cadastrar na ORDER, você declara ativamente sua responsabilidade solidária quanto à veracidade, precisão e vigência das informações concedidas à base de dados. Nós nos responsabilizamos pelo sigilo criptográfico de sua senha bancária (hash) mediante as providências narradas em nossa Política de Privacidade baseada na LGPD.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground tracking-wide uppercase mb-4">
                            5. Limitação de Responsabilidade
                        </h2>
                        <p className="leading-relaxed text-justify">
                            Embora apliquemos os mais robustos esforços e servidores no intuito de manter o sistema 99,9% responsivo (uptime), a ORDER não garante que suas plataformas digitais, navegação e trânsito por IP estarão ilesas de ataques de denegação (DDoS) ou manutenções imprevistas.
                        </p>
                        <p className="leading-relaxed text-justify mt-4">
                            Sob nenhuma justificativa seremos responsabilizados por perdas de lucros cessantes, perdas punitivas, incidentais ou indiretas derivadas do uso indiscriminado da plataforma.
                        </p>
                    </section>

                    <section className="bg-secondary/30 p-6 rounded-lg mt-8 border border-border">
                        <h3 className="text-lg font-bold text-foreground uppercase tracking-wide mb-2">Comunicação e Foro</h3>
                        <p className="text-sm leading-relaxed mb-4 text-justify">
                            Para sanear discordâncias quanto à validade jurídica ou dúvidas interpretativas acerca destes Termos e Condições, o consumidor poderá dialogar com nossa diretoria por meio da aba <Link to="/contato" className="underline font-semibold text-foreground">CONTATO</Link>.
                        </p>
                        <p className="text-sm leading-relaxed text-justify">
                            Elege-se o Foro da Comarca da capital de fundação da ORDER (Criciúma/SC) como competente para dirimir quaisquer litígios oriundos do uso deste sistema de e-commerce e interpretações contratuais adstritas a ele, renunciando-se a qualquer outro privilegiado.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
