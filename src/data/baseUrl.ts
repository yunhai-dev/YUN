export const STORAGE_HOST = 'https://rustfs-endpoint.yhnotes.com/content';

// Helper function to properly encode URLs with Chinese characters
export function getMediaUrl(filename: string): string {
    const encodedFilename = encodeURIComponent(filename);
    return `${STORAGE_HOST}/${encodedFilename}`;
}