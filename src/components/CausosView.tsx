import React, { useState } from 'react';
import { BookOpen, Sparkles, ChevronRight, X, Volume2 } from 'lucide-react';
import { CAUSOS_DATA } from '../data/radiosData';

export const CausosView: React.FC = () => {
  const [selectedCauso, setSelectedCauso] = useState<typeof CAUSOS_DATA[0] | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Folclore & Tradição Sertaneja</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              Causos & Historinhas de Mato Grosso
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Confira as histórias mais contadas nos sítios, fazendas e rodas de tereré do interior mato-grossense.
            </p>
          </div>

          <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-400 flex items-center justify-center">
            <Sparkles className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Causos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CAUSOS_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedCauso(item)}
            className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between space-y-3 group shadow-md"
          >
            <div className="space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
                <span className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-amber-400" />
                  <span>{item.duration}</span>
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-100 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span>Ler causo completo</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal detail */}
      {selectedCauso && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedCauso(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-100 bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                {selectedCauso.category} • {selectedCauso.author}
              </span>
              <h3 className="text-lg font-bold text-slate-100">
                {selectedCauso.title}
              </h3>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 leading-relaxed font-serif">
              {selectedCauso.fullStory}
            </div>

            <button
              onClick={() => setSelectedCauso(null)}
              className="w-full py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition"
            >
              Fechar Causo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
