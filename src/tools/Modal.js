import React from 'react';
 
const Modal = ({content}) => {

  return (
  <div className="modal">
    <div className="modal-body animate__animated animate__faster animate__zoomIn">
        {content}
    </div>
  </div>)
};
 
export default Modal;