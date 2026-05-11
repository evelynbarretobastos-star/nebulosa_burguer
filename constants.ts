import { motion } from "motion/react";
import { ShoppingCart, Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CyberHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function CyberHeader({ cartCount, onOpenCart }: CyberHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-neon-cyan bg-[#050505]/95 backdrop-blur-xl shadow-[0_5px_20px_rgba(0,243,255,0.2)]">
      <div className="container mx-auto px-4 h-24 flex flex-col items-center justify-center relative">
        <div className="flex items-center justify-between w-full h-full">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-neon-cyan/10 border-2 border-neon-cyan rounded-full flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all">
              <Zap size={22} className="text-neon-cyan neon-text-cyan animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-black tracking-[0.1em] uppercase italic leading-none text-neon-cyan neon-text-cyan" style={{ textShadow: "0 0 10px #00f3ff, 3px 3px #ff00ff" }}>
                NEBULOSA<span className="text-white">_BURGER</span>
              </h1>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1 mx-8 h-full">
            {["TODOS", "HAMBÚRGUER", "ACOMPANHAMENTOS", "BEBIDAS"].map((tab) => (
              <button key={tab} className="px-6 h-full text-[10px] font-black tracking-[0.2em] text-white/40 hover:text-neon-cyan transition-all border-b-4 border-transparent hover:border-neon-cyan relative group uppercase italic font-mono">
                {tab}
                <span className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button 
              onClick={onOpenCart}
              variant="ghost" 
              className="text-white hover:text-neon-cyan hover:bg-neon-cyan/10 relative px-3 h-12 border-2 border-transparent hover:border-neon-cyan transition-all rounded-none"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-neon-pink text-white border-2 border-white min-w-[20px] h-[20px] flex items-center justify-center p-0 font-bold text-[10px] italic shadow-[0_0_10px_#ff00ff]">
                  {cartCount}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-neon-pink md:hidden">
              <Menu size={24} />
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-1 w-full flex justify-center gap-6 text-[8px] font-mono font-bold tracking-[0.3em] overflow-hidden whitespace-nowrap">
          <span className="text-terminal-green animate-pulse flex items-center gap-1">
            <span className="w-1 h-1 bg-terminal-green scale-150 rounded-full" /> SYSTEM: ONLINE
          </span>
          <span className="text-white/40">● LOCATION: SÃO PAULO</span>
          <span className="text-white/40">● ESTABILIDADE: 100%</span>
        </div>
      </div>
    </header>
  );
}
