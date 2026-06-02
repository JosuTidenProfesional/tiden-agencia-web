/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, PenTool, Video, Edit, Share2, BarChart2, CheckCircle, ShoppingBag, Heart, Smartphone, Briefcase, Scissors, X, Play, Star, ChevronLeft, ChevronRight, TrendingUp, Instagram } from 'lucide-react';

// --- PROCESS DIAGRAM (Replaces Surface Code) ---
export const ProcessDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  
  const steps = [
    { id: 1, title: "Estudio de Marca", icon: <Search size={18} />, desc: "Análisis profundo de identidad, tono y público." },
    { id: 2, title: "Planificación", icon: <PenTool size={18} />, desc: "Grillas, ideas creativas y calendario." },
    { id: 3, title: "Producción", icon: <Video size={18} />, desc: "Sesión de grabación en locación." },
    { id: 4, title: "Postproducción", icon: <Edit size={18} />, desc: "Edición profesional de reels y fotos." },
    { id: 5, title: "Publicación", icon: <Share2 size={18} />, desc: "Programación y optimización." },
    { id: 6, title: "Reporte", icon: <BarChart2 size={18} />, desc: "Análisis de métricas y ajustes." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-800">El Ciclo de Contenido</h3>
      <p className="text-sm text-stone-500 mb-8 text-center max-w-md">
        Un proceso circular y continuo para garantizar resultados.
      </p>
      
      <div className="relative w-72 h-72 rounded-full border border-stone-200 p-4 flex items-center justify-center relative">
         {/* Center Display */}
         <div className="absolute w-40 h-40 bg-stone-900 rounded-full flex flex-col items-center justify-center text-white z-10 shadow-lg p-4 text-center transition-all duration-300">
             <div className="text-nobel-gold mb-2">
                {steps[activeStep].icon}
             </div>
             <div className="font-serif text-lg leading-tight mb-1">{steps[activeStep].title}</div>
             <div className="text-[10px] text-stone-400 font-sans">{steps[activeStep].desc}</div>
         </div>

         {/* Orbiting Steps */}
         {steps.map((step, index) => {
             const angle = (index / steps.length) * 2 * Math.PI - Math.PI / 2;
             const radius = 140; // distance from center
             const x = Math.cos(angle) * radius;
             const y = Math.sin(angle) * radius; // Adjusted for center
             
             const isActive = activeStep === index;

             return (
                 <motion.button
                    key={`step-${step.id}`}
                    onClick={() => setActiveStep(index)}
                    className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-20 ${isActive ? 'bg-nobel-gold border-nobel-gold text-white scale-110 shadow-md' : 'bg-white border-stone-300 text-stone-400 hover:border-stone-500'}`}
                    style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                 >
                    <span className="text-xs font-bold">{step.id}</span>
                 </motion.button>
             );
         })}
         
         {/* Connection Ring */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ transform: 'rotate(-90deg)' }}>
             <circle cx="50%" cy="50%" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-stone-400" />
         </svg>
      </div>

      <div className="mt-8 flex gap-2">
          {steps.map((_, i) => (
              <div key={i} onClick={() => setActiveStep(i)} className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeStep === i ? 'w-8 bg-nobel-gold' : 'w-2 bg-stone-300'}`}></div>
          ))}
      </div>
    </div>
  );
};

