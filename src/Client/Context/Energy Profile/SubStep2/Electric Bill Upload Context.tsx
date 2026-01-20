import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


// Interface for the serializable metadata of a file.
interface FileMetadata {
  name: string;
  size: string; // Stored as a formatted string e.g., "1.23 MB"
  dateRange: { start: string; end: string };
}

// Main state interface
interface ElectricBillUploadState {
  fileMetadata: FileMetadata[];
  files: File[]; // Add files here
}

interface ElectricBillUploadContextType {
  electricBillUploadState: ElectricBillUploadState;
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileName: string) => void;
}

const ElectricBillUploadContext = createContext<ElectricBillUploadContextType | undefined>(undefined);

export const useElectricBillUpload = () => {
  const context = useContext(ElectricBillUploadContext);
  if (!context) {
    throw new Error('useElectricBillUpload must be used within an ElectricBillUploadProvider');
  }
  return context;
};

const defaultState: ElectricBillUploadState = {
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

export const ElectricBillUploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [electricBillUploadState, setElectricBillUploadState] = useState<ElectricBillUploadState>(() => {
    const savedState = localStorage.getItem('electricBillUploadState');
    const initialState = savedState ? JSON.parse(savedState) : defaultState;
    initialState.files = []; // Ensure files are not persisted
    return initialState;
  });

  useEffect(() => {
    const stateToSave = { ...electricBillUploadState, files: undefined };
    localStorage.setItem('electricBillUploadState', JSON.stringify(stateToSave));
  }, [electricBillUploadState]);

  const addFiles = (newFiles: File[]) => {
    setElectricBillUploadState(prevState => {
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
    setElectricBillUploadState(prevState => ({
      ...prevState,
      fileMetadata: prevState.fileMetadata.filter(meta => meta.name !== fileName),
      files: prevState.files.filter(file => file.name !== fileName),
    }));
  };

  return (
    <ElectricBillUploadContext.Provider value={{ electricBillUploadState, addFiles, removeFile }}>
      {children}
    </ElectricBillUploadContext.Provider>
  );
};