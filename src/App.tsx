import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Radio,
  Heart,
  MapPin,
  Flame
} from 'lucide-react';

import { RadioStation, TabType } from './types';
import { RADIOS_MT, RADIOS_NACIONAL, ALL_RADIOS } from './data/radiosData';
import { Header } from './components/Header';
import { StationCard } from './components/StationCard';
import { PlayerBar } from './components/PlayerBar';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('radios');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  // Favorites in LocalStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('central_modao_favorites');
      return saved ? JSON.parse(saved) : ['gazetacuiaba', 'vilareal', 'hunter_sertanejo'];
    } catch {
      return ['gazetacuiaba', 'vilareal', 'hunter_sertanejo'];
    }
  });

  // Audio & Player State
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(RADIOS_MT[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [streamStatusText, setStreamStatusText] = useState<string>('');

  // Audio HTML5 element ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('central_modao_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Handle audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const handleWaiting = () => {
      setIsBuffering(true);
      setStreamStatusText('Conectando...');
    };

    const handlePlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
      setStreamStatusText('Ao Vivo');
    };

    const handlePause = () => {
      setIsPlaying(false);
      setStreamStatusText('Pausado');
    };

    const handleError = () => {
      setIsBuffering(false);
      setIsPlaying(false);
      setStreamStatusText('Reconectando...');

      if (currentStation && currentStation.backupStreamUrl && audio.src !== currentStation.backupStreamUrl) {
        audio.src = currentStation.backupStreamUrl;
        audio.load();
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [currentStation, volume]);

  // Play a radio station
  const handlePlayStation = (station: RadioStation) => {
    setCurrentStation(station);
    setIsBuffering(true);

    if (audioRef.current) {
      audioRef.current.src = station.streamUrl;
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsBuffering(false);
        })
        .catch(() => {
          if (station.backupStreamUrl) {
            audioRef.current!.src = station.backupStreamUrl;
            audioRef.current!.load();
            audioRef.current!.play().catch(() => {});
          }
        });
    }
  };

  // Toggle play/pause
  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentStation) {
        if (!audioRef.current.src) {
          audioRef.current.src = currentStation.streamUrl;
        }
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (stationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(stationId) ? prev.filter((id) => id !== stationId) : [...prev, stationId]
    );
  };

  // Station Navigation
  const handleNextStation = () => {
    if (!currentStation) return;
    const currentIndex = ALL_RADIOS.findIndex((st) => st.id === currentStation.id);
    const nextIndex = (currentIndex + 1) % ALL_RADIOS.length;
    handlePlayStation(ALL_RADIOS[nextIndex]);
  };

  const handlePrevStation = () => {
    if (!currentStation) return;
    const currentIndex = ALL_RADIOS.findIndex((st) => st.id === currentStation.id);
    const prevIndex = (currentIndex - 1 + ALL_RADIOS.length) % ALL_RADIOS.length;
    handlePlayStation(ALL_RADIOS[prevIndex]);
  };

  // Filter stations
  const filterStationFn = (st: RadioStation) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      st.name.toLowerCase().includes(query) ||
      st.city.toLowerCase().includes(query) ||
      st.frequency.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === 'todas' ||
      (selectedCategory === 'mt' && st.category === 'mt') ||
      (selectedCategory === 'nacional' && st.category === 'nacional') ||
      (selectedCategory === 'caipira' && st.category === 'caipira');

    return matchesSearch && matchesCategory;
  };

  const filteredMT = RADIOS_MT.filter(filterStationFn);
  const filteredNac = RADIOS_NACIONAL.filter(filterStationFn);
  const favoriteStations = ALL_RADIOS.filter((st) => favorites.includes(st.id)).filter(filterStationFn);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans pb-28 select-none">
      
      {/* Audio Engine */}
      <audio ref={audioRef} preload="none" />

      {/* Clean Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar rádio por nome, cidade ou frequência..."
              className="w-full bg-slate-900/90 border border-slate-800/80 focus:border-amber-500 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-200 text-xs bg-slate-800 px-2 py-0.5 rounded"
              >
                Limpar
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory('todas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                selectedCategory === 'todas'
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Todas
            </button>

            <button
              onClick={() => setSelectedCategory('mt')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                selectedCategory === 'mt'
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Mato Grosso
            </button>

            <button
              onClick={() => setSelectedCategory('nacional')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                selectedCategory === 'nacional'
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Sertanejas & Nacionais
            </button>
          </div>
        </div>

        {/* Tab 1: All Live Stations */}
        {activeTab === 'radios' && (
          <div className="space-y-8">
            
            {/* Mato Grosso Stations Section */}
            {filteredMT.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                      Rádios de Mato Grosso
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500">
                    {filteredMT.length} {filteredMT.length === 1 ? 'rádio' : 'rádios'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {filteredMT.map((station) => (
                    <StationCard
                      key={station.id}
                      station={station}
                      isPlaying={isPlaying}
                      isCurrentStation={currentStation?.id === station.id}
                      isFavorite={favorites.includes(station.id)}
                      onPlayStation={handlePlayStation}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* National Sertanejo Stations Section */}
            {filteredNac.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                      Rádios Sertanejas & Nacionais
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500">
                    {filteredNac.length} {filteredNac.length === 1 ? 'rádio' : 'rádios'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {filteredNac.map((station) => (
                    <StationCard
                      key={station.id}
                      station={station}
                      isPlaying={isPlaying}
                      isCurrentStation={currentStation?.id === station.id}
                      isFavorite={favorites.includes(station.id)}
                      onPlayStation={handlePlayStation}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Empty Search Result */}
            {filteredMT.length === 0 && filteredNac.length === 0 && (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 text-center space-y-3 my-6">
                <Radio className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="font-bold text-slate-300 text-sm">
                  Nenhuma rádio encontrada para "{searchQuery}"
                </h3>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Limpar Busca
                </button>
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Favorites */}
        {activeTab === 'favoritas' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <h2 className="text-sm font-bold text-slate-200">
                  Suas Rádios Favoritas
                </h2>
              </div>
              <span className="text-xs text-slate-500">
                {favoriteStations.length} salvas
              </span>
            </div>

            {favoriteStations.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {favoriteStations.map((station) => (
                  <StationCard
                    key={station.id}
                    station={station}
                    isPlaying={isPlaying}
                    isCurrentStation={currentStation?.id === station.id}
                    isFavorite={true}
                    onPlayStation={handlePlayStation}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 text-center space-y-3 my-6">
                <Heart className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="font-bold text-slate-300 text-sm">
                  Nenhuma rádio favoritada ainda
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Clique no coração de qualquer card para favoritar suas rádios.
                </p>
                <button
                  onClick={() => setActiveTab('radios')}
                  className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Ver Rádios
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Persistent Player Bar */}
      <PlayerBar
        currentStation={currentStation}
        isPlaying={isPlaying}
        isBuffering={isBuffering}
        onTogglePlay={handleTogglePlay}
        onNextStation={handleNextStation}
        onPrevStation={handlePrevStation}
        volume={volume}
        onVolumeChange={(v) => {
          setVolume(v);
          if (audioRef.current) audioRef.current.volume = v;
        }}
        audioRef={audioRef}
        streamStatusText={streamStatusText}
      />

    </div>
  );
}