// --- INDUSTRIES GRID (Replaces Transformer) ---
export const IndustriesGrid: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const industries = [
      { 
        name: "Gastronomía", 
        icon: <ShoppingBag />, 
        img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=200",
        videoUrl: "https://res.cloudinary.com/dostsdy1z/video/upload/v1769983530/Gastronom%C3%ADa_qgxw7e.mp4"
      },
      { 
        name: "Salud", 
        icon: <Heart />, 
        img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=200",
        videoUrl: "https://res.cloudinary.com/dostsdy1z/video/upload/v1769979304/SALUD_asx3lk.mp4"
      },
      { 
        name: "Belleza y Moda", 
        icon: <Scissors />, 
        img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=200",
        videoUrl: "https://res.cloudinary.com/dostsdy1z/video/upload/v1769983505/Belleza_y_moda_alrex1.mp4"
      },
      { 
        name: "Tecnología", 
        icon: <Smartphone />, 
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=200",
        videoUrl: "https://res.cloudinary.com/dostsdy1z/video/upload/v1769985531/TECNOLOG%C3%8DA_rhhslr.mp4"
      },
      { 
        name: "Empresas", 
        icon: <Briefcase />, 
        img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        videoUrl: "https://res.cloudinary.com/dostsdy1z/video/upload/v1770034385/Animaci%C3%B3n_de_Logo_Minimalista_con_Brillo_nhcvop.mp4"
      },
      { 
        name: "Textil", 
        icon: <ShoppingBag />, 
        img: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&q=80&w=200",
        videoUrl: "https://res.cloudinary.com/dostsdy1z/video/upload/v1769983573/TEXTIL_fnpowa.mp4"
      },
  ];

  return (
    <>
      <div className="p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {industries.map((ind, i) => (
                <motion.div 
                  key={i} 
                  className="group relative h-32 rounded-lg overflow-hidden shadow-sm border border-stone-200 bg-white cursor-pointer hover:border-nobel-gold"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedVideo(ind.videoUrl)}
                >
                    <img src={ind.img} alt={ind.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/10 transition-colors"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                        <div className="bg-white/90 p-2 rounded-full mb-1 text-stone-800 shadow-sm opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                          {React.cloneElement(ind.icon as React.ReactElement<any>, { size: 16 })}
                        </div>
                        <span className="font-serif font-bold text-white text-sm tracking-wide drop-shadow-md flex items-center gap-1">
                          {ind.name}
                          <Play size={10} className="fill-white" />
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg md:max-w-3xl lg:max-w-6xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 md:-right-12 z-20 p-2 text-white hover:text-nobel-gold transition-colors"
              >
                <X size={32} />
              </button>
              
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-black">
                 <video 
                   src={selectedVideo} 
                   autoPlay 
                   loop 
                   muted 
                   playsInline 
                   className="w-full h-full max-h-[90vh] object-contain"
                 />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- RESULTS CAROUSEL ---
export const ResultsCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const clients = [
        {
            name: "ADLC Asesoría Inmobiliaria",
            period: "Agosto 2024 – Febrero 2026",
            stats: [
                { type: "Instagram", start: 0, end: 694 },
                { type: "TikTok", start: 0, end: 2217 }
            ],
            milestone: "Posicionamiento exitoso de marca desde cero en un nicho de alta competencia."
        },
        {
            name: "Eficiencia y Servicio",
            period: "Noviembre 2024 – Febrero 2026",
            stats: [
                { type: "Instagram", start: 143, end: 400 },
                { type: "TikTok", start: 824, end: 23800 }
            ],
            milestone: "Estrategia viral de TikTok con impacto masivo."
        },
        {
            name: "Eventos y Catering Cieneguilla",
            period: "Febrero 2025 – Febrero 2026",
            stats: [
                { type: "Instagram", start: 16300, end: 24100 },
                { type: "TikTok", start: 1565, end: 17800 }
            ],
            milestone: "Consolidación de comunidad y fidelización de marca."
        },
        {
            name: "Tía Basi",
            period: "2024 – Febrero 2026",
            stats: [
                { type: "Instagram", start: 3834, end: 9026 },
                { type: "TikTok", start: 1861, end: 13400 }
            ],
            milestone: "Crecimiento exponencial en video corto (TikTok)."
        },
        {
            name: "Orion Center",
            period: "2025 – Febrero 2026",
            stats: [
                { type: "Instagram", start: 2275, end: 3214 },
                { type: "TikTok", start: 107, end: 315 }
            ],
            milestone: "Crecimiento constante y mejora del engagement."
        },
        {
            name: "Oasis Cafetería",
            period: "Septiembre 2025 – Febrero 2026",
            stats: [
                { type: "Instagram", start: 892, end: 1263 },
                { type: "TikTok", start: 89, end: 384 }
            ],
            milestone: "Aumento de visibilidad local y tráfico digital."
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % clients.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length);
    };

    const getSlideIndex = (offset: number) => {
        return (currentIndex + offset + clients.length) % clients.length;
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto py-12">
            
            {/* Navigation Buttons */}
            <button 
                onClick={prevSlide}
                className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg text-stone-600 hover:text-nobel-gold hover:scale-110 transition-all border border-stone-100"
            >
                <ChevronLeft size={24} />
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg text-stone-600 hover:text-nobel-gold hover:scale-110 transition-all border border-stone-100"
            >
                <ChevronRight size={24} />
            </button>

            {/* Carousel Container */}
            <div className="flex justify-center items-center h-[500px] overflow-hidden relative perspective-1000">
                <AnimatePresence initial={false} mode="popLayout">
                    {[-1, 0, 1].map((offset) => {
                        const index = getSlideIndex(offset);
                        const client = clients[index];
                        const isCenter = offset === 0;

                        return (
                            <motion.div
                                key={`${client.name}-${index}`}
                                layout
                                initial={{ 
                                    opacity: 0, 
                                    scale: 0.8, 
                                    x: offset === 0 ? 100 : offset * 300, 
                                    zIndex: 0 
                                }}
                                animate={{ 
                                    opacity: isCenter ? 1 : 0.4, 
                                    scale: isCenter ? 1 : 0.8,
                                    x: offset * (window.innerWidth < 768 ? 0 : 350), // Overlap on desktop, stack/hide on mobile
                                    zIndex: isCenter ? 10 : 5,
                                    display: (window.innerWidth < 768 && !isCenter) ? "none" : "block" // Hide side cards on mobile
                                }}
                                exit={{ opacity: 0, scale: 0.8, zIndex: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                onClick={() => {
                                    if (offset === -1) prevSlide();
                                    if (offset === 1) nextSlide();
                                }}
                                className={`absolute w-[320px] md:w-[380px] p-8 rounded-xl border flex flex-col justify-between shadow-xl cursor-pointer bg-white h-[450px]
                                    ${isCenter ? 'border-nobel-gold ring-1 ring-nobel-gold/20' : 'border-stone-200 bg-stone-50'}`}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
                                            <TrendingUp size={24} />
                                        </div>
                                        {isCenter && <span className="text-[10px] font-bold uppercase tracking-widest text-nobel-gold bg-nobel-gold/10 px-2 py-1 rounded-full">Caso de Éxito</span>}
                                    </div>

                                    <h3 className="font-serif text-2xl text-stone-900 mb-2 leading-tight min-h-[64px] flex items-center">{client.name}</h3>
                                    <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-6 border-b border-stone-100 pb-4">{client.period}</p>
                                    
                                    <div className="space-y-4 mb-6">
                                        {client.stats.map((stat, i) => (
                                            <div key={i} className="flex flex-col bg-stone-50 p-3 rounded-lg border border-stone-100">
                                                <div className="flex items-center gap-2 mb-1 text-stone-500 text-xs font-bold uppercase">
                                                    {stat.type === "Instagram" ? <Instagram size={12} /> : <span className="text-xs font-serif font-bold">TikTok</span>}
                                                    {stat.type}
                                                </div>
                                                <div className="flex items-end justify-between">
                                                    <span className="text-stone-400 text-sm font-mono">{stat.start.toLocaleString()}</span>
                                                    <div className="h-[1px] flex-1 bg-stone-200 mx-2 mb-2 relative">
                                                        <div className="absolute right-0 -top-1 w-1 h-1 rounded-full bg-nobel-gold"></div>
                                                    </div>
                                                    <span className="text-stone-800 text-lg font-bold font-mono">{stat.end.toLocaleString()}</span>
                                                </div>
                                                <div className="text-right text-[10px] text-green-600 font-bold mt-1">
                                                    +{((stat.end - stat.start) / (stat.start || 1) * 100).toFixed(0)}% Crecimiento
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <p className="text-sm italic text-stone-500 border-l-2 border-nobel-gold pl-3">
                                        "{client.milestone}"
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {clients.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-nobel-gold' : 'bg-stone-300 hover:bg-stone-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

// --- PRICING PACKAGES (Replaces Performance Chart) ---
export const PricingPackages: React.FC<{ onOpenCotizador?: () => void }> = ({ onOpenCotizador }) => {
    const [selected, setSelected] = useState<string>('Intermedio');
    const [showPrices, setShowPrices] = useState<boolean>(true);

    const packages = [
        {
            name: "Básico",
            price: "1500",
            videos: "2 videos semanales",
            content: "8 contenidos totales",
            stories: "12 historias IG",
            extras: "2 carruseles",
            highlight: false
        },
        {
            name: "Intermedio",
            price: "2600",
            videos: "3 videos semanales",
            content: "12 contenidos totales",
            stories: "24 historias IG",
            extras: "Diseño portadas Reels",
            highlight: true
        },
        {
            name: "Avanzado",
            price: "3480",
            videos: "4 videos semanales",
            content: "16 contenidos totales",
            stories: "36 historias IG",
            extras: "2 carruseles + Portadas",
            highlight: false
        }
    ];

    return (
        <div className="relative">
            {/* Toggle Price Button */}
            <div className="flex justify-end mb-4">
                <button 
                    onClick={() => setShowPrices(!showPrices)} 
                    className="text-stone-300 hover:text-nobel-gold transition-all duration-300 hover:scale-110 p-1"
                    title={showPrices ? "Ocultar precios" : "Mostrar precios"}
                >
                    <Star size={16} fill={showPrices ? "#C5A059" : "none"} className={showPrices ? "text-nobel-gold" : "text-stone-300"} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 items-end">
                {packages.map((pkg) => (
                    <div 
                        key={pkg.name}
                        onClick={() => setSelected(pkg.name)}
                        className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col h-full
                            ${selected === pkg.name 
                                ? 'bg-white border-nobel-gold shadow-lg scale-105 z-10' 
                                : 'bg-[#F9F8F4] border-stone-300 opacity-80 hover:opacity-100'}`}
                    >
                        {pkg.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-widest">Popular</div>}
                        
                        <h3 className={`font-serif text-2xl text-stone-900 ${showPrices ? 'mb-2' : 'mb-6'}`}>{pkg.name}</h3>
                        
                        {showPrices && (
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-sm font-bold text-stone-500">S/</span>
                                <span className="text-4xl font-bold text-nobel-gold">{pkg.price}</span>
                                <span className="text-xs text-stone-400">+ IGV</span>
                            </div>
                        )}

                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm text-stone-600">
                                <CheckCircle size={14} className="text-nobel-gold shrink-0"/> {pkg.videos}
                            </li>
                            <li className="flex items-center gap-2 text-sm text-stone-600">
                                <CheckCircle size={14} className="text-nobel-gold shrink-0"/> {pkg.content}
                            </li>
                            <li className="flex items-center gap-2 text-sm text-stone-600">
                                <CheckCircle size={14} className="text-nobel-gold shrink-0"/> {pkg.stories}
                            </li>
                            <li className="flex items-center gap-2 text-sm text-stone-600">
                                <CheckCircle size={14} className="text-nobel-gold shrink-0"/> {pkg.extras}
                            </li>
                        </ul>

                        <button 
                            onClick={onOpenCotizador} 
                            className={`w-full py-2 rounded-lg text-sm font-bold transition-colors ${selected === pkg.name ? 'bg-nobel-gold text-white hover:bg-[#b08d4b]' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'}`}
                        >
                            Seleccionar
                        </button>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12 max-w-2xl mx-auto">
               <p className="text-stone-600 text-sm">
                 * El servicio de <strong>Asistente de Contenido</strong> (publicación, pauta, gestión de comunidad) se puede añadir {showPrices ? "por un costo adicional (S/900 - S/2100)" : "previa consulta"} dependiendo del paquete.
               </p>
            </div>
        </div>
    )
}