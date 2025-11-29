import { FileItem, PreviewType } from './types';
import { Folder, File, Image, Film, Music, Archive, Code, FileText } from 'lucide-react';

export const formatSize = (bytes: number) => {
    if (bytes === 0) return '-';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${['B', 'KB', 'MB', 'GB'][i]}`;
};

export const getIcon = (item: FileItem) => {
    if (item.isDirectory) return Folder;
    const ext = item.name.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'jpg': case 'jpeg': case 'png': case 'gif': case 'svg': case 'webp': return Image;
        case 'mp4': case 'mov': case 'avi': case 'mkv': case 'webm': return Film;
        case 'mp3': case 'wav': case 'ogg': case 'm4a': return Music;
        case 'zip': case 'rar': case '7z': case 'tar': case 'gz': return Archive;
        case 'js': case 'ts': case 'jsx': case 'tsx': case 'py': case 'java': case 'cpp': case 'c': case 'html': case 'css': return Code;
        case 'txt': case 'md': case 'json': case 'xml': case 'log': case 'pdf': return FileText;
        default: return File;
    }
};

export const getPreviewType = (name: string): PreviewType => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) return 'image';
    if (['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext || '')) return 'video';
    if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext || '')) return 'audio';
    if (['txt', 'md', 'json', 'xml', 'log', 'csv'].includes(ext || '')) return 'text';
    if (ext === 'pdf') return 'pdf';
    return null;
};
