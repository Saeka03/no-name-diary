"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextType = {
  isModalOpen: boolean;
  selectedDate: Date | null;
  diaryState: DiaryType;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedDate: (date: Date) => void;
  setDiaryState: (diaryState: DiaryType) => void;
  openModalHandler: (param: Date | DiaryType) => void;
  closeModalHandler: () => void;
};

const defaultValue: ModalContextType = {
  isModalOpen: false,
  selectedDate: null,
  diaryState: null,
  setIsModalOpen: () => {},
  setSelectedDate: () => {},
  setDiaryState: () => [],
  openModalHandler: () => {},
  closeModalHandler: () => {},
};

export const ModalContext = createContext<ModalContextType>(defaultValue);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [diaryState, setDiaryState] = useState<DiaryType | null>(null);

  const openModalHandler = (param: Date | DiaryType) => {
    if (param instanceof Date) {
      setSelectedDate(param);
      setDiaryState(null);
    } else {
      setDiaryState(param);
      setSelectedDate(null);
    }
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
        diaryState,
        setIsModalOpen,
        setSelectedDate,
        setDiaryState,
        openModalHandler,
        closeModalHandler,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
