import React from 'react';
import { Volume2, Sparkles, Zap } from 'lucide-react';
import { soundFx } from '../utils/audioEngine';

export const SoundboardWidget: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Efeitos Sonoros do Sítio
          </h3>
        </div>
        <span className="text-[10px] text-slate-500 font-semibold">
          Web Audio Synthesizer
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => soundFx.playBerrante()}
          className="p-2.5 bg-slate-950/80 border border-slate-800 hover:border-amber-500/60 rounded-xl text-left transition hover:scale-105 active:scale-95 group"
        >
          <span className="block text-xs font-bold text-slate-200 group-hover:text-amber-400">
            📯 Berrante
          </span>
          <span className="block text-[10px] text-slate-500">
            Toque do Gado
          </span>
        </button>

        <button
          onClick={() => soundFx.playViolaChoro()}
          className="p-2.5 bg-slate-950/80 border border-slate-800 hover:border-amber-500/60 rounded-xl text-left transition hover:scale-105 active:scale-95 group"
        >
          <span className="block text-xs font-bold text-slate-200 group-hover:text-amber-400">
            🪕 Viola Caipira
          </span>
          <span className="block text-[10px] text-slate-500">
            Ponteio Grosso
          </span>
        </button>

        <button
          onClick={() => soundFx.playGalo()}
          className="p-2.5 bg-slate-950/80 border border-slate-800 hover:border-amber-500/60 rounded-xl text-left transition hover:scale-105 active:scale-95 group"
        >
          <span className="block text-xs font-bold text-slate-200 group-hover:text-amber-400">
            🐓 Galo da Manhã
          </span>
          <span className="block text-[10px] text-slate-500">
            Despertar no Sítio
          </span>
        </button>

        <button
          onClick={() => soundFx.playTrovoada()}
          className="p-2.5 bg-slate-950/80 border border-slate-800 hover:border-amber-500/60 rounded-xl text-left transition hover:scale-105 active:scale-95 group"
        >
          <span className="block text-xs font-bold text-slate-200 group-hover:text-amber-400">
            ⚡ Trovoada MT
          </span>
          <span className="block text-[10px] text-slate-500">
            Chuva na Serra
          </span>
        </button>
      </div>
    </div>
  );
};
