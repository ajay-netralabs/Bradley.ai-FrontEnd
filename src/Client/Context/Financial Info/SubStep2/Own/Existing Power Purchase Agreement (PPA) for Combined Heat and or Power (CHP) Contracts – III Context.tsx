import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

interface ExistingPPAContractsIIIState {
  hasCHP_PPA: boolean;
  ratekWh: string;
  rateMMBTu: string;
  escalatorkWh: string;
  escalatorMMBTu: string;
  termkWh: string;
  termMMBTu: string;
  files: File[];
  fileMetadata: FileMetadata[];
}

interface ExistingPPAContractsIIIContextType {
  ppaContractsIIIState: ExistingPPAContractsIIIState;
  updateField: (field: keyof Omit<ExistingPPAContractsIIIState, 'files' | 'fileMetadata'>, value: string | boolean) => void;
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileName: string) => void;
}

const ExistingPPAContractsIIIContext = createContext<ExistingPPAContractsIIIContextType | undefined>(undefined);

export const useExistingPPAContractsIII = () => {
  const context = useContext(ExistingPPAContractsIIIContext);
  if (!context) {
    throw new Error('useExistingPPAContractsIII must be used within an ExistingPPAContractsIIIProvider');
  }
  return context;
};

const defaultState: ExistingPPAContractsIIIState = {
  hasCHP_PPA: false,
  ratekWh: '',
  rateMMBTu: '',
  escalatorkWh: '',
  escalatorMMBTu: '',
  termkWh: '',
  termMMBTu: '',
  files: [],
  fileMetadata: [],
};

export const ExistingPPAContractsIIIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ppaContractsIIIState, setPPAContractsIIIState] = useState<ExistingPPAContractsIIIState>(() => {
    const savedState = Cookies.get('existingPPAContractsIIIState');
    if (savedState) {
        const { fileMetadata, ...rest } = JSON.parse(savedState);
        return { ...rest, files: [], fileMetadata: fileMetadata || [] };
    }
    return defaultState;
  });

  useEffect(() => {
    const stateToSave = {
      ...ppaContractsIIIState,
      files: undefined,
    };
    Cookies.set('existingPPAContractsIIIState', JSON.stringify(stateToSave));
  }, [ppaContractsIIIState]);

  const updateField = (field: keyof Omit<ExistingPPAContractsIIIState, 'files' | 'fileMetadata'>, value: string | boolean) => {
    setPPAContractsIIIState(prevState => ({ ...prevState, [field]: value }));
  };
  
  const addFiles = (newFiles: File[]) => {
    setPPAContractsIIIState(prevState => {
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
    setPPAContractsIIIState(prevState => ({
      ...prevState,
      files: prevState.files.filter(file => file.name !== fileName),
      fileMetadata: prevState.fileMetadata.filter(meta => meta.name !== fileName),
    }));
  };

  return (
    <ExistingPPAContractsIIIContext.Provider value={{ ppaContractsIIIState, updateField, addFiles, removeFile }}>
      {children}
    </ExistingPPAContractsIIIContext.Provider>
  );
};