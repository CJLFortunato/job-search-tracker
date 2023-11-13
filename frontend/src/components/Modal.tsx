import React, { useState } from 'react';

import ModalProps from './types';

function Modal(props: ModalProps) {
  const {
    children,
    openOverride = false,
    buttonLabel,
    btnStyle = '',
  } = props;
  const [open, setOpen] = useState(openOverride);
  return (
    <>
      {
        !openOverride && (
          <button
            onClick={() => setOpen(true)}
            type="button"
            className={btnStyle}
          >
            {buttonLabel}
          </button>
        )
      }
      {open && (
        <div className="backdrop">
          {
            React.cloneElement(children, { setOpen })
          }
        </div>

      )}
    </>
  );
}

export default Modal;
