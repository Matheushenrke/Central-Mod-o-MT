export interface RadioStation {
  id: string;
  name: string;
  nickname: string;
  city: string;
  state: string;
  frequency: string;
  category: 'mt' | 'nacional' | 'caipira' | 'noticias';
  cover: string;
  fallbackCover: string;
  streamUrl: string;
  streamType?: 'audio' | 'hls';
  backupStreamUrl?: string;
  tags: string[];
  dialMhz: number;
  liveProgram: string;
  locutor: string;
  sourceUrl?: string;
  verification?: string;
}

export interface CausoItem {
  id: string;
  title: string;
  author: string;
  category: string;
  desc: string;
  duration: string;
  cover: string;
  audioUrl: string;
  fullStory?: string;
}

export interface SleepTimerState {
  active: boolean;
  minutes: number;
  remainingSeconds: number;
  timerId?: any;
}

export interface LocutorMessage {
  id: string;
  listenerName: string;
  city: string;
  stationName: string;
  text: string;
  songRequested?: string;
  timestamp: string;
}

export type TabType = 'radios' | 'favoritas';
