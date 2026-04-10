import { type RefObject, useEffect } from 'react';
import { type Location, useNavigate } from 'react-router-dom';

type TUseModalProps = {
  locationPathname?: Location['pathname'];
  modalOverlayRef: RefObject<HTMLDivElement | null>;
};

type TUseModalReturn = {
  handleClose: (() => void) | undefined;
};

export const useModal = ({
  locationPathname = '/',
  modalOverlayRef,
}: TUseModalProps): TUseModalReturn => {
  const navigate = useNavigate();

  function handleClose(): void {
    navigate(locationPathname);
  }

  useEffect(() => {
    function handleEscape(e: KeyboardEvent): void {
      if (e.key === 'Escape') handleClose();
    }

    function handleClick(e: MouseEvent): void {
      if (e.target === modalOverlayRef?.current) handleClose();
    }

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClick);

    return (): void => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return { handleClose };
};
