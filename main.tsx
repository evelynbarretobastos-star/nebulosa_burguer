import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ArrowRight, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, index: number) => void;
  onCheckout: () => void;
  onAbort: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemove, onCheckout, onAbort }: CartDrawerProps) {
  const total = items.reduce((sum, item) => {
    const extrasTotal = item.selectedExtras?.reduce((s, e) => s + e.price, 0) || 0;
    return sum + (item.price + extrasTotal) * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#050505] hud-magenta z-[70] flex flex-col"
          >
            <div className="p-5 flex items-center justify-between border-b-2 border-neon-pink/30 bg-neon-pink/5">
              <div className="flex flex-col">
                <h2 className="text-base font-black font-display tracking-widest text-neon-pink neon-text-pink uppercase italic">
                  HUD_INVENTORY.SYS
                </h2>
                <div className="text-[9px] font-mono text-neon-cyan neon-text-cyan uppercase tracking-widest">Active Connection // Sector: HUD</div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="hover:text-neon-pink text-white/40 border border-white/5 hover:border-neon-pink transition-all">
                <X size={20} />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-white/10 font-mono text-center">
                   <div className="w-16 h-16 border-2 border-white/5 rounded-full flex items-center justify-center mb-4">
                     <X size={32} />
                   </div>
                   <p className="text-xs uppercase tracking-widest">[STORAGE_EMPTY]</p>
                   <p className="text-[9px] mt-2 italic opacity-50">Connect hardware Modules to initiate sequence</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item, index) => {
                    const itemExtrasTotal = item.selectedExtras?.reduce((s, e) => s + e.price, 0) || 0;
                    return (
                      <div key={`${item.id}-${index}`} className="flex gap-4 group relative">
                        <div className="w-16 h-16 rounded-none overflow-hidden border-2 border-neon-cyan/20 group-hover:border-neon-cyan transition-all">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                        </div>
                        <div className="flex-1 border-b border-white/5 pb-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-xs font-mono text-white tracking-tighter uppercase group-hover:text-neon-cyan transition-colors">{item.name}</h4>
                            <span className="text-neon-pink font-mono text-[10px] neon-text-pink">R${(item.price + itemExtrasTotal).toFixed(2)}</span>
                          </div>
                          
                          {item.selectedExtras && item.selectedExtras.length > 0 && (
                            <div className="mt-1 space-y-0.5 opacity-60">
                              {item.selectedExtras.map(extra => (
                                <div key={extra.id} className="flex items-center text-[9px] text-neon-cyan font-mono">
                                  <CornerDownRight size={10} className="mr-1" />
                                  <span>{extra.name}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-2">
                             <div className="text-[8px] font-mono text-white/20 tracking-widest">IDX: 00{index + 1}</div>
                             <button 
                              onClick={() => onRemove(item.id, index)}
                              className="text-neon-red/60 hover:text-neon-red text-[8px] font-black font-mono tracking-widest uppercase flex items-center transition-all"
                            >
                              <Trash2 size={10} className="mr-1" />
                              WIPE_ENTRY
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>

            <div className="p-6 bg-neon-pink/5 border-t-2 border-neon-pink/30">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                  <span>BASE_LOAD</span>
                  <span>R${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                  <span>MOD_TAXES</span>
                  <span className="text-terminal-green">PROTOCOL_FREE</span>
                </div>
                <div className="h-[1px] w-full bg-neon-pink/20" />
                <div className="flex justify-between items-center py-2">
                  <span className="font-display text-xs text-white font-black italic tracking-widest uppercase">SYS_SUM</span>
                  <span className="text-3xl font-black font-display text-neon-pink neon-text-pink italic">
                    R${total.toFixed(2)}
                  </span>
                </div>
              </div>
              <button 
                disabled={items.length === 0}
                onClick={onCheckout}
                className="w-full btn-neon-green h-14 rounded-none group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center group-hover:scale-110 transition-transform justify-center">
                  INITIALIZE_CHECKOUT
                  <ArrowRight size={18} className="ml-2" />
                </span>
              </button>
              
              <button 
                onClick={onAbort}
                className="w-full btn-neon-red h-10 mt-4 text-[10px] rounded-none opacity-60 hover:opacity-100 transition-opacity font-mono"
              >
                ABORTAR_MISSÃO
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={`h-[1px] w-full ${className}`} />;
}
