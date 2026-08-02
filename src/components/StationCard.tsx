import React, { useState } from 'react';
import { Play, Pause, Heart, Radio } from 'lucide-react';
import { RadioStation } from '../types';

interface StationCardProps {
  station: RadioStation;
  isPlaying: boolean;
  isCurrentStation: boolean;
  isFavorite: boolean;
  onPlayStation: (station: RadioStation) => void;
  onToggleFavorite: (stationId: string, e: React.MouseEvent) => void;
}

export const StationCard: React.FC<StationCardProps> = ({
  station,
  isPlaying,
  isCurrentStation,
  isFavorite,
  onPlayStation,
  onToggleFavorite
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onPlayStation(station)}
      className={`group relative bg-slate-900/90 border ${
        isCurrentStation
          ? 'border-amber-500 ring-1 ring-amber-500/40 shadow-lg shadow-amber-500/10'
          : 'border-slate-800/80 hover:border-amber-500/50'
      } p-3 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-2.5`}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
        <img
          src={imgError ? station.fallbackCover : station.cover}
          onError={() => setImgError(true)}
          alt={station.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Frequency Badge */}
        <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md text-amber-400 border border-slate-700/60 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
          <Radio className="w-3 h-3 text-amber-400" />
          <span>{station.frequency}</span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(station.id, e)}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md border transition ${
            isFavorite
              ? 'bg-red-500/20 text-red-400 border-red-500/40'
              : 'bg-slate-950/60 text-slate-400 border-slate-700/60 hover:text-red-400 hover:bg-slate-900'
          }`}
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Overlay Play / Pause Action */}
        <div className={`absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] transition-opacity duration-200 flex items-center justify-center ${
          isCurrentStation ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-slate-950 font-bold shadow-lg transition transform group-hover:scale-105 ${
            isCurrentStation && isPlaying
              ? 'bg-emerald-400 text-slate-950'
              : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
          }`}>
            {isCurrentStation && isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </div>
        </div>
      </div>

      {/* Info Details */}
      <div className="space-y-0.5">
        <h3 className="font-bold text-xs sm:text-sm text-slate-100 truncate group-hover:text-amber-400 transition-colors">
          {station.name}
        </h3>
        <p className="text-[11px] text-slate-400 truncate">
          {station.city}, {station.state}
        </p>
      </div>
    </div>
  );
};

