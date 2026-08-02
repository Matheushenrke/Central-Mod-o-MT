import React, { useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Radio,
  RotateCw,
  SkipBack,
  SkipForward
} from 'lucide-react';
import { RadioStation } from '../types';

interface PlayerBarProps {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  isBuffering: boolean;
  onTogglePlay: () => void;
  onNextStation: () => void;
  onPrevStation: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  streamStatusText: string;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({
  currentStation,
  isPlaying,
  isBuffering,
  onTogglePlay,
  onNextStation,
  onPrevStation,
  volume,
  onVolumeChange,
  streamStatusText
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  const handleMuteToggle = () => {
    if (isMuted) {
      setIsMuted(false);
      onVolumeChange(prevVolume > 0 ? prevVolume : 0.8);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      onVolumeChange(0);
    }
  };

  const handleShareWhatsApp = () => {
    if (!currentStation) return;
    const text = `Tô ouvindo ${currentStation.name} (${currentStation.frequency}) ao vivo! Ouça aqui: ${window.location.href}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  if (!currentStation) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-md p-3 z-50 text-center shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-slate-400 text-xs gap-2">
          <Radio className="w-4 h-4 text-amber-400" />
          <span>Selecione uma rádio para começar a ouvir</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-md p-3 sm:px-6 z-50 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Station Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <img
            src={currentStation.cover}
            alt={currentStation.name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-800 flex-shrink-0 shadow-sm"
          />

          <div className="truncate min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-100 truncate">
                {currentStation.name}
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-1.5 py-0.2 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>AO VIVO</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 truncate mt-0.5">
              {currentStation.frequency} • {currentStation.city}, {currentStation.state}
            </p>
            {streamStatusText && (
              <p className="text-[10px] text-slate-500 truncate mt-1">
                {streamStatusText}
              </p>
            )}
          </div>
        </div>

        {/* Center Controls */}
        <div className="flex items-center justify-center gap-3 w-full sm:w-auto">
          <button
            onClick={onPrevStation}
            className="p-2 text-slate-400 hover:text-slate-100 transition rounded-xl hover:bg-slate-900"
            title="Estação Anterior"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={onTogglePlay}
            className={`w-11 h-11 rounded-full flex items-center justify-center text-slate-950 font-bold shadow-md transition active:scale-95 ${
              isPlaying
                ? 'bg-emerald-400 hover:bg-emerald-300'
                : 'bg-amber-400 hover:bg-amber-300'
            }`}
          >
            {isBuffering ? (
              <RotateCw className="w-5 h-5 animate-spin text-slate-950" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={onNextStation}
            className="p-2 text-slate-400 hover:text-slate-100 transition rounded-xl hover:bg-slate-900"
            title="Próxima Estação"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
          {/* Share Button */}
          <button
            onClick={handleShareWhatsApp}
            className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-900 rounded-xl transition"
            title="Compartilhar no WhatsApp"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-2.5 py-1.5 rounded-xl">
            <button
              onClick={handleMuteToggle}
              className="text-slate-400 hover:text-slate-200 transition"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setIsMuted(false);
                onVolumeChange(parseFloat(e.target.value));
              }}
              className="w-16 sm:w-20 accent-amber-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

