import React from 'react';
 
const Modal = ({content}) => {

  return (
  <div className="modal">
    <div className="modal-body">
        {content}
    </div>
  </div>)
};
 
export default Modal;