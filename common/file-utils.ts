export function getFileName(url: string) {
    return url.substring(url.lastIndexOf('/') + 1);
}