import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Download, Trash2, Tag, ShieldCheck } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const packagesData = [
    { id: 'esencial', name: 'Paquete Esencial', icon: '💡', lista: 944, cierre: 767, desc: 'Estrategia + 04 Videos 4K + 08 Stories', comps: { videos: 4, stories: 8, carrousels: 0, covers: 0 } },
    { id: 'base', name: 'Paquete Base', icon: '📦', lista: 1357, cierre: 1121, desc: 'Estrategia + 06 Videos 4K + 08 Stories', comps: { videos: 6, stories: 8, carrousels: 0, covers: 0 } },
    { id: 'basico', name: 'Paquete Básico', icon: '🌱', lista: 1770, cierre: 1416, desc: 'Estrategia + 08 Videos 4K + 12 Stories + 02 Carr.', comps: { videos: 8, stories: 12, carrousels: 2, covers: 0 } },
    { id: 'intermedio', name: 'Paquete Intermedio', icon: '🚀', lista: 3068, cierre: 2478, desc: 'Estrategia + 12 Videos 4K + 24 Stories + 02 Carr. + 12 Portadas', comps: { videos: 12, stories: 24, carrousels: 2, covers: 12 }, isDark: false },
    { id: 'avanzado', name: 'Paquete Avanzado', icon: '🔥', lista: 4106, cierre: 3245, desc: 'Estrategia + 16 Videos 4K + 36 Stories + 02 Carr. + 16 Portadas', comps: { videos: 16, stories: 36, carrousels: 2, covers: 16 }, isDark: true }
];

const deckData = [
    { id: 'video', name: 'Video Individual', price: 295, icon: '🎬', expl: 'Producción audiovisual integral con lenguaje nativo de redes sociales. Incluye: Planificación técnica de gancho, captura en resolución 4K profesional, y edición de alta retención.' },
    { id: 'video_interno', name: 'Video Interno', price: 142, icon: '🏢', expl: 'Producción audiovisual de calidad orgánica orientada exclusivamente a uso interno corporativo (Tutoriales, contenido educativo o emotivo). Formato 1920x1080 (V/H). Alta resolución profesional.' },
    { id: 'edicion', name: 'Edición Contenido', price: 95, icon: '✂️', expl: 'Post-producción profesional de material bruto. Incluye: Cortes rítmicos, subtitulación técnica legible, diseño sonoro envolvente y corrección de color orgánica bajo estándares TIDEN.' },
    { id: 'estrategia', name: 'Estrategia + Guía', price: 767, icon: '🗺️', expl: 'Manual táctico profundo: Pilares de comunicación, narrativa estratégica, diseño de grilla de contenidos y calendario mensual detallado.' },
    { id: 'asesoria', name: 'Asesoría Pers.', price: 826, icon: '🎓', expl: 'Capacitación intensiva (3 sesiones) para formar equipos internos en grabación móvil 4K y edición de alto impacto.' },
    { id: 'diagnostico', name: 'Diagnóstico', price: 295, icon: '🩺', expl: 'Auditoría de presencia digital. Identificación de fallas algorítmicas y entrega de hoja de ruta con mejoras inmediatas para el posicionamiento orgánico profesional.' },
    { id: 'carrusel', name: 'Post Carrusel', price: 154, icon: '📑', expl: 'Diseño gráfico narrativo de hasta 5 láminas. Enfocado en la retención de lectura y maximización de métricas mediante valor estratégico.' },
    { id: 'stories', name: 'Pack 5 Stories', price: 118, icon: '📱', expl: 'Set de 5 diseños verticales tácticos con lenguaje orgánico. Optimizados para la generación de interacción diaria con la comunidad.' },
    { id: 'post_ind', name: 'Post Individual', price: 95, icon: '🖼️', expl: 'Creación de pieza gráfica avanzada para el feed con redacción de copy persuasivo y hashtags estratégicos.' },
    { id: 'portada', name: 'Portada Reel', price: 71, icon: '🎨', expl: 'Diseño estético para miniaturas de video que garantiza la armonía visual del grid y profesionalismo de marca.' },
    { id: 'foto_dis', name: 'Foto + Diseño', price: 59, icon: '📸', expl: 'Fotografía profesional con intervención gráfica. Incluye: Retoque digital orgánico, integración de tipografía corporativa y elementos de marca.' },
    { id: 'foto_simp', name: 'Foto Simple', price: 42, icon: '✨', expl: 'Captura fotográfica de alta resolución con retoque digital básico: exposición, balance de blancos y encuadre profesional para redes.' }
];

const CotizadorModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [priceMode, setPriceMode] = useState<'lista' | 'cierre'>('lista');
    const [selectedPackage, setSelectedPackage] = useState<any>(null);
    const [assistant, setAssistant] = useState(false);
    const [assistantIsPromo, setAssistantIsPromo] = useState(false);
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [manualAdjust, setManualAdjust] = useState<number | string>(0);
    const [adjustReason, setAdjustReason] = useState("");
    const pdfRef = useRef<HTMLDivElement>(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    useEffect(() => {
        const initialQtys: Record<string, number> = {};
        deckData.forEach(item => initialQtys[item.id] = 0);
        setQuantities(initialQtys);
    }, []);

    const handlePackageClick = (pkg: any) => {
        if (selectedPackage && selectedPackage.id === pkg.id) {
            setSelectedPackage(null);
            setAssistant(false);
        } else {
            setSelectedPackage({...pkg, comps: {...pkg.comps}});
        }
    };

    const handleCompChange = (compKey: string, delta: number) => {
        if (!selectedPackage) return;
        setSelectedPackage((prev: any) => ({
            ...prev,
            comps: {
                ...prev.comps,
                [compKey]: Math.max(0, prev.comps[compKey] + delta)
            }
        }));
    };

    const handleQtyChange = (id: string, delta: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta)
        }));
    };

    const currentPkgPrice = selectedPackage ? (priceMode === 'lista' ? selectedPackage.lista : selectedPackage.cierre) : 0;
    
    let asisPrice = 0;
    if (selectedPackage && !assistantIsPromo) {
        const lp = selectedPackage.lista;
        if (lp === 944) asisPrice = 531;
        else if (lp === 1357) asisPrice = 767;
        else if (lp === 1770) asisPrice = 1062;
        else if (lp === 3068) asisPrice = 1770;
        else if (lp === 4106) asisPrice = 2478;
    }

    let cartTotal = 0;
    let itemCount = 0;
    const cartItems: {name: string, price: number}[] = [];

    if (currentPkgPrice > 0) {
        cartItems.push({ name: `${selectedPackage.name} (IGV Inc.)`, price: currentPkgPrice });
        cartTotal += currentPkgPrice;
        itemCount++;
    }

    if (assistant) {
        cartItems.push({ name: `Asistente ${assistantIsPromo ? '(Incluido)' : '(IGV Inc.)'}`, price: asisPrice });
        cartTotal += asisPrice;
        itemCount++;
    }

    deckData.forEach(item => {
        const qty = quantities[item.id] || 0;
        if (qty > 0) {
            const priceWithIgv = item.price * qty;
            cartItems.push({ name: `${item.name} (x${qty})`, price: priceWithIgv });
            cartTotal += priceWithIgv;
            itemCount += qty;
        }
    });

    const finalTotal = Math.max(0, cartTotal + parseFloat(manualAdjust as string || '0'));

    const downloadQuotePDF = async () => {
        if (currentPkgPrice === 0 && itemCount === 0 && manualAdjust === 0) return;
        setIsGeneratingPDF(true);

        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const masterTemplate = pdfRef.current;
            if (!masterTemplate) return;
            
            const contentArea = masterTemplate.querySelector('.pdf-content-area');
            const totalArea = masterTemplate.querySelector('.pdf-total-area');
            if(!contentArea || !totalArea) return;

            const services: any[] = [];
            let totalAcumulado = parseFloat(manualAdjust as string || '0');

            if (currentPkgPrice > 0) {
                const c = selectedPackage.comps;
                let expl = `Estrategia mensual integral que incluye Estudio de Marca y Grilla Táctica. Detalle de producción: ${c.videos} Videos 4K profesional`;
                if(c.stories > 0) expl += `, ${c.stories} Stories mensuales de calidad orgánica profesional`;
                if(c.carrousels > 0) expl += `, ${c.carrousels} Carruseles narrativos para el feed`;
                if(c.covers > 0) expl += ` e incluye el diseño de las ${c.covers} portadas estéticas para la totalidad de los Reels`;
                expl += ".";
                services.push({ title: selectedPackage.name, expl: expl, type: 'standard' });
                totalAcumulado += currentPkgPrice;
            }

            if (assistant) {
                services.push({ 
                    title: "Asistente de Contenido" + (assistantIsPromo ? " (Cortesía)" : ""), 
                    expl: "Gestión estratégica de la pauta publicitaria en redes sociales: optimización de inversión, segmentación y reporte de métricas de rendimiento mensual. Incluye programación estratégica de contenidos.",
                    type: 'plus'
                });
                totalAcumulado += asisPrice;
            }

            deckData.forEach(item => {
                const qty = quantities[item.id] || 0;
                if (qty > 0) {
                    services.push({ title: item.name, expl: item.expl, qty: qty, type: 'standard' });
                    totalAcumulado += item.price * qty;
                }
            });

            const MAX_ITEMS = 3; 
            for (let i = 0; i < services.length; i += MAX_ITEMS) {
                const chunk = services.slice(i, i + MAX_ITEMS);
                let html = `<div style="margin-bottom: 40px; border-left: 8px solid #D4AF37; padding-left: 30px;"><h2 style="font-size: 28px; font-weight: 800; text-transform: uppercase; margin-bottom: 15px; color: #1c1917;">Plan Estratégico Detallado ${i > 0 ? '(Cont.)' : ''}</h2><p style="font-size: 17px; opacity: 0.8; line-height: 1.7; color: #1c1917;">Detalle de activos audiovisuales de calidad orgánica profesional 4K seleccionados para su marca (IGV Incluido).</p></div><div style="padding: 0;">`;
                
                chunk.forEach(s => {
                    if (s.type === 'plus') {
                        html += `<div style="margin-bottom: 30px; background-color: #1c1917; border-radius: 12px; padding: 25px; position: relative; color: #F9F8F4;"><div style="position: absolute; top: -10px; right: -10px; background-color: #D4AF37; color: #1c1917; padding: 8px 20px; transform: rotate(5deg); font-weight: 900; font-size: 9px; text-transform: uppercase;">Plus Estratégico</div><span style="font-weight: 800; text-transform: uppercase; font-size: 17px; display: block; border-bottom: 1px solid rgba(253,245,230,0.2); padding-bottom: 10px; margin-bottom: 10px;">• ${s.title}</span><p style="font-size: 13.5px; opacity: 0.9; line-height: 1.6; margin: 0;">${s.expl}</p></div>`;
                    } else {
                        html += `<div style="margin-bottom: 30px; background-color: #FFFFFF; border: 1px solid #e7e5e4; padding: 30px; border-radius: 4px; color: #1c1917;"><span style="font-weight: 800; text-transform: uppercase; font-size: 15px; display: block; border-bottom: 2px solid #F9F8F4; padding-bottom: 8px; margin-bottom: 10px;">• ${s.title} ${s.qty ? '(x'+s.qty+')' : ''}</span><p style="font-size: 13.5px; opacity: 0.7; line-height: 1.6; margin: 0;">${s.expl}</p></div>`;
                    }
                });

                if (i + MAX_ITEMS >= services.length) {
                    if (adjustReason) {
                        html += `<div style="margin-top: 10px; padding: 15px; background-color: #F9F8F4; border-radius: 8px; border: 2px dashed #D4AF37;"><strong style="font-size: 11px; text-transform: uppercase; display: block; margin-bottom: 5px; color: #57534e;">Notas Comerciales:</strong><p style="font-size: 14px; font-style: italic; margin: 0; opacity: 0.9; color: #1c1917;">"${adjustReason}"</p></div>`;
                    }
                    totalArea.innerHTML = `<div style="text-align: right;"><span style="font-family: serif; font-size: 26px; color: #57534e; display: block; margin-bottom: -5px;">Inversión Total Estimada</span><span style="font-family: serif; font-size: 50px; font-weight: 700; color: #1c1917;">S/. ${Math.max(0, Math.round(totalAcumulado)).toLocaleString()}</span><br><span style="font-size: 12px; font-weight: 800; color: #57534e; text-transform: uppercase; letter-spacing: 2px;">(IGV Incluido)</span></div>`;
                } else {
                    totalArea.innerHTML = "";
                }

                contentArea.innerHTML = html + "</div>";
                
                const canvas = await html2canvas(masterTemplate.querySelector('.pdf-page') as HTMLElement, { 
                    scale: 2, // Reducido ligeramente a 2 para mayor rapidez y menos uso de RAM, mantiene calidad HD
                    useCORS: true, 
                    backgroundColor: "#F9F8F4",
                    windowHeight: 1130,
                    windowWidth: 800,
                    logging: false
                });
                
                if (i > 0) pdf.addPage();
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
            }
            
            pdf.save(`Propuesta_TIDEN_${Date.now()}.pdf`);
        } catch (error) {
            console.error("Error al generar PDF:", error);
            alert("Hubo un error al generar el PDF. Verifica la consola.");
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto bg-stone-900/40 backdrop-blur-sm p-4 md:p-8">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="w-full max-w-7xl bg-[#F9F8F4] rounded-3xl shadow-2xl relative overflow-hidden flex flex-col"
            >
                <div className="bg-stone-900 text-[#F9F8F4] py-8 px-6 text-center relative shrink-0">
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 text-white">TIDEN</h1>
                        <p className="text-xs md:text-sm font-light uppercase tracking-[0.4em] opacity-80 text-[#D4AF37]">Manual de Cotización & Propuestas 2026</p>
                        <div className="mt-6 h-1 w-24 bg-[#D4AF37] mx-auto"></div>
                    </div>
                </div>

                <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-10">
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-3 border-b border-stone-200 pb-3">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2">
                                    <span className="text-lg">🃏</span> Mazo de Paquetes
                                </h3>
                                <div className="flex bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full p-1">
                                    <button onClick={() => setPriceMode('lista')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${priceMode === 'lista' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-900/5'}`}>P. Lista</button>
                                    <button onClick={() => setPriceMode('cierre')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${priceMode === 'cierre' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-900/5'}`}>P. Cierre</button>
                                </div>
                            </div>

                            <div className="flex overflow-x-auto space-x-4 pb-6 snap-x custom-scrollbar">
                                {packagesData.map(pkg => {
                                    const isSelected = selectedPackage?.id === pkg.id;
                                    return (
                                        <div 
                                            key={pkg.id} 
                                            onClick={() => handlePackageClick(pkg)}
                                            className={`flex-shrink-0 w-64 snap-start p-6 rounded-3xl shadow-sm border-2 cursor-pointer transition-all duration-300 relative group 
                                            ${pkg.isDark ? 'bg-stone-900 text-white border-stone-800 hover:border-stone-700' : 'bg-white text-stone-900 border-transparent hover:shadow-md'} 
                                            ${isSelected ? 'ring-4 ring-[#D4AF37]/50 border-[#D4AF37] scale-[1.02]' : ''}`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-4 right-4 bg-[#D4AF37] text-stone-900 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-md">✓</div>
                                            )}
                                            <div className="text-2xl mb-2">{pkg.icon}</div>
                                            <h4 className={`font-bold text-lg uppercase tracking-tight ${pkg.isDark ? 'text-[#D4AF37]' : ''}`}>{pkg.name}</h4>
                                            <p className="text-[10px] opacity-60 mb-4 leading-tight">{pkg.desc}</p>
                                            <p className="text-2xl font-black">S/ {priceMode === 'lista' ? pkg.lista : pkg.cierre}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <AnimatePresence>
                            {selectedPackage && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: 'auto' }} 
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-white border-2 border-dashed border-[#D4AF37]/40 rounded-3xl p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-stone-600">Personalizar {selectedPackage.name}</h4>
                                        <span className="text-[9px] bg-[#F9F8F4] px-2 py-1 rounded-md italic text-stone-500">* Montos incluyen IGV</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { id: 'videos', label: 'Videos 4K' },
                                            { id: 'stories', label: 'Stories' },
                                            { id: 'carrousels', label: 'Carruseles' },
                                            { id: 'covers', label: 'Portadas' }
                                        ].map(comp => (
                                            <div key={comp.id} className="flex flex-col gap-2 items-center bg-[#F9F8F4] p-3 rounded-xl border border-stone-200">
                                                <span className="text-[9px] font-black uppercase text-stone-800">{comp.label}</span>
                                                <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-stone-200">
                                                    <button onClick={() => handleCompChange(comp.id, -1)} className="w-6 h-6 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded text-stone-800 font-bold">-</button>
                                                    <span className="text-xs font-black w-4 text-center">{selectedPackage.comps[comp.id]}</span>
                                                    <button onClick={() => handleCompChange(comp.id, 1)} className="w-6 h-6 flex items-center justify-center bg-stone-900 text-white hover:bg-stone-800 rounded font-bold">+</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {selectedPackage && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2">
                                        <ShieldCheck size={18} /> Habilidad Especial
                                    </h3>
                                    <div className="relative max-w-xl">
                                        <div 
                                            onClick={() => setAssistant(!assistant)} 
                                            className={`bg-white p-5 rounded-2xl shadow-sm border-2 cursor-pointer flex items-center justify-between transition-all ${assistant ? 'border-stone-900 ring-4 ring-[#D4AF37]/30' : 'border-stone-200 hover:border-stone-300'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="text-3xl">👤</div>
                                                <div>
                                                    <h4 className="font-bold text-base">Asistente de Contenido</h4>
                                                    <p className="text-[10px] text-stone-500 italic">Gestión de Pauta y Programación</p>
                                                    {assistantIsPromo && <span className="bg-stone-900 text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase mt-1 inline-block">Incluido Gratis</span>}
                                                </div>
                                            </div>
                                            <p className="text-xl font-black text-stone-900">
                                                {assistantIsPromo ? 'S/ 0' : `S/ ${asisPrice}`}
                                            </p>
                                            {assistant && <div className="absolute top-2 right-2 bg-stone-900 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]">✓</div>}
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setAssistantIsPromo(!assistantIsPromo); }} 
                                            className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-stone-900 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md hover:bg-[#c4a132] transition-all"
                                        >
                                            🎁 Aplicar Promoción
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2">
                                <span className="text-lg">✨</span> Servicios a la Carta (Precios c/ IGV)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {deckData.map(item => (
                                    <div key={item.id} className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-[#D4AF37]/30 flex items-center justify-between hover:border-[#D4AF37] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">{item.icon}</div>
                                            <div>
                                                <h4 className="text-[11px] font-black text-stone-800 uppercase">{item.name}</h4>
                                                <p className="text-[9px] font-bold text-stone-500">S/ {item.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#F9F8F4] px-2 py-1 rounded-lg border border-stone-200">
                                            <button onClick={() => handleQtyChange(item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-stone-200 hover:bg-stone-300 rounded text-stone-800 font-bold transition-colors">-</button>
                                            <span className="text-xs font-black w-4 text-center">{quantities[item.id] || 0}</span>
                                            <button onClick={() => handleQtyChange(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-stone-900 text-white hover:bg-stone-800 rounded font-bold transition-colors">+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-stone-900 text-white p-5 rounded-[2rem] shadow-xl md:col-span-2 mt-4 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Tag size={20} className="text-[#D4AF37]" />
                                        <div><h4 className="text-[10px] font-black uppercase tracking-widest text-[#F9F8F4]">Ajuste Manual</h4></div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black opacity-50">S/</span>
                                        <input 
                                            type="number" 
                                            value={manualAdjust} 
                                            onChange={(e) => setManualAdjust(e.target.value)} 
                                            className="bg-transparent border-b-2 border-[#D4AF37] text-white text-center font-black outline-none w-24 text-xl"
                                        />
                                    </div>
                                </div>
                                <textarea 
                                    value={adjustReason}
                                    onChange={(e) => setAdjustReason(e.target.value)}
                                    placeholder="Razón del ajuste comercial..." 
                                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white text-xs outline-none resize-none h-12 focus:border-[#D4AF37] transition-colors placeholder:text-white/40"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white border-2 border-stone-900 p-6 rounded-[2.5rem] shadow-xl sticky top-8 flex flex-col space-y-6 max-h-[85vh]">
                            <div className="flex items-center justify-between border-b-2 border-stone-100 pb-4 shrink-0">
                                <h3 className="font-black uppercase tracking-tighter text-xl flex items-center gap-2">
                                    <ShoppingCart size={24} /> CARRITO
                                </h3>
                                <span className="bg-[#D4AF37] text-stone-900 text-[10px] font-black px-3 py-1.5 rounded-full">{itemCount} ITEMS</span>
                            </div>
                            
                            <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar min-h-[150px]">
                                {cartItems.length === 0 ? (
                                    <p className="text-xs text-center text-stone-400 py-10 italic">Tu propuesta está vacía...</p>
                                ) : (
                                    cartItems.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-stone-50 p-3 rounded-2xl border border-stone-100 shadow-sm">
                                            <span className="text-[10px] font-black text-stone-700 uppercase tracking-wider">{item.name}</span>
                                            <span className="text-[11px] font-black ml-3 text-stone-500">S/ {item.price.toLocaleString()}</span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="bg-[#F9F8F4] p-5 rounded-3xl space-y-4 border border-stone-200 shrink-0">
                                <div className="flex justify-between text-xs font-bold uppercase text-stone-400">
                                    <span>Subtotal Bruto</span>
                                    <span>S/ {cartTotal.toLocaleString()}</span>
                                </div>
                                
                                {parseFloat(manualAdjust as string || '0') !== 0 && (
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between text-xs font-black text-red-600 uppercase">
                                            <span>Ajuste</span>
                                            <span>{parseFloat(manualAdjust as string) < 0 ? "- " : "+ "}S/ {Math.abs(parseFloat(manualAdjust as string)).toLocaleString()}</span>
                                        </div>
                                        {adjustReason && <p className="text-[9px] italic text-red-500 opacity-80">Motivo: {adjustReason}</p>}
                                    </div>
                                )}
                                
                                <div className="pt-4 border-t-2 border-white text-center space-y-1">
                                    <span className="block font-black uppercase text-[10px] tracking-[0.3em] text-stone-400">Inversión Final</span>
                                    <span className="block text-4xl font-black text-stone-900 tracking-tighter whitespace-nowrap">S/ {finalTotal.toLocaleString()}</span>
                                    <span className="block text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">(IGV Incluido)</span>
                                </div>

                                <div className="grid grid-cols-1 gap-2 mt-4">
                                    <button 
                                        onClick={downloadQuotePDF}
                                        disabled={finalTotal === 0 || isGeneratingPDF}
                                        className="w-full py-4 bg-stone-900 disabled:bg-stone-300 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <Download size={16} /> {isGeneratingPDF ? 'Generando...' : 'Descargar PDF'}
                                    </button>
                                    <button 
                                        onClick={() => { setSelectedPackage(null); setAssistant(false); setQuantities({}); setManualAdjust(0); setAdjustReason(""); }}
                                        className="w-full py-2 text-stone-500 font-black text-[9px] uppercase tracking-widest hover:text-stone-900 transition-all flex items-center justify-center gap-1"
                                    >
                                        <Trash2 size={12} /> Limpiar Selección
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plantilla base oculta para el PDF (Positioned out of screen to ensure html2canvas can read it properly) */}
                <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                    <div ref={pdfRef} id="pdf-master-template">
                        <div className="pdf-page" style={{ width: '800px', height: '1130px', backgroundColor: '#F9F8F4', color: '#1c1917', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <div style={{ backgroundColor: '#1c1917', padding: '45px 50px', textAlign: 'center', flexShrink: 0 }}>
                                <h1 style={{ color: '#F9F8F4', fontSize: '55px', fontWeight: 900, letterSpacing: '-3px', margin: 0, fontFamily: 'serif' }}>TIDEN</h1>
                                <p style={{ color: '#D4AF37', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '5px', marginTop: '10px', fontFamily: 'sans-serif', fontWeight: 600 }}>Propuesta de Identidad & Contenido 2026</p>
                            </div>
                            <div className="pdf-body" style={{ padding: '40px 60px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <div className="pdf-content-area" style={{ fontFamily: 'sans-serif', flexGrow: 1 }}></div>
                                <div className="pdf-total-area" style={{ marginTop: '20px', textAlign: 'right', flexShrink: 0, paddingBottom: '20px' }}></div>
                            </div>
                            <div style={{ padding: '25px 60px', borderTop: '1px solid #D4AF37', fontSize: '10px', opacity: 0.4, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '3px', flexShrink: 0 }}>
                                TIDEN AGENCIA • CONTENIDO ORGÁNICO CON INTENCIÓN DIGITAL • LIMA, PERÚ
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 5px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e7e5e4; border-radius: 10px; }
                    .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d6d3d1; }
                `}</style>
            </motion.div>
        </div>
    );
};

export default CotizadorModal;