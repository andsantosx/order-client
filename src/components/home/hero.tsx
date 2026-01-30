export function Hero() {
  return (
    <section className="relative w-full bg-background">
      {/* Main Hero Container */}
      <div className="relative h-screen min-h-[600px] max-h-[750px] overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/home.png')`
          }}
        />

        {/* Overlay muito sutil */}
        <div className="absolute inset-0 bg-black/10" />

        {/* CTA Esquerda - Mais para o centro e maior */}
        <a
          href="/loja"
          className="absolute left-16 lg:left-40 xl:left-52 top-1/2 -translate-y-1/2 group z-10"
        >
          <div className="text-white">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl lg:text-3xl font-light">+</span>
              <span className="text-3xl lg:text-4xl font-bold tracking-wider">ORDER</span>
            </div>
            <p className="text-lg lg:text-xl font-normal tracking-widest opacity-90 ml-10 lg:ml-12">SHOP NOW</p>
          </div>
        </a>

        {/* CTA Direita - Mais para o centro e maior */}
        <a
          href="/loja?sort=newest"
          className="absolute right-16 lg:right-40 xl:right-52 top-1/2 -translate-y-1/2 text-right group z-10"
        >
          <div className="text-white text-right">
            <div className="flex items-center justify-end gap-4 mb-2">
              <span className="text-3xl lg:text-4xl font-bold tracking-wider">AVALIABLE</span>
              <span className="text-2xl lg:text-3xl font-light">+</span>
            </div>
            <p className="text-lg lg:text-xl font-normal tracking-widest opacity-90 mr-10 lg:mr-12">NEW COLLECTION</p>
          </div>
        </a>
      </div>
    </section>
  )
}
