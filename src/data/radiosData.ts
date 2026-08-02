import { RadioStation } from '../types';

const logoFallback = (name: string, background = '1c1917', color = 'f59e0b') =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=${color}&size=256&bold=true`;

export const RADIOS_MT: RadioStation[] = [
  {
    id: 'gazetacuiaba',
    name: 'Gazeta FM 99.9',
    nickname: 'O som da Gazeta',
    city: 'Cuiaba',
    state: 'MT',
    frequency: '99.9 FM',
    category: 'mt',
    dialMhz: 99.9,
    cover: 'https://www.gazetafmcuiaba.com.br/storage/webdisco/2021/01/28/original/081c3f73367a03029125c5ed460b8429.png',
    fallbackCover: logoFallback('Gazeta FM 99.9'),
    streamUrl: 'http://sc6.dnip.com.br:13250/;stream.mp3',
    streamType: 'audio',
    tags: ['Cuiaba', 'Sertanejo', 'Ao Vivo'],
    liveProgram: 'Programacao oficial Gazeta FM Cuiaba',
    locutor: 'Equipe Gazeta FM',
    sourceUrl: 'https://www.gazetafmcuiaba.com.br/',
    verification: 'Stream validado por header icy-name: Gazeta FM'
  },
  {
    id: 'vilareal',
    name: 'Vila Real 98.3 FM',
    nickname: 'A voz do modao',
    city: 'Cuiaba',
    state: 'MT',
    frequency: '98.3 FM',
    category: 'mt',
    dialMhz: 98.3,
    cover: logoFallback('Vila Real 98.3', '3f2f16', 'fbbf24'),
    fallbackCover: logoFallback('Vila Real 98.3', '3f2f16', 'fbbf24'),
    streamUrl: 'https://5a57bda70564a.streamlock.net/vilarealfmhd/vilarealfmhd.stream/playlist.m3u8',
    streamType: 'hls',
    tags: ['Cuiaba', 'Sertanejo', 'Ao Vivo'],
    liveProgram: 'Transmissao oficial Vila Real FM Cuiaba',
    locutor: 'Equipe Vila Real FM',
    sourceUrl: 'https://www.vilarealfm.com.br/',
    verification: 'Stream HLS validado por playlist m3u8 oficial'
  },
  {
    id: 'centroamerica',
    name: 'Centro America FM Easy 99.1',
    nickname: 'A original de Cuiaba',
    city: 'Cuiaba',
    state: 'MT',
    frequency: '99.1 FM',
    category: 'mt',
    dialMhz: 99.1,
    cover: 'https://cadena-high-volume.b-cdn.net/uploads/station/vertical_logo/552000571/CUIABA.jpg',
    fallbackCover: logoFallback('Centro America 99.1', '0f172a', '38bdf8'),
    streamUrl: 'https://centova.svdns.com.br:20109/stream',
    streamType: 'audio',
    tags: ['Cuiaba', 'Adulto Contemporaneo', 'Easy'],
    liveProgram: 'Programacao ao vivo Centro America FM Cuiaba',
    locutor: 'Equipe Centro America FM',
    sourceUrl: 'https://cafm.com.br/',
    verification: 'Stream validado por resposta de audio em GET'
  },
  {
    id: 'bandfmt',
    name: 'Band FM 101.1 Cuiaba',
    nickname: 'A sua radio do seu jeito',
    city: 'Cuiaba',
    state: 'MT',
    frequency: '101.1 FM',
    category: 'mt',
    dialMhz: 101.1,
    cover: logoFallback('Band FM Cuiaba', '7f1d1d', 'ffffff'),
    fallbackCover: logoFallback('Band FM Cuiaba', '7f1d1d', 'ffffff'),
    streamUrl: 'https://stm12.xcast.com.br:10774/stream',
    streamType: 'audio',
    tags: ['Cuiaba', 'Band FM', 'Popular'],
    liveProgram: 'Transmissao ao vivo Band FM Cuiaba',
    locutor: 'Equipe Band FM Cuiaba',
    verification: 'Stream validado por header audio/mpeg'
  }
];

export const RADIOS_NACIONAL: RadioStation[] = [
  {
    id: 'nativasp',
    name: 'Nativa FM 95.3 Sao Paulo',
    nickname: 'A radio que canta no seu coracao',
    city: 'Sao Paulo',
    state: 'SP',
    frequency: '95.3 FM',
    category: 'nacional',
    dialMhz: 95.3,
    cover: logoFallback('Nativa FM 95.3', 'dc2626', 'ffffff'),
    fallbackCover: logoFallback('Nativa FM 95.3', 'dc2626', 'ffffff'),
    streamUrl: 'https://playerservices.streamtheworld.com/api/livestream-redirect/NATIVA_SPAAC.aac',
    streamType: 'audio',
    tags: ['Nacional', 'Sertanejo', 'Ao Vivo'],
    liveProgram: 'Transmissao oficial Nativa FM Sao Paulo',
    locutor: 'Equipe Nativa FM',
    sourceUrl: 'https://www.nativa.fm/'
  },
  {
    id: 'hunter_sertanejo',
    name: 'Hunter.FM Sertanejo',
    nickname: 'Canal sertanejo 24 horas',
    city: 'Canela',
    state: 'RS / Brasil',
    frequency: 'Online',
    category: 'nacional',
    dialMhz: 95.9,
    cover: logoFallback('Hunter FM Sertanejo', 'd97706', 'ffffff'),
    fallbackCover: logoFallback('Hunter FM Sertanejo', 'd97706', 'ffffff'),
    streamUrl: 'https://live.hunter.fm/sertanejo_high',
    streamType: 'audio',
    tags: ['Nacional', 'Sertanejo', 'Online'],
    liveProgram: 'Canal online sertanejo 24 horas',
    locutor: 'Hunter.FM',
    sourceUrl: 'https://hunter.fm/'
  }
];

export const ALL_RADIOS: RadioStation[] = [...RADIOS_MT, ...RADIOS_NACIONAL];
