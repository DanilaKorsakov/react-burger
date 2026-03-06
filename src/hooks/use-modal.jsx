import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useModal = (prevLocation = '/', modalOverlayRef) => {
  const navigate = useNavigate();

  function handleClose() {
    navigate(prevLocation);
  }

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') handleClose();
    }

    function handleClick(e) {
      if (e.target === modalOverlayRef.current) handleClose();
    }

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return { handleClose };
};
