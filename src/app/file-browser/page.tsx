import React, { useState, useEffect } from 'react';
import {
  Folder,
  Download,
  Eye,
  X,
  Upload,
  Search,
  Grid3x3,
  List,
  FolderPlus,
  ChevronRight,
  Home,
  ArrowLeft,
  Server,
  HardDrive
} from 'lucide-react';
import { formatSize, getIcon, getPreviewType } from './extra/utils';
import { FileItem, FileManagerProps } from './extra/types';

// --- MOCK DATA SETUP (Replace this with your API calls later) ---

// 1. Define available folders for the Modal
const AVAILABLE_FOLDERS = [
  { id: '1', name: 'Project Alpha Assets', fileCount: 12 },
  { id: '2', name: 'Marketing Campaigns', fileCount: 8 },
  { id: '3', name: 'Website Backup 2024', fileCount: 45 },
];

// To test the "Empty List" message, uncomment the line below:
// const AVAILABLE_FOLDERS: any[] = [];

// 2. Helper to generate fake files since we aren't reading local disk anymore
const generateMockFiles = (folderName: string): FileItem[] => {
  const createMockFile = (name: string, type: string, content: string) => {
    // We create a real JS File object so your existing preview logic works
    const file = new File([content], name, { type });
    return {
      id: `file-${Math.random()}`,
      name,
      size: file.size,
      type: type,
      file,
      modified: new Date(),
      path: `${folderName}/${name}`,
      isDirectory: false,
    };
  };

  return [
    {
      id: `dir-images-${Math.random()}`,
      name: 'Images',
      size: 0,
      type: 'directory',
      modified: new Date(),
      path: `${folderName}/Images`,
      isDirectory: true,
      children: [
        createMockFile('logo.png', 'image/png', 'fake-image-content'),
        createMockFile('banner.jpg', 'image/jpeg', 'fake-image-content'),
      ] as any // Casting for simplicity in mock
    },
    {
      id: `dir-docs-${Math.random()}`,
      name: 'Documents',
      size: 0,
      type: 'directory',
      modified: new Date(),
      path: `${folderName}/Documents`,
      isDirectory: true,
      children: [
        createMockFile('report.txt', 'text/plain', 'This is a preview of the report text.'),
        createMockFile('notes.pdf', 'application/pdf', 'fake-pdf-content'),
      ] as any
    },
    createMockFile('readme.txt', 'text/plain', `Welcome to ${folderName}. This is a generated file.`)
  ];
};

// --- COMPONENT START ---

