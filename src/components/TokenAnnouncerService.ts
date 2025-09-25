import { Howl } from 'howler';

// --- Type Definitions ---
type SoundSpriteDefinitions = { [key: string]: [number, number] | [number, number, boolean] };
interface SpriteData {
  src: string[];
  sprite: SoundSpriteDefinitions;
}

export enum AnnouncerPrefix {
  TOKEN_NUMBER = 'token_number',
  SWIGGY_ORDER = 'swiggy_order',
  ZOMATO_ORDER = 'zomato_order',
  TABLE_NUMBER = 'table_number',
}

export enum AnnouncementMode {
  NATURAL = 'natural',
  ROBOTIC = 'robotic',
  NONE = 'none'
}

export interface QueueItem {
  tokenPrefix: AnnouncerPrefix;
  tokenNumber: string;
  targetName?: string;
  mode: AnnouncementMode;
  repeatCount: number;
  displayText: string;
}

export interface NowPlayingItem extends QueueItem {
    currentRepetition: number;
}

export enum AnnouncerStatus {
    IDLE,
    LOADING,
    PLAYING,
    ERROR,
    INITIALIZING
}

export interface AnnouncerConfig {
    cdnBaseUrl?: string;
    assetsPath: string;
    assetCollectionName: string;
    voiceId: string;
    chunkSize: number;
}


export class TokenAnnouncerService {
    private queue: QueueItem[] = [];
    private loadedSprites: Record<string, Howl> = {};
    private isProcessing = false;
    private isInterrupted = false;
    private config: AnnouncerConfig;
    private assetBasePath: string;
    private listeners: { [key: string]: Function[] } = {};

    public status: AnnouncerStatus = AnnouncerStatus.INITIALIZING;
    public nowPlaying: NowPlayingItem | null = null;

    constructor(config: AnnouncerConfig) {
        this.config = config;
        this.assetBasePath = this.config.cdnBaseUrl 
            ? `${this.config.cdnBaseUrl.replace(/\/$/, '')}/${this.config.assetsPath.replace(/^\//, '')}`
            : `/${this.config.assetsPath.replace(/^\//, '')}`;
        
        this.loadInitialSprite();
    }

    // --- Public Control Methods ---
    public play(item: QueueItem, immediate: boolean = false) {
        
        // --- PRE-QUEUE VALIDATION LOGIC ---
        const tokenNum = parseInt(item.tokenNumber, 10);
        if (item.mode === AnnouncementMode.NATURAL) {
            if (item.tokenNumber.startsWith('0') && item.tokenNumber.length > 1) {
                console.log(`Fallback: Zero-padded number '${item.tokenNumber}' detected. Switching to Robotic mode.`);
                item.mode = AnnouncementMode.ROBOTIC;
            } else if (isNaN(tokenNum) || tokenNum < 0 || tokenNum > 9999) {
                console.log(`Fallback: Token '${item.tokenNumber}' is out of range for Natural mode. Switching to Robotic mode.`);
                item.mode = AnnouncementMode.ROBOTIC;
            }
        }
        // --- END VALIDATION ---

        if (immediate) {
            // If something is playing, insert this as the next item. Otherwise, it becomes the first.
            const insertIndex = this.isProcessing ? 1 : 0;
            this.queue.splice(insertIndex, 0, item);
        } else {
            this.queue.push(item);
        }

        this.emitChange();
        this._processQueue();
    }

    public clear() {
        this.isInterrupted = true;
        this.queue = [];
        if (!this.isProcessing) {
            this.nowPlaying = null;
            this.status = AnnouncerStatus.IDLE;
        }
        this.emitChange();
    }

