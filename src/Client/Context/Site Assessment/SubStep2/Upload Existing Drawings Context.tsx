import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

interface MEPDrawingsState {
  files: File[];
  fileMetadata: FileMetadata[];
}

interface MEPDrawingsContextType {
  mepDrawingsState: MEPDrawingsState;
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileName: string) => void;
}

const MEPDrawingsContext = createContext<MEPDrawingsContextType | undefined>(undefined);

export const useMEPDrawings = () => {
  const context = useContext(MEPDrawingsContext);
  if (!context) {
    throw new Error('useMEPDrawings must be used within a MEPDrawingsProvider');
  }
  return context;
};

const defaultState: MEPDrawingsState = {
  files: [],
  fileMetadata: [],
};

export const MEPDrawingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mepDrawingsState, setMEPDrawingsState] = useState<MEPDrawingsState>(() => {
    const savedState = Cookies.get('mepDrawingsState');
    if (savedState) {
      const { fileMetadata } = JSON.parse(savedState);
      return { files: [], fileMetadata };
    }
    return defaultState;
  });

  useEffect(() => {
    const stateToSave = {
      fileMetadata: mepDrawingsState.fileMetadata,
    };
    Cookies.set('mepDrawingsState', JSON.stringify(stateToSave));
  }, [mepDrawingsState.fileMetadata]);

  const addFiles = (newFiles: File[]) => {
    setMEPDrawingsState(prevState => {
      const newMetadata = newFiles.map(file => ({ name: file.name, size: file.size, type: file.type }));
      const uniqueNewFiles = newFiles.filter(nf => !prevState.files.some(ef => ef.name === nf.name));
      const uniqueNewMetadata = newMetadata.filter(nm => !prevState.fileMetadata.some(em => em.name === nm.name));
      
      return {
        ...prevState,
        files: [...prevState.files, ...uniqueNewFiles],
        fileMetadata: [...prevState.fileMetadata, ...uniqueNewMetadata],
      };
    });
  };

  const removeFile = (fileName: string) => {
    setMEPDrawingsState(prevState => ({
      ...prevState,
      files: prevState.files.filter(file => file.name !== fileName),
      fileMetadata: prevState.fileMetadata.filter(meta => meta.name !== fileName),
    }));
  };

  return (
    <MEPDrawingsContext.Provider value={{ mepDrawingsState, addFiles, removeFile }}>
      {children}
    </MEPDrawingsContext.Provider>
  );
};