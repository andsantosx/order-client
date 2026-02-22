import { useEffect, useRef } from 'react'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Tenta forçar o autoplay nativamente, que muitas vezes o iOS bloqueia
    // se for apenas via atributo, dependendo do modo de economia de energia.
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay preventted:", error)
      })
    }
  }, [])

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
        <video
          ref={videoRef}
          src="/home-mobile.mp4"
          poster="/home-mobile-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-top"
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
