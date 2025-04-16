"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type NotificationContextType = {
  isNotificationOpen: boolean;
  stateId: number;
  setStateId: (stateId: number) => void;
  setIsNotificationOpen: (isOpen: boolean) => void;
  openNotificationHandler: (id: number) => void;
  closeNotificationHandler: () => void;
};

const defaultValue: NotificationContextType = {
  isNotificationOpen: false,
  stateId: null,
  setStateId: () => {},
  setIsNotificationOpen: () => {},
  openNotificationHandler: () => [],
  closeNotificationHandler: () => {},
};

export const NotificationContext =
  createContext<NotificationContextType>(defaultValue);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [stateId, setStateId] = useState<number>(null);

  const openNotificationHandler = (id: number) => {
    setStateId(id);
    setIsNotificationOpen(true);
  };

  const closeNotificationHandler = () => {
    setStateId(null);
    setIsNotificationOpen(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        isNotificationOpen,
        stateId,
        setStateId,
        setIsNotificationOpen,
        openNotificationHandler,
        closeNotificationHandler,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useModalContext = () => useContext(NotificationContext);
