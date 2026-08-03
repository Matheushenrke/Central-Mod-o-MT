import React, { useState } from 'react';
import { Sparkles, Send, Radio, Copy, Check, Volume2 } from 'lucide-react';
import { RadioStation } from '../types';

interface LocutorViewProps {
  currentStation: RadioStation | null;
}

export const LocutorView: React.FC<LocutorViewProps> = ({ currentStation }) => {
  const [listenerName, setListenerName] = useState('');
  const [city, setCity] = useState('');
  const [stationName, setStationName] = useState(currentStation?.name || 'Vila Real 98.3 FM');
  const [prompt, setPrompt] = useState('');

  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/locutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, stationName, listenerName, city })
      });
      const data = await res.json();
      setResponse(data.text || 'Ôôô trem bão! O sinal deu uma chiada, mas o modão continua!');
    } catch (err) {
      setResponse('Eiiiita nóis! O sinal de rádio deu uma falhada na serra, mas o sertão continua firme no modão!');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inteligência Artificial Sertaneja</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              Locutor Penélope • Recado do Sítio
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Mande seu alô, peça seu modão preferido ou mande um abraço pro povo da fazenda! O nosso locutor de IA manda a resposta no estilo caipira de Mato Grosso.
            </p>
          </div>

          <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-400 flex items-center justify-center shadow-inner">
            <Radio className="w-10 h-10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Form & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
            <Send className="w-4 h-4 text-amber-400" />
            <span>Mandar Mensagem para a Rádio</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Seu Nome / Apelido</label>
              <input
                type="text"
                placeholder="Ex: Compadre Tonho"
                value={listenerName}
                onChange={(e) => setListenerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Sua Cidade / Sítio</label>
              <input
                type="text"
                placeholder="Ex: Chapada dos Guimarães"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Rádio no Ar</label>
            <input
              type="text"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Mensagem ou Pedido de Música</label>
            <textarea
              rows={3}
              placeholder="Ex: Manda um abraço pra turma do tereré e toca 'Saudade da Minha Terra'..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-amber-500 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                <span>Transmitindo recado na serra...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Mandar Recado ao Vivo</span>
              </>
            )}
          </button>
        </form>

        {/* Locutor Speech Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-200">
                  Resposta do Locutor Penélope
                </h3>
              </div>

              {response && (
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg flex items-center gap-1 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              )}
            </div>

            {response ? (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-amber-200/90 text-sm leading-relaxed italic font-serif relative">
                <span className="text-3xl text-amber-500/40 absolute top-1 left-2 font-bold">“</span>
                <p className="pt-2 pl-3">{response}</p>
              </div>
            ) : (
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-8 text-center space-y-2">
                <Radio className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">
                  Preencha o formulário ao lado para ouvir a fala personalizada do locutor caipira!
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800/60 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Powered by Gemini 2.5 AI</span>
            <span>Rádios MT • 24 Horas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
