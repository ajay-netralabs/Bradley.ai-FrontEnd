import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

// Interface for the serializable metadata of a file.
interface FileMetadata {
  name: string;
  size: string; // Stored as a formatted string e.g., "1.23 MB"
	dateRange: { start: string; end: string };
}

// Main state interface
interface NaturalGasBillUploadState {
  fileMetadata: FileMetadata[];
  files: File[]; // Add files here
}

interface NaturalGasBillUploadContextType {
  naturalGasBillUploadState: NaturalGasBillUploadState;
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileName: string) => void;
}

const NaturalGasBillUploadContext = createContext<NaturalGasBillUploadContextType | undefined>(undefined);

export const useNaturalGasBillUpload = () => {
  const context = useContext(NaturalGasBillUploadContext);
  if (!context) {
    throw new Error('useNaturalGasBillUpload must be used within an NaturalGasBillUploadProvider');
  }
  return context;
};

const defaultState: NaturalGasBillUploadState = {
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

export const NaturalGasBillUploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [naturalGasBillUploadState, setNaturalGasBillUploadState] = useState<NaturalGasBillUploadState>(() => {
    const savedState = Cookies.get('naturalGasBillUploadState');
    const initialState = savedState ? JSON.parse(savedState) : defaultState;
    initialState.files = []; // Ensure files are not persisted
    return initialState;
  });

  useEffect(() => {
    const stateToSave = { ...naturalGasBillUploadState, files: undefined };
    Cookies.set('naturalGasBillUploadState', JSON.stringify(stateToSave));
  }, [naturalGasBillUploadState]);

  const addFiles = (newFiles: File[]) => {
    setNaturalGasBillUploadState(prevState => {
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
    setNaturalGasBillUploadState(prevState => ({
      ...prevState,
      fileMetadata: prevState.fileMetadata.filter(meta => meta.name !== fileName),
      files: prevState.files.filter(file => file.name !== fileName),
    }));
  };

  return (
    <NaturalGasBillUploadContext.Provider value={{ naturalGasBillUploadState, addFiles, removeFile }}>
      {children}
    </NaturalGasBillUploadContext.Provider>
  );
};