    // --- Event Emitter Methods ---
    public on(event: string, callback: Function) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }
    public off(event: string, callback: Function) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }
    private emitChange() {
        if (this.listeners['change']) {
            this.listeners['change'].forEach(cb => cb());
        }
    }

    // --- Private Core Logic ---
    private async loadInitialSprite() {
        const firstChunkName = `${this.config.assetCollectionName}_${this.config.voiceId}_0-100`;
        try {
            const sprite = await this._loadSprite(firstChunkName);
            this.loadedSprites[firstChunkName] = sprite;
            this.status = AnnouncerStatus.IDLE;
        } catch (err) {
            console.error(err);
            this.status = AnnouncerStatus.ERROR;
        } finally {
            this.emitChange();
        }
    }

    private async _loadSprite(spriteName: string): Promise<Howl> {
        if (this.loadedSprites[spriteName]) return this.loadedSprites[spriteName];

        this.status = AnnouncerStatus.LOADING;
        this.emitChange();

        const jsonPath = `${this.assetBasePath}/${spriteName}.json`;
        const data: SpriteData = await fetch(jsonPath).then(res => {
            if (!res.ok) throw new Error(`File not found: ${jsonPath}`);
            return res.json();
        });
        
        const fullSrcPaths = data.src.map(s => `${this.assetBasePath}/${s}`);
        
        return new Promise((resolve, reject) => {
            const sprite = new Howl({ 
                ...data, 
                src: fullSrcPaths, 
                format: ['opus', 'mp3'],
                onload: () => {
                    this.loadedSprites[spriteName] = sprite;
                    this.status = AnnouncerStatus.IDLE;
                    this.emitChange();
                    resolve(sprite);
                },
                onloaderror: (id, err) => {
                    this.status = AnnouncerStatus.ERROR;
                    this.emitChange();
                    reject(new Error(`Howler.js failed to load audio from ${jsonPath}: ${err}`));
                }
            });
        });
    }

    private async _processQueue() {
        if (this.isProcessing || this.queue.length === 0) return;

        this.isProcessing = true;
        this.isInterrupted = false;
        const currentItem = this.queue[0];
        
        const playClip = (sound: Howl, key: string) => new Promise<void>(resolve => {
            const soundId = sound.play(key);
            sound.once('end', () => resolve(), soundId);
            sound.once('playerror', () => { console.error(`Error playing clip: ${key}`); resolve(); }, soundId);
        });

        for (let i = 1; i <= currentItem.repeatCount; i++) {
            if (this.isInterrupted) break;

            this.nowPlaying = { ...currentItem, currentRepetition: i };
            this.status = AnnouncerStatus.PLAYING;
            this.emitChange();

            try {
                if (currentItem.mode === AnnouncementMode.NATURAL) {
                    const tokenNum = parseInt(currentItem.tokenNumber, 10);
                    const chunkIndex = Math.floor((tokenNum - 1) / this.config.chunkSize);
                    const start = Math.max(0, chunkIndex * this.config.chunkSize + (chunkIndex === 0 ? 0 : 1));
                    const end = start + this.config.chunkSize - (start === 0 ? 0 : 1);
                    const spriteName = `${this.config.assetCollectionName}_${this.config.voiceId}_${start}-${Math.min(end, 9999)}`;
                    
                    const sound = await this._loadSprite(spriteName);
                    if (this.isInterrupted) break;

                    await playClip(sound, currentItem.tokenPrefix);
                    if (this.isInterrupted) break;
                    await new Promise(r => setTimeout(r, 50));
                    await playClip(sound, currentItem.tokenNumber);

                } else { // Robotic Mode
                    const firstChunkName = `${this.config.assetCollectionName}_${this.config.voiceId}_0-100`;
                    const sound = await this._loadSprite(firstChunkName);
                    if (this.isInterrupted) break;

                    await playClip(sound, currentItem.tokenPrefix);
                    for (const digit of currentItem.tokenNumber.split('')) {
                        if (this.isInterrupted) break;
                        await new Promise(r => setTimeout(r, 50));
                        await playClip(sound, digit);
                    }
                }
            } catch (err) {
                console.error("Playback error:", err);
                // --- FAULT-TOLERANT FALLBACK ---
                // If loading a natural sprite fails, try again in robotic mode.
                if (currentItem.mode === AnnouncementMode.NATURAL) {
                    console.log("Natural mode failed. Falling back to Robotic mode.");
                    const fallbackItem: QueueItem = { ...currentItem, mode: AnnouncementMode.ROBOTIC };
                    this.queue.splice(1, 0, fallbackItem); // Insert as next item
                }
                break; 
            }
            
            if (i < currentItem.repeatCount && !this.isInterrupted) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        this.isProcessing = false;
        this.nowPlaying = null;
        this.queue.shift();
        this.status = this.queue.length > 0 ? AnnouncerStatus.LOADING : AnnouncerStatus.IDLE;
        this.emitChange();

        if (this.queue.length > 0) {
            this._processQueue();
        }
    }
}
