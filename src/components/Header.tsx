import React from 'react';
import { Radio, Heart, Guitar, Sparkles, BookOpen } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount
}) => {
  return (
    <header className="bg-slate-950/90 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md px-4 py-3 sm:px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 p-2.5 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Guitar className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-xl text-slate-100 tracking-tight leading-none flex items-center gap-2">
              <span>Central Modão MT</span>
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                Ao Vivo
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Rádios de Mato Grosso & Sertanejo de Raiz</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab('radios')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'radios'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Rádios</span>
          </button>

          <button
            onClick={() => setActiveTab('favoritas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'favoritas'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'fill-current' : ''}`} />
            <span>Favoritas</span>
            {favoritesCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                activeTab === 'favoritas' ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('locutor')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'locutor'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Locutor IA</span>
          </button>

          <button
            onClick={() => setActiveTab('causos')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'causos'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Causos MT</span>
          </button>
        </div>
      </div>
    </header>
  );
};


