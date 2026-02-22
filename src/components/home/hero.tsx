import { useEffect, useRef } from 'react'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Busca a tag de vídeo inserida via innerHTML para forçar autoplay no iOS
    const divElement = videoRef.current as unknown as HTMLDivElement;
    if (divElement) {
      const videoEl = divElement.querySelector('video');
      if (videoEl) {
        // iOS Safari workaround: mute explicitly before play
        videoEl.muted = true;
        videoEl.play().catch((error) => {
          console.log("Autoplay prevented (likely Low Power Mode):", error)

          // Fallback supremo: Tentar rodar o vídeo na primeira interação do usuário na tela
          const playOnInteract = () => {
            videoEl.play().then(() => {
              // Se conseguiu tocar, removemos os listeners
              window.removeEventListener('touchstart', playOnInteract);
              window.removeEventListener('scroll', playOnInteract);
              window.removeEventListener('click', playOnInteract);
            }).catch(() => { });
          };

          // Adiciona os listeners de interação
          window.addEventListener('touchstart', playOnInteract, { once: true });
          window.addEventListener('scroll', playOnInteract, { once: true });
          window.addEventListener('click', playOnInteract, { once: true });
        })
      }
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
          disablePictureInPicture
          onCanPlay={(e) => {
            e.currentTarget.play().catch(() => { });
          }}
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
