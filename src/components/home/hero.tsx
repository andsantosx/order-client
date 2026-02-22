export function Hero() {
  return (
    <section className="relative w-full bg-background">
      {/* Main Hero Container */}
      <div className="relative h-screen min-h-[400px] max-h-[570px] overflow-hidden bg-black">

        {/* Background Image - Desktop */}
        <img
          src="/home.jpg"
          alt="Hero Background"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Background Video - Mobile */}
        <div
          className="block md:hidden absolute inset-0 w-full h-full pointer-events-none"
          dangerouslySetInnerHTML={{
            __html: `
              <video
                src="/home-mobile.mp4"
                poster="/home-mobile-poster.jpg"
                autoplay
                loop
                muted
                playsinline
                class="w-full h-full object-cover object-top"
              ></video>
            `
          }}
        />

        {/* Overlay muito sutil */}
        <div className="absolute inset-0 bg-black/10" />

        {/* CTA Esquerda - Mais para o centro e maior */}
        <a
          href="/loja"
          className="hidden md:block absolute left-8 lg:left-24 xl:left-32 top-1/2 -translate-y-1/2 group z-10"
        >
          <div className="text-white">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl lg:text-3xl font-light">+</span>
              <span className="text-3xl lg:text-4xl font-bold tracking-wider">ORDER</span>
            </div>
            <p className="text-lg lg:text-xl font-normal tracking-widest opacity-90 ml-10 text-primary lg:ml-12">SHOP NOW</p>
          </div>
        </a>

        {/* CTA Direita - Mais para o centro e maior */}
        <a
          href="/loja"
          className="hidden md:block absolute right-8 lg:right-24 xl:right-32 top-1/2 -translate-y-1/2 text-right group z-10"
        >
          <div className="text-white text-right">
            <div className="flex items-center justify-end gap-4 mb-2">
              <span className="text-3xl lg:text-4xl font-bold text-primary tracking-wider">AVAILABLE</span>
              <span className="text-2xl lg:text-3xl text-primary font-light">+</span>
            </div>
            <p className="text-lg lg:text-xl font-normal tracking-widest opacity-90 mr-10 lg:mr-12">NEW COLLECTION</p>
          </div>
        </a>
      </div>
    </section>
  )
}
