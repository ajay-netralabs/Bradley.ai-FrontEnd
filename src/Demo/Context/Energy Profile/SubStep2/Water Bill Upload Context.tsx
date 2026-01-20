import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


// Interface for the serializable metadata of a file.
interface FileMetadata {
  name: string;
  size: string; // Stored as a formatted string e.g., "1.23 MB"
	dateRange: { start: string; end: string };
}

// Main state interface
interface WaterBillUploadState {
  fileMetadata: FileMetadata[];
  files: File[]; // Add files here
}

interface WaterBillUploadContextType {
  waterBillUploadState: WaterBillUploadState;
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileName: string) => void;
}

const WaterBillUploadContext = createContext<WaterBillUploadContextType | undefined>(undefined);

export const useWaterBillUpload = () => {
  const context = useContext(WaterBillUploadContext);
  if (!context) {
    throw new Error('useWaterBillUpload must be used within an WaterBillUploadProvider');
  }
  return context;
};

const defaultState: WaterBillUploadState = {
  fileMetadata: [],
  files: [],
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const WaterBillUploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [waterBillUploadState, setWaterBillUploadState] = useState<WaterBillUploadState>(() => {
    const savedState = localStorage.getItem('waterBillUploadState');
    const initialState = savedState ? JSON.parse(savedState) : defaultState;
    initialState.files = []; // Ensure files are not persisted
    return initialState;
  });

  useEffect(() => {
    const stateToSave = { ...waterBillUploadState, files: undefined };
    localStorage.setItem('waterBillUploadState', JSON.stringify(stateToSave));
  }, [waterBillUploadState]);

  const addFiles = (newFiles: File[]) => {
    setWaterBillUploadState(prevState => {
      const newMetadata = newFiles.map(file => ({ 
        name: file.name, 
        size: formatFileSize(file.size),
				dateRange: { start: '', end: '' }
      }));
      
      const uniqueNewMetadata = newMetadata.filter(
        nm => !prevState.fileMetadata.some(em => em.name === nm.name)
      );
      const uniqueNewFiles = newFiles.filter(
        nf => !prevState.files.some(ef => ef.name === nf.name)
      );
      
      return {
        ...prevState,
        fileMetadata: [...prevState.fileMetadata, ...uniqueNewMetadata],
        files: [...prevState.files, ...uniqueNewFiles],
      };
    });
  };

  const removeFile = (fileName: string) => {
    setWaterBillUploadState(prevState => ({
      ...prevState,
      fileMetadata: prevState.fileMetadata.filter(meta => meta.name !== fileName),
      files: prevState.files.filter(file => file.name !== fileName),
    }));
  };

  return (
    <WaterBillUploadContext.Provider value={{ waterBillUploadState, addFiles, removeFile }}>
      {children}
    </WaterBillUploadContext.Provider>
  );
};
