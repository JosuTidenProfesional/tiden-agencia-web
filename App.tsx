/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroScene, AgencyImageScene } from './components/QuantumScene';
import { ProcessDiagram, IndustriesGrid, PricingPackages, ResultsCarousel } from './components/Diagrams';
import { ArrowDown, Menu, X, Instagram, Mail, ChevronDown, ChevronUp, ClipboardCheck, Compass, Video, GraduationCap, Palette, ShoppingCart } from 'lucide-react';
import CotizadorModal from './components/CotizadorModal'; 

const AuthorCard = ({ name, role, desc, delay, image }: { name: string, role: string, desc: string, delay: string, image: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-sm hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <div className="w-64 h-80 mb-8 rounded-2xl overflow-hidden border border-stone-100 shadow-sm group-hover:shadow-md group-hover:border-nobel-gold/40 transition-all duration-500 relative">
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors z-10"/>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
      </div>

      <h3 className="font-serif text-2xl text-stone-900 text-center mb-2">{name}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed mb-4">{role}</p>
      <p className="text-sm text-stone-600 text-center leading-relaxed font-light">
        {desc}
      </p>
    </div>
  );
};

const CustomServiceAccordion = ({ onOpenCotizador }: { onOpenCotizador: () => void }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const services = [
        {
            title: "Asesoría y Diagnóstico de Contenido",
            icon: <ClipboardCheck size={20} />,
            description: "Ideal si sientes estancamiento o desorden visual. Realizamos una auditoría profunda de tus redes actuales para identificar bloqueos, analizar la coherencia estética y brindarte recomendaciones estratégicas y accionables para optimizar tu presencia."
        },
        {
            title: "Estrategia Integral y Planificación",
            icon: <Compass size={20} />,
            description: "Un estudio exhaustivo de la identidad de tu marca (misión, visión, tono de comunicación y estilo gráfico). Desarrollamos la hoja de ruta completa: grillas de contenido, pilares temáticos y un calendario editorial para definir tus próximas acciones con claridad."
        },
        {
            title: "Producción Audiovisual",
            icon: <Video size={20} />,
            description: "Servicio de grabación y edición profesional. Creamos piezas audiovisuales de alto impacto (hasta 80 segundos) optimizadas específicamente para formatos verticales (Reels/TikTok), enfocadas en la narrativa de marca y retención de audiencia."
        },
        {
            title: "Formación en Creación de Contenido",
            icon: <GraduationCap size={20} />,
            description: "Sesiones educativas personalizadas para marcas personales, dueños de negocios y equipos internos. Te enseñamos a dominar la estrategia, las técnicas de grabación con móvil y la edición ágil para que tomes el control de tu comunicación."
        },
        {
            title: "Servicios Gráficos Adicionales",
            icon: <Palette size={20} />,
            description: "Soluciones visuales complementarias para fortalecer tu identidad. Incluye diseño gráfico especializado para carruseles educativos (LinkedIn/Instagram) y fotografía profesional de producto o lifestyle."
        }
    ];

    return (
        <div className="max-w-3xl mx-auto w-full text-left">
            {services.map((service, index) => {
                const isActive = activeIndex === index;
                const styleType = index % 3; 
                
                let containerClass = "mb-4 rounded-lg overflow-hidden border transition-all duration-300 ";
                let buttonClass = "w-full flex items-center justify-between p-5 text-left transition-colors ";
                let iconClass = "p-2 rounded-full ";
                let titleClass = "font-serif text-lg ";
                let chevronClass = "";
                let contentClass = "p-5 pt-0 text-sm leading-relaxed border-t ";
                let quoteClass = "cursor-pointer text-xs font-bold hover:underline uppercase tracking-widest flex items-center gap-1 ";

                if (styleType === 1) { 
                     containerClass += "bg-[#F9F8F4] border-stone-200 hover:border-stone-300";
                     buttonClass += isActive ? "bg-stone-200/50" : "hover:bg-stone-200/30";
                     iconClass += isActive ? "bg-stone-800 text-white" : "bg-stone-200 text-stone-600";
                     titleClass += isActive ? "text-stone-900" : "text-stone-800";
                     chevronClass = "text-stone-400";
                     contentClass += "text-stone-600 border-stone-300";
                     quoteClass += "text-nobel-gold";
                } else if (styleType === 2) { 
                     containerClass += "bg-nobel-gold border-yellow-600/20 hover:border-yellow-600/40";
                     buttonClass += isActive ? "bg-black/10" : "hover:bg-black/5";
                     iconClass += isActive ? "bg-white text-nobel-gold" : "bg-black/10 text-white";
                     titleClass += "text-white";
                     chevronClass = "text-white/80";
                     contentClass += "text-white/90 border-white/20";
                     quoteClass += "text-stone-900";
                } else { 
                     containerClass += "bg-stone-800 border-stone-700 hover:border-stone-600";
                     buttonClass += isActive ? "bg-stone-700/50" : "hover:bg-stone-700/30";
                     iconClass += isActive ? "bg-nobel-gold text-white" : "bg-stone-900 text-stone-400";
                     titleClass += isActive ? "text-white" : "text-stone-300";
                     chevronClass = "text-stone-500";
                     contentClass += "text-stone-400 border-stone-700/50";
                     quoteClass += "text-nobel-gold";
                }

                return (
                    <div key={index} className={containerClass}>
                        <button 
                            onClick={() => setActiveIndex(isActive ? null : index)}
                            className={buttonClass}
                        >
                            <div className="flex items-center gap-4">
                                <span className={iconClass}>
                                    {service.icon}
                                </span>
                                <span className={titleClass}>
                                    {service.title}
                                </span>
                            </div>
                            <span className={chevronClass}>
                                {isActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </span>
                        </button>
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className={contentClass}>
                                        <div className="mt-4">
                                            {service.description}
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button onClick={onOpenCotizador} className={quoteClass}>
                                                Cotizar este servicio <ArrowDown size={12} className="-rotate-90" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCotizador, setShowCotizador] = useState(false); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      <AnimatePresence>
        {showCotizador && (
            <CotizadorModal isOpen={showCotizador} onClose={() => setShowCotizador(false)} />
        )}
      </AnimatePresence>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">T</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              TIDEN <span className="font-normal text-stone-500">agencia</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#intro" onClick={scrollToSection('intro')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Nosotros</a>
            <a href="#team" onClick={scrollToSection('team')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Fundadores</a>
            <a href="#process" onClick={scrollToSection('process')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Proceso</a>
            <a href="#industries" onClick={scrollToSection('industries')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Rubros</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Resultados</a>
            <a href="#packages" onClick={scrollToSection('packages')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Paquetes</a>
            <button 
              onClick={() => setShowCotizador(true)} 
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              Cotizar
            </button>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#intro" onClick={scrollToSection('intro')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Nosotros</a>
            <a href="#team" onClick={scrollToSection('team')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Fundadores</a>
            <a href="#process" onClick={scrollToSection('process')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Proceso</a>
            <a href="#industries" onClick={scrollToSection('industries')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Clientes</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Resultados</a>
            <a href="#packages" onClick={scrollToSection('packages')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Paquetes</a>
            <button onClick={() => { setMenuOpen(false); setShowCotizador(true); }} className="text-nobel-gold mt-4 font-bold uppercase border-b-2 border-nobel-gold">
                Cotizar Ahora
            </button>
        </div>
      )}

      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            REDES SOCIALES 2026
          </div>
          
          <div className="flex justify-center mb-2">
            <img 
              src="https://res.cloudinary.com/dostsdy1z/image/upload/v1770046160/VENTA_TIDEN_3_kwgorg.png" 
              alt="TIDEN Agencia Creativa" 
              className="h-40 md:h-64 lg:h-96 object-contain drop-shadow-sm" 
            />
          </div>
          
          <h2 className="font-serif italic font-normal text-stone-600 text-3xl md:text-5xl block mb-8">Agencia Creativa</h2>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            Especializada en creación de contenido. Comunidad, destaque y adaptación a las tendencias.
          </p>
          
          <div className="flex justify-center gap-6">
             <button onClick={() => setShowCotizador(true)} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-900 transition-colors cursor-pointer">
                <span>COTIZAR AHORA</span>
                <span className="p-2 border border-stone-900 bg-stone-900 text-white rounded-full group-hover:scale-110 transition-transform shadow-md">
                    <ShoppingCart size={16} />
                </span>
             </button>

             <a href="#intro" onClick={scrollToSection('intro')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>DESCUBRIR</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        <section id="intro" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">La Agencia</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">Somos Expertos en Contenido</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">C</span>reamos <strong>COMUNIDAD</strong> en redes sociales, logramos que tu marca <strong>DESTAQUE</strong> en tu rubro y mundo digital, y garantizamos la <strong>ADAPTACIÓN</strong> a las tendencias actuales.
              </p>
              <p>
                Nos especializamos en estrategia, producción audiovisual y gestión de comunidades para transformar la presencia digital de nuestros clientes.
              </p>
            </div>
          </div>
        </section>

        <section id="team" className="py-24 bg-[#F5F4F0] border-y border-stone-200">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">EQUIPO DIRECTIVO</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Fundadores</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">Experiencia y pasión por la comunicación digital.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch flex-wrap">
                    <AuthorCard 
                        name="Marcoantonio Gomez Dios" 
                        role="Cofundador – Director Estratégico y Creativo"
                        desc="Con 3 años de experiencia en creación de contenido, lidera la dirección creativa, gestión comercial y estrategias. Supervisa guiones, estilo visual y coherencia del material." 
                        delay="0s" 
                        image="https://i.postimg.cc/kXmxj8Bm/MARCOANTONIO-GOMEZ.png"
                    />
                    <AuthorCard 
                        name="Johanna Betsabe De La Cruz" 
                        role="Cofundadora – Gerente de Comunidad" 
                        desc="Licenciada en CC. de la Comunicación con 10 años de experiencia. Se encarga de la supervisión final, calidad, creación de stories, subida a redes y gestión diaria de la comunidad."
                        delay="0.2s" 
                        image="https://i.postimg.cc/MGQH2PFd/JOHANNA.png"
                    />
                </div>
           </div>
        </section>

        <section id="process" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                           METODOLOGÍA
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Proceso de Trabajo</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           Desde el análisis profundo de la marca hasta el reporte de resultados, nuestro flujo de trabajo de 6 pasos garantiza calidad y coherencia estratégica en cada pieza de contenido.
                        </p>
                        <ul className="space-y-4 text-stone-600">
                          <li className="flex items-start gap-3">
                            <span className="text-nobel-gold font-serif font-bold">01.</span> Estudio de la Marca
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-nobel-gold font-serif font-bold">02.</span> Planificación Estratégica
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-nobel-gold font-serif font-bold">03.</span> Producción y Grabación
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-nobel-gold font-serif font-bold">04.</span> Edición y Postproducción
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-nobel-gold font-serif font-bold">05.</span> Publicación y Optimización
                          </li>
                           <li className="flex items-start gap-3">
                            <span className="text-nobel-gold font-serif font-bold">06.</span> Reporte y Análisis
                          </li>
                        </ul>
                    </div>
                    <div>
                        <ProcessDiagram />
                    </div>
                </div>
            </div>
        </section>

        <section id="industries" className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-stone-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <IndustriesGrid />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            NUESTROS CLIENTES
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Rubros de Experiencia</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            Hemos trabajado exitosamente con diversas industrias, adaptando el tono y estilo visual a las necesidades específicas de cada mercado.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            Desde la apetitosa gastronomía hasta la seriedad del rubro salud, pasando por la estética de moda y belleza, tecnología, empresas corporativas y textil.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        <section id="results" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">RESULTADOS REALES</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Cifras que Hablan</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">
                        Más allá del contenido estético, generamos impacto tangible en el crecimiento de comunidades y alcance viral.
                    </p>
                </div>
                <ResultsCarousel />
            </div>
        </section>

        <section id="packages" className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Nuestros Paquetes</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        Elige el plan que mejor se adapte a tus objetivos de crecimiento. Todos incluyen análisis de perfil, propuesta de contenido y calendario.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <PricingPackages onOpenCotizador={() => setShowCotizador(true)} />
                </div>
            </div>
        </section>

        <section className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
            <div className="container mx-auto px-6 text-center">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">A TU MEDIDA</div>
                <h2 className="font-serif text-3xl md:text-4xl mb-6 text-white">Servicios Especializados</h2>
                <p className="text-lg text-stone-400 leading-relaxed max-w-2xl mx-auto mb-10">
                    ¿Tienes requerimientos específicos? Selecciona una opción para ver más detalles. Nuestro proceso estándar asegura transparencia desde el primer día.
                </p>
                
                <CustomServiceAccordion onOpenCotizador={() => setShowCotizador(true)} />

            </div>
        </section>

        <section className="py-24 bg-white">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-5 relative order-2 md:order-1">
                    <div className="aspect-video bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-xl">
                        <AgencyImageScene />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg border border-stone-100 max-w-xs hidden md:block">
                        <p className="text-sm text-stone-600 font-medium">
                            <span className="text-nobel-gold font-bold text-lg block mb-1">⏱ 5 a 7 días</span>
                            Duración del proceso de inicio.
                        </p>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center order-1 md:order-2">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">PASO A PASO</div>
                    <h2 className="font-serif text-4xl mb-8 text-stone-900">Flujo de Trabajo</h2>
                    
                    <div className="space-y-6">
                       {[
                         { id: 1, title: "Pago 100% y Firma de contrato", desc: "" },
                         { id: 2, title: "Reunión inicial", desc: "Definimos objetivos y necesidades." },
                         { id: 3, title: "Planificación", desc: "Creamos la estrategia de contenido." },
                         { id: 4, title: "Reunión Explicativa", desc: "Mostramos la estrategia que se usará a lo largo del tiempo." },
                         { id: 5, title: "Producción", desc: "Dirigimos, grabamos (2 grabaciones durante el plan) y editamos el contenido." },
                       ].map((step) => (
                           <div key={step.id} className="flex gap-4">
                               <span className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-100 text-stone-900 font-serif font-bold flex items-center justify-center border border-stone-200">
                                   {step.id}.
                               </span>
                               <div>
                                   <h4 className="font-serif font-bold text-stone-900 text-lg">
                                       {step.title}
                                       {step.desc && <span className="font-sans font-normal text-stone-600 text-base ml-1">: {step.desc}</span>}
                                   </h4>
                               </div>
                           </div>
                       ))}
                    </div>

                    <div className="mt-8 p-4 bg-[#F9F8F4] rounded-lg border-l-4 border-nobel-gold md:hidden">
                         <p className="text-sm text-stone-600 font-medium">
                            <span className="font-bold text-stone-900">Nota:</span> El proceso de inicio dura entre 5 días y una semana.
                        </p>
                    </div>
                </div>
             </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">TIDEN Agencia</div>
                <p className="text-sm">Especialistas en crear contenido que conecta.</p>
            </div>
            <div className="flex gap-6">
                <a href="#" className="hover:text-nobel-gold transition-colors"><Instagram /></a>
                <a href="#" className="hover:text-nobel-gold transition-colors"><Mail /></a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600">
            © 2026 TIDEN Agencia. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default App;