import { useState } from "react";

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [modalMessage, setModalMessage] = useState("Default Message");

  const toggleModal = () => {
    setIsShowing(!isShowing);
    // setTimeout(() => setIsShowing(false), 5000);
  };

  const setContets = (message: string) => {
    setModalMessage(message);
  };

  return {
    modalMessage,
    isShowing,
    setContets,
    toggleModal,
  };
};

export default useModal;
