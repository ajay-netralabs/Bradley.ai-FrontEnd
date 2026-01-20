import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

interface ExistingPPAContractsIIState {
  hasPPA: boolean;
  providerName: string;
  ppaStartDate: string;
  ppaEndDate: string;
  ppaRate: string;
  ppaEscalation: string;
  files: File[];
  fileMetadata: FileMetadata[];
}

interface ExistingPPAContractsIIContextType {
  ppaContractsIIState: ExistingPPAContractsIIState;
  updateField: (field: keyof Omit<ExistingPPAContractsIIState, 'files' | 'fileMetadata'>, value: string | boolean) => void;
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileName: string) => void;
}

const ExistingPPAContractsIIContext = createContext<ExistingPPAContractsIIContextType | undefined>(undefined);

export const useExistingPPAContractsII = () => {
  const context = useContext(ExistingPPAContractsIIContext);
  if (!context) {
    throw new Error('useExistingPPAContractsII must be used within an ExistingPPAContractsIIProvider');
  }
  return context;
};

const defaultState: ExistingPPAContractsIIState = {
  hasPPA: false,
  providerName: '',
  ppaStartDate: '',
  ppaEndDate: '',
  ppaRate: '',
  ppaEscalation: '',
  files: [],
  fileMetadata: [],
};

export const ExistingPPAContractsIIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ppaContractsIIState, setPPAContractsIIState] = useState<ExistingPPAContractsIIState>(() => {
    const savedState = localStorage.getItem('existingPPAContractsIIState');
    if (savedState) {
        const { fileMetadata, ...rest } = JSON.parse(savedState);
        return { ...rest, files: [], fileMetadata: fileMetadata || [] };
    }
    return defaultState;
  });

  useEffect(() => {
    const stateToSave = {
      ...ppaContractsIIState,
      files: undefined, // Don't save File objects
    };
    localStorage.setItem('existingPPAContractsIIState', JSON.stringify(stateToSave));
  }, [ppaContractsIIState]);

  const updateField = (field: keyof Omit<ExistingPPAContractsIIState, 'files' | 'fileMetadata'>, value: string | boolean) => {
    setPPAContractsIIState(prevState => ({ ...prevState, [field]: value }));
  };
  
  const addFiles = (newFiles: File[]) => {
    setPPAContractsIIState(prevState => {
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
    setPPAContractsIIState(prevState => ({
      ...prevState,
      files: prevState.files.filter(file => file.name !== fileName),
      fileMetadata: prevState.fileMetadata.filter(meta => meta.name !== fileName),
    }));
  };

  return (
    <ExistingPPAContractsIIContext.Provider value={{ ppaContractsIIState, updateField, addFiles, removeFile }}>
      {children}
    </ExistingPPAContractsIIContext.Provider>
  );
};