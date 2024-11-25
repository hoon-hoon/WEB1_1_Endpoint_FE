import { useState, useCallback } from 'react';

interface UseModalProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useModal = (initialState = false): UseModalProps => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
};
