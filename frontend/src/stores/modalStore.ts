import { create } from "zustand";

interface ModalState {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpenModal: false,
  openModal: () => set({ isOpenModal: true }),
  closeModal: () => set({ isOpenModal: false }),
}));
