import React, { createContext, useState, useContext } from 'react';

const KeyboardContext = createContext();

export const KeyboardProvider = ({ children }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  return (
    <KeyboardContext.Provider value={{ keyboardVisible, setKeyboardVisible }}>
      {children}
    </KeyboardContext.Provider>
  );
};

export const useKeyboard = () => useContext(KeyboardContext);