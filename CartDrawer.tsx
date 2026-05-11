import React from "react";
import { motion } from "motion/react";
import { Plus, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Burger } from "../types";

interface BurgerCardProps {
  burger: Burger;
  onAddToCart: (burger: Burger) => void;
}

const BurgerCard: React.FC<BurgerCardProps> = ({ burger, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div 
        onClick={() => onAddToCart(burger)}
        className="arcade-card group flex h-32 md:h-40 cursor-pointer relative"
      >
        <div className="w-32 md:w-44 h-full overflow-hidden shrink-0 border-r-2 border-neon-cyan/20 relative">
          <img 
            src={burger.image} 
            alt={burger.name}
            className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-110 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
          <div className="absolute top-2 left-2 bg-neon-cyan text-black text-[8px] font-black px-1.5 py-0.5 uppercase tracking-tighter">
            SEC_{burger.id.toUpperCase()}
          </div>
        </div>
        
        <div className="flex-1 p-3 md:p-5 flex flex-col justify-between relative bg-[rgba(15,15,15,0.95)]">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-sm md:text-xl font-display font-black text-neon-cyan leading-none group-hover:text-white transition-all duration-300" style={{ textShadow: "0 0 10px rgba(0, 243, 255, 0.5)" }}>
                {burger.name}
              </h3>
              <span className="text-terminal-green font-mono text-sm md:text-xl neon-text-green italic tracking-tighter">
                R${burger.price.toFixed(2)}
              </span>
            </div>
            <p className="text-white/30 text-[10px] md:text-xs leading-tight line-clamp-2 font-mono mt-1 italic uppercase tracking-tighter">
               {" > "} {burger.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              <span className="text-[8px] text-neon-cyan/20 font-mono tracking-[0.2em] uppercase">DRIVE_ACCESS: OK</span>
              <div className="w-1.5 h-1.5 bg-terminal-green rounded-full animate-pulse shadow-[0_0_8px_rgba(57,255,20,1)]" />
            </div>
            
            <button className="flex items-center btn-neon-green !px-4 !py-1 text-[9px] font-black scale-90 md:scale-100 rounded-sm">
              <Plus size={10} className="mr-1" />
              ADICIONAR AO BUFFER
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BurgerCard;
