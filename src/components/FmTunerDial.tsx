import React, { useState } from 'react';
import { Radio, Volume2, Sparkles } from 'lucide-react';
import { RadioStation } from '../types';
import { ALL_RADIOS } from '../data/radiosData';

interface FmTunerDialProps {
  currentStation: RadioStation | null;
  onPlayStation: (station: RadioStation) => void;
}

export const FmTunerDial: React.FC<FmTunerDialProps> = ({
  currentStation,
  onPlayStation
}) => {
  const [dialFreq, setDialFreq] = useState<number>(currentStation?.dialMhz || 99.9);

  // Find nearest station matching dial frequency
  const findNearestStation = (freq: number) => {
    let minDiff = Infinity;
    let closest = ALL_RADIOS[0];

    ALL_RADIOS.forEach((st) => {
      const diff = Math.abs(st.dialMhz - freq);
      if (diff < minDiff) {
        minDiff = diff;
        closest = st;
      }
    });

    return { closest, diff: minDiff };
  };

  const { closest, diff } = findNearestStation(dialFreq);
  const isLockedOn = diff <= 0.4;

  const handleTune = (freq: number) => {
    setDialFreq(freq);
    const { closest: matched, diff: d } = findNearestStation(freq);
    if (d <= 0.4 && matched.id !== currentStation?.id) {
      onPlayStation(matched);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Dial Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <h3 className="font-extrabold text-xs sm:text-sm text-slate-100 uppercase tracking-wider">
            Sintonizador FM Analógico
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border transition ${
            isLockedOn
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            {isLockedOn ? 'SINAL OK • SINTONIZADO' : 'BUSCANDO FREQUÊNCIA...'}
          </span>
          <span className="text-sm font-black text-amber-400 font-mono">
            {dialFreq.toFixed(1)} MHz
          </span>
        </div>
      </div>

      {/* Visual Tuner Track */}
      <div className="relative py-2">
        {/* Frequency Ticks */}
        <div className="flex justify-between px-2 text-[10px] font-mono text-slate-500 font-bold mb-1">
          <span>88.0</span>
          <span>92.0</span>
          <span>96.0</span>
          <span>100.0</span>
          <span>104.0</span>
          <span>108.0</span>
        </div>

        {/* Range Input slider */}
        <input
          type="range"
          min="88.0"
          max="108.0"
          step="0.1"
          value={dialFreq}
          onChange={(e) => handleTune(parseFloat(e.target.value))}
          className="w-full h-3 bg-slate-950 border border-slate-800 rounded-lg accent-amber-500 cursor-pointer shadow-inner"
        />

        {/* Station Markers */}
        <div className="relative h-6 mt-1 overflow-x-hidden">
          {ALL_RADIOS.map((st) => {
            const pct = ((st.dialMhz - 88.0) / (108.0 - 88.0)) * 100;
            const isCurrent = currentStation?.id === st.id;
            return (
              <button
                key={st.id}
                onClick={() => {
                  setDialFreq(st.dialMhz);
                  onPlayStation(st);
                }}
                style={{ left: `${pct}%` }}
                className={`absolute top-0 -translate-x-1/2 text-[9px] font-bold px-1.5 py-0.5 rounded transition ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 scale-110 shadow-md font-extrabold z-10'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
                title={`${st.name} (${st.frequency})`}
              >
                {st.dialMhz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Matched Station Bar */}
      {closest && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={closest.cover}
              alt={closest.name}
              className="w-9 h-9 rounded-lg object-cover border border-slate-800 flex-shrink-0"
            />
            <div className="truncate min-w-0">
              <h4 className="font-bold text-xs text-slate-100 truncate">
                {closest.name} ({closest.frequency})
              </h4>
              <p className="text-[10px] text-slate-400 truncate">
                {closest.city}, {closest.state} • {closest.liveProgram}
              </p>
            </div>
          </div>

          <button
            onClick={() => onPlayStation(closest)}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 flex-shrink-0 ${
              currentStation?.id === closest.id
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{currentStation?.id === closest.id ? 'Ouvindo Agora' : 'Sintonizar'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
