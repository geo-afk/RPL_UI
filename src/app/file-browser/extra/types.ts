export interface FileItem {
    id: string;
    name: string;
    size: number;
    type: string;
    file: File;
    modified: Date;
    path: string;
    isDirectory: boolean;
    children?: FileItem[];
}

export interface FileManagerProps {
    darkMode: boolean;
    cardClass: string;
    inputClass: string;
}

export type PreviewType = 'image' | 'video' | 'audio' | 'text' | 'pdf' | null;

