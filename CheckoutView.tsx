import { useState } from "react";
import { motion } from "motion/react";
import { Zap, ArrowRight, ShieldCheck, Cpu, Globe, MessageSquare } from "lucide-react";
import CyberHeader from "./components/CyberHeader";
import BurgerCard from "./components/BurgerCard";
import CartDrawer from "./components/CartDrawer";
import CheckoutView from "./components/CheckoutView";
import ExtrasModal from "./components/ExtrasModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BURGERS } from "./constants";
import { Burger, CartItem, Extra } from "./types";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCheckout, setIsCheckout] = useState(false);
  
  const [selectedBurgerForExtras, setSelectedBurgerForExtras] = useState<Burger | null>(null);
  const [extrasModalOpen, setExtrasModalOpen] = useState(false);

  const startAddToCartFlow = (burger: Burger) => {
    setSelectedBurgerForExtras(burger);
    setExtrasModalOpen(true);
  };

  const confirmAddToCart = (burger: Burger, selectedExtras: Extra[]) => {
    setCartItems(prev => {
      return [...prev, { ...burger, quantity: 1, selectedExtras }];
    });
    setExtrasModalOpen(false);
    setCartOpen(true);
  };

  const removeFromCart = (id: string, index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckoutStart = () => {
    setCartOpen(false);
    setIsCheckout(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearCart = () => {
    setCartItems([]);
    setCartOpen(false);
  };

  const filteredBurgers = activeCategory === 'all' 
    ? BURGERS 
    : BURGERS.filter(b => b.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-neon-cyan selection:text-black">
      <CyberHeader cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} onOpenCart={() => setCartOpen(true)} />
      
      <main>
        {isCheckout ? (
          <CheckoutView 
            items={cartItems} 
            onFinish={handleFinish} 
            onAbort={() => setIsCheckout(false)} 
          />
        ) : (
          <>
            {/* HERO SECTION */}
            <section className="relative py-16 md:py-24 overflow-hidden border-b-2 border-neon-cyan/30 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
              <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-5xl md:text-8xl font-display font-black tracking-[0.1em] leading-none mb-4 text-neon-cyan" style={{ textShadow: "0 0 20px #00f3ff, 5px 5px #ff00ff" }}>
                    NEBULOSA<span className="text-white">_BURGER</span>
                  </h1>
                  <div className="status-bar flex justify-center gap-6 text-[10px] text-terminal-green/80 font-mono tracking-[0.2em] uppercase mt-2">
                    <span className="flex items-center gap-2 animate-pulse"><Zap size={10}/> SYSTEM: ONLINE</span>
                    <span className="hidden sm:inline">● LOCATION: SÃO PAULO</span>
                    <span className="hidden sm:inline">● ESTABILIDADE: 100%</span>
                  </div>
                </motion.div>
                
                <p className="mt-8 text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase italic">
                  OPERATING_INTERFACE // SELECIONE SEU MÓDULO DE SABOR
                </p>
              </div>
            </section>

            {/* CATEGORY NAV */}
            <div className="sticky top-24 z-40 bg-black/95 backdrop-blur-xl border-b-2 border-neon-cyan/50 py-4 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
              <div className="container mx-auto px-4">
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex w-max space-x-6 p-1 mx-auto">
                    {[
                      { id: 'all', label: 'TODOS' },
                      { id: 'premium', label: 'HAMBÚRGUERES' },
                      { id: 'side', label: 'EXTRAS' },
                      { id: 'drink', label: 'BEBIDAS' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-8 py-3 font-display text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 relative group overflow-hidden ${activeCategory === cat.id ? 'text-neon-cyan' : 'text-white/30 hover:text-white'}`}
                      >
                        {cat.label}
                        {activeCategory === cat.id && (
                          <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 w-full h-[3px] bg-neon-cyan shadow-[0_0_10px_#00f3ff]" 
                          />
                        )}
                        <span className={`absolute inset-0 bg-neon-cyan/5 transition-opacity ${activeCategory === cat.id ? 'opacity-100' : 'opacity-0'}`} />
                      </button>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
              </div>
            </div>

            {/* PRODUCT LIST */}
            <section className="py-6 min-h-[60vh]">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredBurgers.map((burger) => (
                    <BurgerCard 
                      key={burger.id} 
                      burger={burger} 
                      onAddToCart={startAddToCartFlow} 
                    />
                  ))}
                  {filteredBurgers.length === 0 && (
                    <div className="col-span-full py-20 text-center tech-label opacity-20 italic underline decoration-terminal-green">
                      NO_DATA_FOUND_IN_SECTOR_{activeCategory.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* FEEDBACK SECTION / DATA COLLECTION */}
            <section className="py-20 relative overflow-hidden bg-black">
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl mx-auto text-center border-2 border-neon-cyan/30 p-10 bg-[rgba(10,10,10,0.8)] backdrop-blur-xl rounded-[15px] shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                  <div className="inline-flex p-4 rounded-full bg-neon-cyan/10 mb-6 border border-neon-cyan/20 animate-pulse">
                    <MessageSquare className="text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,1)]" size={32} />
                  </div>
                  <h2 className="text-3xl font-black italic tracking-tighter mb-4 uppercase font-display neon-text-cyan">
                    COLETA DE <span className="text-white">FEEDBACK MOLECULAR</span>
                  </h2>
                  <p className="text-white/40 mb-8 leading-relaxed font-mono text-sm tracking-tighter uppercase italic">
                    Nossa IA precisa dos seus dados sensoriais para otimizar as próximas iterações. 
                    Responda ao nosso questionário de experiência e ganhe 50 créditos CyberPunks.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Button className="bg-transparent border-2 border-white/20 hover:border-neon-cyan text-white font-black h-12 uppercase text-xs tracking-widest transition-all rounded-none">
                      START SURVEY
                    </Button>
                    <Button className="bg-neon-pink text-white hover:bg-white hover:text-black font-black h-12 uppercase text-xs tracking-widest transition-all rounded-none btn-pulse">
                      CLAIM REWARDS
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* GRID DECORATION */}
              <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                   style={{ backgroundImage: 'linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #00F0FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </section>
          </>
        )}
      </main>

      <footer className="py-8 border-t-2 border-neon-cyan/20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8 text-[10px] font-mono text-neon-cyan/40 uppercase tracking-[0.2em] font-bold">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-terminal-green rounded-full animate-pulse shadow-[0_0_5px_#39FF14]"></div>
                LATÊNCIA: 12ms
              </span>
              <span>PERFORMANCE TOTAL: ATIVA</span>
              <span>DADOS SENSORIAIS: ANONIMIZADOS</span>
            </div>
            <div className="text-[9px] font-mono text-white/20 uppercase text-right tracking-widest">
              NEBULOSA OS V0.1.0 // SETOR_ARCADE.ACESSO
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart} 
        onCheckout={handleCheckoutStart}
        onAbort={clearCart}
      />

      <ExtrasModal 
        burger={selectedBurgerForExtras}
        isOpen={extrasModalOpen}
        onClose={() => setExtrasModalOpen(false)}
        onConfirm={confirmAddToCart}
      />
    </div>
  );
}
