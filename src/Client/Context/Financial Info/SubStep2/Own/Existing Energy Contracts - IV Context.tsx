import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

interface ExistingContractsIVState {
  hasSteamContract: boolean;
  rate: string;
  escalator: string;
  offtakeRequirement: string;
  condensateReturn: string;
  condensatePercentage: string;
  files: File[];
  fileMetadata: FileMetadata[];
}

interface ExistingContractsIVContextType {
  existingContractsIVState: ExistingContractsIVState;
  updateField: (field: keyof Omit<ExistingContractsIVState, 'files' | 'fileMetadata'>, value: string | boolean) => void;
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileName: string) => void;
}

const ExistingContractsIVContext = createContext<ExistingContractsIVContextType | undefined>(undefined);

export const useExistingContractsIV = () => {
  const context = useContext(ExistingContractsIVContext);
  if (!context) {
    throw new Error('useExistingContractsIV must be used within an ExistingContractsIVProvider');
  }
  return context;
};

const defaultState: ExistingContractsIVState = {
  hasSteamContract: false,
  rate: '',
  escalator: '',
  offtakeRequirement: '',
  condensateReturn: 'no',
  condensatePercentage: '',
  files: [],
  fileMetadata: [],
};

export const ExistingContractsIVProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [existingContractsIVState, setExistingContractsIVState] = useState<ExistingContractsIVState>(() => {
    const savedState = localStorage.getItem('existingContractsIVState');
    if (savedState) {
      const { fileMetadata, ...rest } = JSON.parse(savedState);
      return { ...rest, files: [], fileMetadata: fileMetadata || [] };
    }
    return defaultState;
  });

  useEffect(() => {
    const stateToSave = { ...existingContractsIVState, files: undefined };
    localStorage.setItem('existingContractsIVState', JSON.stringify(stateToSave));
  }, [existingContractsIVState]);

  const updateField = (field: keyof Omit<ExistingContractsIVState, 'files' | 'fileMetadata'>, value: string | boolean) => {
    setExistingContractsIVState(prevState => {
      const newState = { ...prevState, [field]: value };
      if (field === 'condensateReturn' && value === 'no') {
        newState.condensatePercentage = '';
      }
      return newState;
    });
  };
  
  const addFiles = (newFiles: File[]) => {
    setExistingContractsIVState(prevState => {
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
    setExistingContractsIVState(prevState => ({
      ...prevState,
      files: prevState.files.filter(file => file.name !== fileName),
      fileMetadata: prevState.fileMetadata.filter(meta => meta.name !== fileName),
    }));
  };

  return (
    <ExistingContractsIVContext.Provider value={{ existingContractsIVState, updateField, addFiles, removeFile }}>
      {children}
    </ExistingContractsIVContext.Provider>
  );
};