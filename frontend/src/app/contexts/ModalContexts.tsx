"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextType = {
  isModalOpen: boolean;
  selectedDate: Date | null;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedDate: (date: Date) => void;
  openModalHandler: (date: Date) => void;
  closeModalHandler: () => void;
};

const defaultValue: ModalContextType = {
  isModalOpen: false,
  selectedDate: null,
  setIsModalOpen: () => {},
  setSelectedDate: () => {},
  openModalHandler: () => {},
  closeModalHandler: () => {},
};

export const ModalContext = createContext<ModalContextType>(defaultValue);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const openModalHandler = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        selectedDate,
        setIsModalOpen,
        setSelectedDate,
        openModalHandler,
        closeModalHandler,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