export default function ThemedFileManager({ darkMode, cardClass, inputClass }: FileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'image' | 'video' | 'audio' | 'text' | 'pdf' | null>(null);
  const [splitPosition, setSplitPosition] = useState(75);
  const [isDragging, setIsDragging] = useState(false);
  
  // NEW: State for the Folder Selection Modal
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // --- LOGIC: Selecting a folder from the Modal ---
  const handleFolderSelectFromModal = (folderName: string) => {
    // In a real app, you would fetch data from an API here
    const mockTree = generateMockFiles(folderName);
    
    setFiles(mockTree);
    setCurrentPath([]);
    setSelectedFile(null);
    setIsFolderModalOpen(false); // Close modal
    showNotification(`Opened: ${folderName}`);
  };

  const getCurrentItems = (): FileItem[] => {
    if (currentPath.length === 0) return files;
    let items: FileItem[] = files;
    for (const folder of currentPath) {
      const found: FileItem | undefined = items.find((i) => i.name === folder && i.isDirectory);
      if (!found) return [];
      items = found.children || [];
    }
    return items;
  };

  const navigateTo = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
    setSelectedFile(null);
  };

  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedFile(null);
    }
  };

  const goHome = () => {
    setCurrentPath([]);
    setSelectedFile(null);
  };

  const loadPreview = async (item: FileItem) => {
    if (item.isDirectory) {
      setPreviewType(null);
      setPreviewUrl(null);
      return;
    }
    const type = getPreviewType(item.name);
    setPreviewType(type);

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    if (type === 'text') {
      const text = await item.file.text();
      setPreviewUrl(text);
    } else if (type) {
      setPreviewUrl(URL.createObjectURL(item.file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleItemClick = (item: FileItem) => {
    if (item.isDirectory) {
      navigateTo(item.name);
    } else {
      setSelectedFile(item);
      loadPreview(item);
    }
  };

  const downloadFile = (item: FileItem) => {
    if (item.isDirectory) return;
    const url = URL.createObjectURL(item.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name;
    a.click();
    URL.revokeObjectURL(url);
    showNotification(`Downloaded: ${item.name}`);
  };

  const openInTab = (item: FileItem) => {
    if (item.isDirectory) return;
    window.open(URL.createObjectURL(item.file), '_blank');
  };

  const currentItems = getCurrentItems();
  const filteredItems = currentItems.filter(i =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!isDragging) return;
      const container = document.getElementById('split-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPosition(Math.max(30, Math.min(90, percent)));
    };

    const up = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
  }, [isDragging]);

  const Item = ({ item }: { item: FileItem }) => {
    const Icon = getIcon(item);
    const selected = selectedFile?.id === item.id;

    return viewMode === 'grid' ? (
      <div
        onClick={() => handleItemClick(item)}
        className={`p-5 text-center rounded-lg border cursor-pointer transition-all ${
          darkMode ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
        } ${selected ? 'ring-2 ring-blue-500' : ''}`}
      >
        <div className={`p-4 rounded-xl mx-auto w-fit mb-3 ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100'}`}>
          <Icon size={36} className={item.isDirectory ? 'text-yellow-400' : 'text-blue-400'} />
        </div>
        <div className="text-sm font-medium truncate">{item.name}</div>
        {!item.isDirectory && <div className="text-xs opacity-50 mt-1">{formatSize(item.size)}</div>}
      </div>
    ) : (
      <div
        onClick={() => handleItemClick(item)}
        className={`flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer transition-all ${
          selected 
            ? 'bg-blue-500/20 hover:bg-blue-500/25' 
            : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        }`}
      >
        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100'}`}>
          <Icon size={20} className={item.isDirectory ? 'text-yellow-400' : 'text-blue-400'} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{item.name}</div>
          {item.isDirectory && <div className="text-xs opacity-50">Folder</div>}
        </div>
        {!item.isDirectory && (
          <div className={`text-xs opacity-50 px-3 py-1.5 rounded font-mono ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
            {formatSize(item.size)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 relative">
      
      {/* --- NOTIFICATION --- */}
      {notification && (
        <div className="fixed top-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}

      {/* --- FOLDER SELECTION MODAL --- */}
      {isFolderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`${cardClass} border rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]`}>
            {/* Modal Header */}
            <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <HardDrive size={20} className="text-blue-500" />
                Select a Folder
              </h3>
              <button 
                onClick={() => setIsFolderModalOpen(false)}
                className={`p-1.5 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className={`flex-1 overflow-y-auto p-4 custom-scrollbar ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              {AVAILABLE_FOLDERS.length === 0 ? (
                // EMPTY LIST MESSAGE
                <div className="text-center py-10 opacity-60">
                  <Search size={48} className="mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-medium">No folders found</p>
                  <p className="text-sm">{"Please import React, { useState, useEffect } from 'react'; import a folder configuration first."}</p>
                </div>
              ) : (
                // FOLDER LIST
                <div className="space-y-2">
                  {AVAILABLE_FOLDERS.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => handleFolderSelectFromModal(folder.name)}
                      className={`w-full flex items-center gap-4 p-4 rounded-lg border text-left transition-all group ${
                        darkMode 
                        ? 'bg-gray-800 border-gray-700 hover:border-blue-500 hover:bg-gray-750' 
                        : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 group-hover:bg-blue-900/30' : 'bg-blue-50 group-hover:bg-blue-100'}`}>
                        <Folder className="text-blue-500" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{folder.name}</div>
                        <div className="text-xs opacity-50 mt-0.5">{folder.fileCount} items</div>
                      </div>
                      <ChevronRight size={18} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className={`p-4 border-t text-xs text-center opacity-50 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
               Showing available folders from server
            </div>
          </div>
        </div>
      )}


      {/* --- HEADER --- */}
      <div className={`${cardClass} border rounded-xl p-6 shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Folder className="text-blue-500" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">File Manager</h1>
            <p className="text-xs opacity-60 mt-0.5">Explore folders and preview files</p>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      {files.length === 0 ? (
        <div className={`${cardClass} border rounded-xl p-16 text-center`}>
          <div className="max-w-md mx-auto space-y-6">
            <div className="p-8 bg-blue-500/10 rounded-full w-fit mx-auto">
              <Upload size={56} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold">No folder loaded</h2>
            <p className="opacity-60">Select a folder to browse its contents</p>
            
            {/* REPLACED INPUT WITH BUTTON TRIGGER */}
            <button 
              onClick={() => setIsFolderModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer text-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FolderPlus size={20} />
              Select Folder
            </button>

          </div>
        </div>
      ) : (
        <>
          {/* Toolbar */}
          <div className={`${cardClass} border rounded-xl p-4 flex flex-wrap items-center gap-4`}>
             {/* Toolbar Content (Search, View Toggle) */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  type="text"
                  placeholder="Search in current folder..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${inputClass}`}
                />
              </div>
            </div>
            
            {/* NEW: Button to change folder */}
            <button 
               onClick={() => setIsFolderModalOpen(true)}
               className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <Server size={16} /> Change Folder
            </button>

            <div className={`flex gap-2 rounded-lg p-1 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-2.5 rounded transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
              >
                <List size={18} />
              </button>
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
              >
                <Grid3x3 size={18} />
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className={`${cardClass} border rounded-xl px-5 py-3 flex items-center gap-3 text-sm`}>
            <button 
              onClick={goHome} 
              className={`p-1 rounded transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            >
              <Home size={16} />
            </button>
            {currentPath.map((folder, i) => (
              <React.Fragment key={i}>
                <ChevronRight size={16} className="opacity-50" />
                <button
                  onClick={() => setCurrentPath(currentPath.slice(0, i + 1))}
                  className="hover:text-blue-400 transition-colors"
                >
                  {folder}
                </button>
              </React.Fragment>
            ))}
            {currentPath.length > 0 && (
              <button 
                onClick={navigateUp} 
                className={`ml-auto p-2 rounded transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <ArrowLeft size={18} />
              </button>
            )}
          </div>

          {/* Resizable Split View */}
          <div id="split-container" className="flex h-[calc(100vh-340px)] gap-4">
            {/* Left: File Browser */}
            <div style={{ width: `${splitPosition}%` }} className={`${cardClass} border rounded-xl flex flex-col overflow-hidden`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <Folder size={20} className="text-blue-400" />
                  <div>
                    <h3 className="font-semibold">Files</h3>
                    <p className="text-xs opacity-60">{filteredItems.length} items</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    {searchQuery ? 'No matches' : 'Empty folder'}
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredItems.map((item) => (
                      <Item key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredItems.map((item) => (
                      <Item key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Resizer */}
            <div
              className={`w-2 cursor-col-resize transition-colors relative ${darkMode ? 'bg-gray-700 hover:bg-blue-600' : 'bg-gray-300 hover:bg-blue-500'}`}
              onMouseDown={() => setIsDragging(true)}
            >
              <div className={`absolute inset-y-0 left-1/2 w-1 rounded-full -translate-x-1/2 ${darkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
            </div>

            {/* Right: Preview */}
            <div style={{ width: `${100 - splitPosition}%` }} className={`${cardClass} border rounded-xl flex flex-col overflow-hidden`}>
              <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <h3 className="font-semibold">Preview</h3>
                {selectedFile && (
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      if (previewUrl) URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                    }}
                    className={`p-2 rounded transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {selectedFile ? (
                  <div className="space-y-6">
                    {selectedFile.isDirectory ? (
                      <div className="text-center py-24">
                        <Folder size={96} className="text-yellow-400 mx-auto mb-4" />
                        <p className="text-xl font-medium">{selectedFile.name}</p>
                        <p className="text-sm opacity-60">Folder</p>
                      </div>
                    ) : previewType && previewUrl ? (
                      <div className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                        {previewType === 'image' && <img src={previewUrl} alt="" className="max-w-full h-auto rounded-lg mx-auto" />}
                        {previewType === 'video' && <video controls src={previewUrl} className="w-full rounded-lg" />}
                        {previewType === 'audio' && <audio controls src={previewUrl} className="w-full" />}
                        {previewType === 'text' && (
                          <pre className={`text-sm p-4 rounded-lg overflow-x-auto border max-h-96 ${darkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'}`}>
                            <code>{previewUrl}</code>
                          </pre>
                        )}
                        {previewType === 'pdf' && <iframe src={previewUrl} className={`w-full h-96 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />}
                      </div>
                    ) : (
                      <div className="flex justify-center py-16">
                        <div className="p-8 bg-blue-500/10 rounded-2xl">
                          {React.createElement(getIcon(selectedFile), { size: 80, className: 'text-blue-400' })}
                        </div>
                      </div>
                    )}

                    {!selectedFile.isDirectory && (
                      <div className="flex gap-3">
                        <button onClick={() => openInTab(selectedFile)} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
                          <Eye size={18} /> Open
                        </button>
                        <button onClick={() => downloadFile(selectedFile)} className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
                          <Download size={18} /> Download
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-32 text-gray-500">
                    <Eye size={64} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg">No file selected</p>
                    <p className="text-sm opacity-60 mt-2">Click an item to preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { 
          background: ${darkMode ? '#1f2937' : '#f3f4f6'}; 
          border-radius: 4px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${darkMode ? '#4b5563' : '#d1d5db'}; 
          border-radius: 4px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: ${darkMode ? '#6b7280' : '#9ca3af'}; 
        }
      `}</style>
    </div>
  );
}