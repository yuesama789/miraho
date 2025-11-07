// ...existing code...
import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  setModalId: (id: string) => void;
  retrieveModalId: () => string | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [getModalId, setGetModalId] = useState<string | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((prev) => !prev);
  const setModalId = (id: string) => {
    setGetModalId(id);
  };
  const retrieveModalId = () => getModalId;

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, toggleModal, setModalId, retrieveModalId }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
