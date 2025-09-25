import { useState, useEffect, useMemo } from 'react';
import { TokenAnnouncerService, AnnouncerStatus } from './TokenAnnouncerService';
import type { QueueItem, NowPlayingItem, AnnouncerConfig } from './TokenAnnouncerService';

export const useTokenAnnouncer = (config: AnnouncerConfig) => {
    // useState holds the service instance, allowing React to manage its lifecycle.
    const [announcerService, setAnnouncerService] = useState<TokenAnnouncerService | null>(null);

    // This effect creates/re-creates the service instance whenever the config changes.
    useEffect(() => {
        const service = new TokenAnnouncerService(config);
        setAnnouncerService(service);

        // Cleanup function to clear any pending operations when the config changes or component unmounts.
        return () => {
            service.clear();
        };
    }, [config.cdnBaseUrl, config.assetsPath, config.assetCollectionName, config.voiceId, config.chunkSize]);

    // State variables to make the UI reactive to changes in the service.
    const [announcerStatus, setAnnouncerStatus] = useState<AnnouncerStatus>(AnnouncerStatus.INITIALIZING);
    const [currentAnnouncement, setCurrentAnnouncement] = useState<NowPlayingItem | null>(null);
    const [announcementQueue, setAnnouncementQueue] = useState<QueueItem[]>([]);

    // This effect subscribes to the service's 'change' events.
    useEffect(() => {
        if (!announcerService) return;

        const handleChange = () => {
            setAnnouncerStatus(announcerService.status);
            setCurrentAnnouncement(announcerService.nowPlaying);
            setAnnouncementQueue([...(announcerService as any).queue]); // Access queue for display
        };

        announcerService.on('change', handleChange);
        handleChange(); // Initial sync

        return () => {
            announcerService.off('change', handleChange);
        };
    }, [announcerService]);

    // Expose a stable, abstracted API to the UI component.
    const announcerControls = useMemo(() => {
        if (!announcerService) {
            return {
                play: () => console.warn("Announcer not ready."),
                clear: () => {},
            };
        }
        return {
            play: (item: QueueItem, interrupt: boolean = false) => announcerService.play(item, interrupt),
            clear: () => announcerService.clear(),
        };
    }, [announcerService]);

    return {
        announcerStatus,
        currentAnnouncement,
        announcementQueue,
        announcer: announcerControls,
    };
};
