import React, { createContext, useContext, useState } from 'react';

interface TwoFAContextType {
  show2FADialog: boolean;
  tempAction: (() => void) | null;
  request2FA: (action: () => void) => void;
  complete2FA: () => void;
}

const TwoFAContext = createContext<TwoFAContextType | null>(null);

export const TwoFAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [tempAction, setTempAction] = useState<(() => void) | null>(null);

  const request2FA = (action: () => void) => {
    setTempAction(() => action);
    setShow2FADialog(true);
  };

  const complete2FA = () => {
    setShow2FADialog(false);
    tempAction?.();
    setTempAction(null);
  };

  return (
    <TwoFAContext.Provider value={{ show2FADialog, tempAction, request2FA, complete2FA }}>
      {children}
    </TwoFAContext.Provider>
  );
};

export const useTwoFA = () => {
  const ctx = useContext(TwoFAContext);
  if (!ctx) throw new Error('useTwoFA must be used within TwoFAProvider');
  return ctx;
};
