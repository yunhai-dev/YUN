declare module 'flv.js' {
    export interface MediaDataSource {
        type: string;
        url: string;
        isLive?: boolean;
        cors?: boolean;
        withCredentials?: boolean;
        hasAudio?: boolean;
        hasVideo?: boolean;
        duration?: number;
        filesize?: number;
        segments?: Array<{
            duration: number;
            filesize?: number;
            url: string;
        }>;
    }

    export interface Config {
        enableWorker?: boolean;
        enableStashBuffer?: boolean;
        stashInitialSize?: number;
        isLive?: boolean;
        lazyLoad?: boolean;
        lazyLoadMaxDuration?: number;
        lazyLoadRecoverDuration?: number;
        deferLoadAfterSourceOpen?: boolean;
        autoCleanupSourceBuffer?: boolean;
        autoCleanupMaxBackwardDuration?: number;
        autoCleanupMinBackwardDuration?: number;
        statisticsInfoReportInterval?: number;
        fixAudioTimestampGap?: boolean;
        accurateSeek?: boolean;
        seekType?: string;
        seekParamStart?: string;
        seekParamEnd?: string;
        rangeLoadZeroStart?: boolean;
        customSeekHandler?: unknown;
        reuseRedirectedURL?: boolean;
        referrerPolicy?: string;
        headers?: Record<string, string>;
    }

    export interface MediaInfo {
        videoCodec: string;
        audioCodec: string;
        width: number;
        height: number;
        fps: number;
        audioSampleRate: number;
        [key: string]: unknown;
    }

    export interface StatisticsInfo {
        decodedFrames: number;
        [key: string]: unknown;
    }

    export interface Player {
        on(event: string, listener: (...args: any[]) => void): void;
        off(event: string, listener: (...args: any[]) => void): void;
        attachMediaElement(mediaElement: HTMLMediaElement): void;
        detachMediaElement(): void;
        load(): void;
        unload(): void;
        play(): Promise<void> | void;
        pause(): void;
        destroy(): void;
        readonly buffered: TimeRanges;
        readonly duration: number;
        readonly volume: number;
        readonly muted: boolean;
        readonly currentTime: number;
        readonly mediaInfo: MediaInfo;
        readonly statisticsInfo: StatisticsInfo;
    }

    export const Events: {
        ERROR: string;
        LOADING_COMPLETE: string;
        RECOVERED_EARLY_EOF: string;
        MEDIA_INFO: string;
        METADATA_ARRIVED: string;
        SCRIPTDATA_ARRIVED: string;
        STATISTICS_INFO: string;
    };

    export const ErrorTypes: {
        NETWORK_ERROR: string;
        MEDIA_ERROR: string;
        OTHER_ERROR: string;
    };

    export const ErrorDetails: {
        NETWORK_EXCEPTION: string;
        NETWORK_STATUS_CODE_INVALID: string;
        NETWORK_TIMEOUT: string;
        NETWORK_UNRECOVERABLE_EARLY_EOF: string;
        MEDIA_MSE_ERROR: string;
        MEDIA_FORMAT_ERROR: string;
        MEDIA_FORMAT_UNSUPPORTED: string;
        MEDIA_CODEC_UNSUPPORTED: string;
    };

    export function createPlayer(
        mediaDataSource: MediaDataSource,
        config?: Config
    ): Player;

    export function isSupported(): boolean;

    export function getFeatureList(): {
        mseFlvPlayback: boolean;
        mseLiveFlvPlayback: boolean;
        networkStreamIO: boolean;
        networkLoaderName: string;
        nativeMP4H264Playback: boolean;
        nativeWebmVP8Playback: boolean;
        nativeWebmVP9Playback: boolean;
    };

    export const version: string;
}
